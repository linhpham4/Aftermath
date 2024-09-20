import "./EditPersonNameModal.scss";
import close from "../../assets/icons/close.svg";

const EditPersonNameModal = () => {

  return (
    <div className="editPerson">
      <div className="editPerson__container">
        <img className="editPerson__close" src={close} alt="close icon" />

        <form className="editPerson__form" id="editPersonName">
          <label className="editPerson__label" htmlFor="name">
            Add person
          </label>
          <input
            className="editPerson__input"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value=""
          />
          <button className="editPerson__button" form="editPersonName">
            Add
          </button>
        </form>

      </div>
    </div>
  );
};

export default EditPersonNameModal;
