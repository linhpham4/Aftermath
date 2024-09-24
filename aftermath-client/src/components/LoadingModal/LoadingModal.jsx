import "./LoadingModal.scss";

const LoadingModal = () => {
  return (
    <div className="loading">
      <div className="loading__container">
        <p className="loading__text">Image is being converted...</p>
        <div class="loading__donut"></div>
      </div>
    </div>
  );
};

export default LoadingModal;
