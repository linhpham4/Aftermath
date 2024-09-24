import "./LoadingModal.scss";

const LoadingModal = ({ open }) => {

  if (!open) return null;

  return (
    <div className="loading">
      <div className="loading__container">
        <p className="loading__text">Image is being converted...</p>
        <div className="loading__donut"></div>
      </div>
    </div>
  );
};

export default LoadingModal;
