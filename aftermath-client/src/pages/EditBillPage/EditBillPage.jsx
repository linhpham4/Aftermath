import "./EditBillPage.scss";
import { useState } from "react";

const EditBillPage = () => {
  const [people, setPeople] = useState([""]);
  const [itemPeople, setItemPeople] = useState([]);

  const addPerson = (event) => {
    event.preventDefault();
    setPeople([...people, ""]);
  };

  const addItemPerson = (event) => {
    event.preventDefault();
    setItemPeople([...itemPeople, ""]);
  };

  return (
    <main className="edit">
      <div className="edit__header">
        <button className="edit__add" onClick={addPerson}></button>
        {people.map((person) => {
          return <div className="edit__avatar"></div>
        })}
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
            <button className="edit__add edit__add--item" onClick={addItemPerson}></button>
            {itemPeople.map((person) => {
              return <div className="edit__avatar"></div>
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
    </main>
  );
};

export default EditBillPage;
