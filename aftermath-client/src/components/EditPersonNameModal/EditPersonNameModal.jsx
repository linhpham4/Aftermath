import "./EditPersonNameModal.scss";
import { useState } from "react";

const EditPersonNameModal = ({ open, close }) => {
  const [name, setName] = useState("");
  const [showError, setShowError] = useState("");

  const handleChange = (event) => {
    if (event.target.value !== "") {
      setShowError("");
    }
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name === "") {
      setShowError(true);
    }
  };

  if (!open) return null;

  return (
    <div className="editPerson">
      <div className="editPerson__container">
        <button className="editPerson__close" onClick={close}></button>

        <form
          className="editPerson__form"
          id="editPersonName"
          onSubmit={handleSubmit}
        >
          <label className="editPerson__label" htmlFor="name">
            Add person
          </label>
          <input
            className={`editPerson__input ${showError && `editPerson__input--invalid`}`}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />
          { showError && <p className="editPerson__error">Person must be named</p> }
          <button className="editPerson__button" form="editPersonName">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPersonNameModal;
