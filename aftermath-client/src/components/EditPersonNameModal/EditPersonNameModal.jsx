import "./EditPersonNameModal.scss";
import close from "../../assets/icons/close.svg";
import { useState } from "react";

const EditPersonNameModal = () => {
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

  return (
    <div className="editPerson">
      <div className="editPerson__container">
        <img className="editPerson__close" src={close} alt="close icon" />

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
