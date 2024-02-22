import { Link } from "react-router-dom";
import "../../CSS/HomeHero.css";

const HomeHero = () => {
  return (
    <div className='home-hero-container'>
      <div className='home-hero-trans-image-wrapper'>
        <div>
          <div className="home-hero-text">
            Flavor-filled
          </div>
          <div className="home-hero-text">
            fun awaits!
          </div>
          <div className="home-hero-subtext">
            Say goodbye to stress, hello to shared memories. Join us for community, friendship, and good food
          </div>
          <div className="inline">

          <div className="get-started-button">
            <Link to="/event-creation">
             Get Started
           </Link>
          </div>
        </div>
        </div>
        <img className='hero-trans-image' src='assets\hero.jpeg' alt='Transparent Image' />
      </div>
    </div>
  );
};

export default HomeHero;
