import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import "../../CSS/HomeHero.css";

const LoginView = () => {
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("email", email);
    navigate("/user");
  }

  return (
    <div className="home-hero-container">
        <div>
              <div className="event-center">
                <div className="flex-containers">
                  <div>
                    <div className="event-heading">
                      Login
                    </div>
                    <div className="event-title">
                      Email
                    </div>
                    <div>
                      <input value={email} onChange={(data) => setEmail(data.target.value)}></input>
                    </div>
                    <div>
                      <input type="button" onClick={login} value="Login"/>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    </div>
  );
}

export default LoginView;