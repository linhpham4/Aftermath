import "./EditBillPage.scss";
import avatar from "../../assets/icons/avatar.svg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditPersonNameModal from "../../components/EditPersonNameModal/EditPersonNameModal";

const EditBillPage = () => {
  const [open, setOpen] = useState(false);
  const [bill, setBill] = useState({
    restaurant: "Untitled Restaurant",
    subtotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
    image_url: ""
  });
  const [item, setItem] = useState([]);
  const [name, setName] = useState("");
  const [personId, setPersonId] = useState(null);
  const [color, setColor] = useState(null);
  const [people, setPeople] = useState([{ id: 1, name: "You", color: 0 }]);
  const [itemPeople, setItemPeople] = useState([]);

  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const { id } = useParams();

  //Get data for bill matching {id}
  const getBill = async() => {
    try {
      const response = await axios.get(`${BASE_URL}/bills/${id}`);
      setBill(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBill();
  }, [id]);

  // Update state variable for changes made in bill input fields
  const handleBill = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setBill((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // When new person is created, they get added to the people state variable
  useEffect(() => {
    if (personId !== null) {

      const newPerson = {
        id: personId,
        name: name,
        color: color
      };

      setPeople([...people, newPerson]);
    }
  }, [personId]);

  const addItemPerson = (event) => {
    event.preventDefault();
    setItemPeople([...itemPeople, ""]);
  };

  if (!bill) {
    return <h1>Loading...</h1>
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
        {/* Dynamically generated ----------------------------------------------- */}
        <div className="edit__item">
          <div className="edit__input-container">
            <input
              className="edit__input edit__input--quantity"
              type="text"
              id="quantity"
              name="quantity"
              value="1"
            />
            <input
              className="edit__input edit__input--description"
              type="text"
              id="description"
              name="description"
              value="Loaded Nachos"
            />
            <input
              className="edit__input edit__input--total"
              type="text"
              id="total"
              name="total"
              value="$20.21"
            />
          </div>

          <div className="edit__people-container">
            <button
              className="edit__add edit__add--item"
              onClick={addItemPerson}
            ></button>
            {itemPeople.map((person) => {
              return <div className="edit__avatar"></div>;
            })}
          </div>
        </div>

        <div className="edit__item edit__item--end">
          <p className="edit__text">
            Subtotal
            <br />
            Tax
            <br />
            Tip
            <br />
          </p>
          <form className="edit__input-container edit__input-container--column">
            <p className="edit__text edit__text--gray">{bill.subtotal}</p>
            <input
              className="edit__input"
              type="text"
              id="tax"
              name="tax"
              value={bill.tax}
              onChange={handleBill}
            />
            <input
              className="edit__input"
              type="text"
              id="tip"
              name="tip"
              value={bill.tip}
              onChange={handleBill}
            />
          </form>
        </div>

        <div className="edit__item edit__item--end">
          <p className="edit__text">Total</p>
          <p className="edit__text edit__text--gray">{bill.total}</p>
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
