import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../redux/extraReducer";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UserLogin({ email: email, password: password }));
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
          <p className="title">Login</p>
          <div className="auth">
            <form className="form" onSubmit={handleSubmit}>
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
                Login
              </button>
            </form>
            <div className="sign-in-link">
              <span className="sign-up-label">You do not have an account?</span>
              <b>
                <Link to="/register">Sign in</Link>
              </b>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
