import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../redux/actionCreators/authActionCreator";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCon, setPasswordCon] = useState("");
    const [success, setSuccess] = useState(false);
    const [isNotBot,setIsNotBot] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const captchaRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isNotBot) {
            alert("Please confirm you are not a bot");
            return;
        }
        if(!name || !email || !password || !passwordCon){
            alert("Please fill in all fields");
            return;
        }
        if(password !== passwordCon){
            alert("Password do not match");
            return;
        }

        dispatch(signUpUser(name, email, password, setSuccess));
    }

    const handleReCAPTCHA = (e) => {
        // console.log("value:" , e)
        const token = captchaRef.current.getValue();
        setIsNotBot(token)
        // captchaRef.current.reset();
    }

    useEffect(() => {
        if(success) {
            navigate("/dashboard");
        }
    }, [success,navigate]);

    return(
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group my-2 mb-3">
                <input 
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={name} 
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group my-2 mb-3">
                <input 
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group my-2 mb-3">
                <input 
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group my-2 mb-3">
                <input 
                type="password"
                name="passwordCon"
                className="form-control"
                placeholder="Password Confirmation"
                value={passwordCon} 
                onChange={(e) => setPasswordCon(e.target.value)} />
            </div>
            <div className="form-group my-2">
                <ReCAPTCHA
                    sitekey="6LdNVNEhAAAAAKb07FLHENpJS5c6gFIFasbS8uzn"
                    onChange={handleReCAPTCHA}
                    ref={captchaRef}
                />
            </div>
            <button type="submit" className="btn btn-primary my-2 form-control">Register</button>
        </form>
    )
};

export default RegisterForm;