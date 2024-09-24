import "./ErrorModal.scss";

const ErrorModal = ({ open, close }) => {
    
  if (!open) return null;

  return (
    <div className="error">
      <div className="error__container">
        <button className="error__close" onClick={close}></button>
        <h1 className="error__text">Please upload an image to continue!</h1>
      </div>
    </div>
  );
};

export default ErrorModal;
