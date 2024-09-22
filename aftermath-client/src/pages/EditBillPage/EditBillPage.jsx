import "./EditBillPage.scss";
import avatar from "../../assets/icons/avatar.svg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditPersonNameModal from "../../components/EditPersonNameModal/EditPersonNameModal";

const EditBillPage = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const { billId } = useParams();
  const { hostId } = useParams();

  const initialBill = {
    host_id: 0,
    restaurant: "",
    subtotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
    image_url: "",
  };

  const [open, setOpen] = useState(false);
  const [bill, setBill] = useState(initialBill);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [personId, setPersonId] = useState(null);
  const [color, setColor] = useState(null);
  const [people, setPeople] = useState([{ id: hostId, name: "You", color: 0 }]);
  const [itemPeople, setItemPeople] = useState([]);

  //Get data for bill matching {billId}
  const getBill = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bills/${hostId}/${billId}`);
      setBill(response.data);

      const lineItems = response.data.line_items;
      setItems(lineItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBill();
  }, [billId]);

  // Update state variable for changes made in bill input fields
  const handleBill = (event) => {
    const name = event.target.name;
    let value = parseFloat(event.target.value);

    setBill((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Update bill total when subtotal, tax, or tip changes
  const updateTotal = () => {
    setBill((prevState) => ({
      ...prevState,
      total: parseFloat(prevState.subtotal + prevState.tax + prevState.tip).toFixed(2),
    }));
  };

  useEffect(() => {
    updateTotal();
  }, [bill.subtotal, bill.tax, bill.tip]);

  // Update state variable for changes made in item input fields
  const handleItem = (id, event) => {
    const name = event.target.name;
    const value = event.target.value;
    const type = event.target.type;

    // Only updates for the item in the items array with id matching the one being passed
    // Updates the value with the correct data type
    setItems((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          if (type === "number" && name === "quantity") {
            return ({ ...item, [name]: Number(value) })
          } else if (type === "number" && name === "item_total") {
            return ({ ...item, [name]: parseFloat(value) })
          } else if (type === "text") {
            return ({ ...item, [name]: value })
          }
        }
        return item;
      })
    );
  };
  console.log(bill);

  // When new person is created, they get added to the people state variable
  useEffect(() => {
    if (personId !== null) {
      const newPerson = {
        id: personId,
        name: name,
        color: color,
      };

      setPeople([...people, newPerson]);
    }
  }, [personId]);

  const addItemPerson = (event) => {
    event.preventDefault();
    setItemPeople([...itemPeople, ""]);
  };

  if (bill === initialBill) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="edit">
      <div className="edit__header">
        <button className="edit__add" onClick={() => setOpen(true)}></button>
        {/* Dynamically render an avatar for each person with a different color */}
        {/* ******** Still need to generate individual prices Dynamically********************** */}
        {people.map((person) => (
          <div className="edit__person" key={person.id}>
            <p className="edit__person-total">$0.00</p>
            <img
              className="edit__avatar"
              src={avatar}
              alt="avatar"
              style={{ filter: `hue-rotate(${person.color}deg)` }}
            />
            <p className="edit__name">{person.name}</p>
          </div>
        ))}
      </div>

      <form className="edit__form" id="editBill">
        {/* Dynamically generated line items ----------------------------------------------- */}
        {items.map((item) => (
          <div className="edit__item" key={item.id}>
            <div className="edit__input-container">
              <input
                className="edit__input edit__input--quantity"
                type="number"
                id={`quantity_${item.id}`}
                name="quantity"
                value={item.quantity}
                onChange={(event) => handleItem(item.id, event)}
              />
              <input
                className="edit__input edit__input--description"
                type="text"
                id={`description_${item.id}`}
                name="description"
                value={item.description}
                onChange={(event) => handleItem(item.id, event)}
              />
              <input
                className="edit__input edit__input--total"
                type="number"
                id={`item_total_${item.id}`}
                name="item_total"
                value={item.item_total}
                onChange={(event) => handleItem(item.id, event)}
              />
            </div>

            <div className="edit__people-container">
              <button
                className="edit__add edit__add--item"
                onClick={addItemPerson}
              ></button>
              {itemPeople.map((person) => {
                <img
                className="edit__avatar"
                src={avatar}
                alt="avatar"
                style={{ filter: `hue-rotate(${person.color}deg)` }}
              />
              })}
            </div>
          </div>
        ))}
        {/* ---------------------------------------------------------------------------------------- */}

        <div className="edit__item edit__item--end">
          <p className="edit__text">
            Subtotal
            <br />
            Tax
            <br />
            Tip
            <br />
          </p>
          <div className="edit__input-container edit__input-container--column">
            <input
              className="edit__input edit__input--gray"
              type="number"
              id="subtotal"
              name="subtotal"
              value={bill.subtotal}
              onChange={handleBill}
              disabled="disabled"
            />
            <input
              className="edit__input"
              type="number"
              id="tax"
              name="tax"
              value={bill.tax}
              onChange={handleBill}
            />
            <input
              className="edit__input"
              type="number"
              id="tip"
              name="tip"
              value={bill.tip}
              onChange={handleBill}
            />
          </div>
        </div>

        <div className="edit__item edit__item--end">
          <p className="edit__text">Total</p>
          <input
            className="edit__input edit__input--gray"
            type="number"
            id="total"
            name="total"
            value={bill.total}
            onChange={handleBill}
            disabled="disabled"
          />
        </div>
      </form>

      <EditPersonNameModal
        open={open}
        close={() => setOpen(false)}
        setName={setName}
        setPersonId={setPersonId}
        setColor={setColor}
      />
    </main>
  );
};

export default EditBillPage;
