import "./HomePage.scss";
import logo from "../../assets/logo/aftermath_logo.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingModal from "../../components/LoadingModal/LoadingModal";

const HomePage = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const { personId } = useParams();
  const [image, setImage] = useState(null);
  const [hostId, setHostId] = useState (0);
  const [open, setOpen] = useState(false);

  // If home page is accessed from root directory, create new person to set as host
  const declareHost = async() => {
    if(!personId) {
      const response = await axios.post(`${BASE_URL}/people`, {name: "Guest"});
      const guestId = response.data.id;
      setHostId(guestId);
    } else {
      setHostId(personId);
    };
  };
  
  useEffect(() => {
    declareHost();
  }, []);

  // Set state variable as image file upload
  const handleInput = (event) => {
    const formData = new FormData();
    formData.append('bill', event.target.files[0]);
    setImage(formData);
  };

  // POST request to send image to server public/images folder
  const handleSubmit = async(event) => {
    event.preventDefault();
    setOpen(true);
    const response = await axios.post(`${BASE_URL}/bills/${hostId}`, image);
    const billId = response.data.id;
    navigate(`/host/${hostId}/edit/${billId}`);
  };

  return (
    <main className="home">
      <div className="home__container">
        <img className="home__logo" src={logo} alt="aftermath logo" />

        <div className="home__text-container">
          <h2 className="home__body">
            1 &emsp; Add friends to the bill &emsp; <br />
            2 &emsp;Assign items &emsp; <br />
            3 &emsp;Don't forget about tip &emsp; <br />
            4 &emsp;Enjoy not doing math! &emsp; <br />
          </h2>
        </div>

        <form
          className="home__form"
          id="bill"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <label className="home__label" htmlFor="bill">
            Upload a picture of your bill to get started!
          </label>
          <input
            className="home__input"
            type="file"
            id="bill"
            name="bill"
            accept="image/*"
            onChange={handleInput}
          ></input>
        </form>
      </div>

      <button className="home__button" form="bill" type="submit">
        Upload
      </button>

      <LoadingModal open={open} />
    </main>
  );
};

export default HomePage;
