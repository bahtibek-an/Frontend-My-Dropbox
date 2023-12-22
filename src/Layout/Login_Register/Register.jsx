import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserCreate, UserLogin } from "../../redux/extraReducer";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      UserCreate({ userName: userName, email: email, password: password })
    );
  };
  return (
    <Fragment>
      <marquee>
        <b>
          <i>Xojaniyazov Mukam Dropbox Astrum</i>
        </b>
      </marquee>
      <div className="form-box">
        <div className="form-container">
          <p className="title">Register</p>
          <div className="auth">
            <form className="form" onSubmit={handleSubmit}>
              <input
                placeholder="Username"
                type="text"
                className="input"
                name="username"
                id="username"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                placeholder="Email"
                type="email"
                className="input"
                name="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                type="password"
                className="input"
                name="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="form-btn" type="submit">
                Register
              </button>
            </form>
    
            <div className="sign-in-link">
              <span className="sign-up-label">Already Have accaunt?</span>
              <b>
                <Link to="/">Login</Link>
              </b>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
