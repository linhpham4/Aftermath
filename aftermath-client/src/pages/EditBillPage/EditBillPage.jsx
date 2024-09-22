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
  const [name, setName] = useState("");
  const [personId, setPersonId] = useState(null);
  const [color, setColor] = useState(null);
  const [people, setPeople] = useState([{ id: Number(hostId), name: "You", color: 0 }]);
  const [bill, setBill] = useState(initialBill);
  const [items, setItems] = useState([]);

  //Get data for bill matching {billId}
  const getBill = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bills/${hostId}/${billId}`);
      setBill(response.data);

      const lineItems = response.data.line_items;
      setItems(lineItems.map((item) => ({
        ...item, 
        id: item.id,
        bill_id: Number(billId),
        description: item.description,
        item_total: item.item_total,
        assigned_people:[]
      })));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBill();
  }, [billId]);

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

  // Assigns a person to an item when checkbox is clicked & removes them if they are already assigned
  const handleAssign = (itemId, personId) => {
    setItems((prevState) => (
      prevState.map((item) => {
        if (item.id === itemId) {
          const isAssigned = item.assigned_people.includes(personId);
          const newassigned_people = isAssigned
            ? item.assigned_people.filter((id) => id !== personId)
            : [...item.assigned_people, personId];
          return { ...item, assigned_people: newassigned_people };
        }
        return item;
      })
    ));
  };

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

  // Update subtotal when any item total changes
  const updateSubtotal = () => {
    // Sums all item totals
    const itemsTotal = items.reduce((accumulator, item) => {
      return accumulator + item.item_total;
    }, 0)

    setBill((prevState) => ({
      ...prevState,
      subtotal: Number(parseFloat(itemsTotal).toFixed(2)),
    }))
  }

  useEffect(() => {
    updateSubtotal();
  }, [items])

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
    const updatedTotal = Number(bill.subtotal) + Number(bill.tax) + Number(bill.tip);

    setBill((prevState) => ({
      ...prevState,
      total: Number(parseFloat(updatedTotal).toFixed(2)),
    }));
  };

  useEffect(() => {
    updateTotal();
  }, [bill.subtotal, bill.tax, bill.tip]);

  if (bill === initialBill) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="edit">
      <div className="edit__header">
        <button className="edit__add" onClick={() => setOpen(true)}></button>
        {/* Dynamically render an avatar for each person with a different color ------------------ */}
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
        {/* Dynamically generated line items ----------------------------------------------------- */}
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
            {/* Dynamically render radio buttons based on list of people ----------- */}
              {people.map((person) => {
                return(
                  <div className="edit__person-container" key={person.id}>
                    <label className="edit__label">
                      <input
                        className={`edit__checkbox`} 
                        type="checkbox"
                        id={`item${item.id}_person${person.id}`}
                        name="assign" 
                        value={person.name}
                        onChange={() => handleAssign(item.id, person.id)}   
                        checked={item.assigned_people.includes(person.id)} 
                        style={{filter: `hue-rotate(${person.color}deg)`}}
                      />
                      {person.name}
                    </label> 
                  </div>
                )
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
