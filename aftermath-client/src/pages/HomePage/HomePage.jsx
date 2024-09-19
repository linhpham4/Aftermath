import "./HomePage.scss";
import logo from "../../assets/logo/aftermath_logo.svg";

const HomePage = () => {
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
          ></input>
        </form>
      </div>

      <button className="home__button" form="bill">
        Next
      </button>
    </main>
  );
};

export default HomePage;
