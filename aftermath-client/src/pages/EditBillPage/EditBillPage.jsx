import "./EditBillPage.scss";
import avatar from "../../assets/icons/avatar.svg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import EditPersonNameModal from "../../components/EditPersonNameModal/EditPersonNameModal";

const EditBillPage = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [personId, setPersonId] = useState(null);
  const [color, setColor] = useState(null);
  const [people, setPeople] = useState([{ id: 1, name: "You", color: 0 }]);
  const [itemPeople, setItemPeople] = useState([]);

  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

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

  return (
    <main className="edit">
      <div className="edit__header">
        <button className="edit__add" onClick={() => setOpen(true)}></button>
        {/* Dynamically render an avatar for each person with a different color */}
        {people.map((person) => (
          <img
            className="edit__avatar"
            src={avatar}
            alt="avatar"
            style={{ filter: `hue-rotate(${person.color}deg)` }}
            key={person.id}
          />
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
          <div className="edit__input-container edit__input-container--column">
            <p className="edit__text edit__text--gray">$47</p>
            <input
              className="edit__input"
              type="text"
              id="tax"
              name="tax"
              value="$20.21"
            />
            <input
              className="edit__input"
              type="text"
              id="tip"
              name="tip"
              value="$20.21"
            />
          </div>
        </div>

        <div className="edit__item edit__item--end">
          <p className="edit__text">Total</p>
          <p className="edit__text edit__text--gray">$473</p>
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
