import "./EditPersonNameModal.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const EditPersonNameModal = ({ open, close, setName, setPersonId, setColor }) => {
  const [text, setText] = useState("");
  const [showError, setShowError] = useState("");
  const [usedColors, setUsedColors] = useState([]);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  // Clears any text in input field upon modal opening
  useEffect(() => {
    setText("");
}, [open]);

  // Retrieve name from input, must be filled out
  const handleChange = (event) => {
    if (event.target.value !== "") {
      setShowError("");
    }
    setText(event.target.value);
  };

  // Picks a random number (degree) for color filter for each new avatar
  const pickColor =()=> {
    let degree = Math.floor(Math.random() * (320/30) + 1) * 30
    do {
      degree = Math.floor(Math.random() * (320/30) + 1) * 30
    } while (usedColors.includes(degree));
    setColor(degree);
    setUsedColors([...usedColors, degree]);
  }

  // Post request to add new person to database
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text === "") {
      return setShowError(true);
    }

    const response = await axios.post(`${BASE_URL}/people`, {name: text});

    // Set state variables to the new person pass back to parent
    setPersonId(response.data.id);
    setName(text);
    pickColor();
    close();
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
            value={text}
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
