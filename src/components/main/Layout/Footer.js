import { date } from "yup";
import "../../../styles/main/Footer.css";

function Footer() {
  return (
    <footer className="t_bg_c bg-gradient  text-center z-0 mt-5 p-4 rounded-top-5">
      <div className="social_media mt-5">
        <a href="https://www.facebook.com/" target="_blank" className="me-4">
          <span className="footer_icons bi bi-facebook fs-2 "></span>
        </a>
        <a href="https://twitter.com/" target="_blank" className="me-4">
          <span className="footer_icons bi bi-twitter-x fs-2"></span>
        </a>
        <a href="https://www.instagram.com/" target="_blank" className="me-4">
          <span className="footer_icons bi bi-instagram fs-2"></span>
        </a>
        <a href="https://www.youtube.com/" target="_blank" className="me-4">
          <span className="footer_icons bi bi-youtube fs-2"></span>
        </a>
      </div>

      <div className="dark_mode logo_form d-flex flex-row justify-content-evenly align-items-center">
      <div>
        <h3 className="mt-3">Logo</h3>
        <p className=" opacity-50">
          &copy; {new Date().getFullYear()} - Supplier Application
        </p>
      </div>
        <form className="row g-3 d-flex flex-column align-items-center mt-2">
        <h4 className=" mt-4">Cuntuct Us</h4>
          <div className="col-auto">
            <input
              type="email"
              className="form-control w-auto"
              placeholder="Your Email"
            ></input>
          </div>
          <div className="col-auto">
          <textarea className="form-control" rows="3"></textarea>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-success mb-3">
              Send
            </button>
          </div>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
