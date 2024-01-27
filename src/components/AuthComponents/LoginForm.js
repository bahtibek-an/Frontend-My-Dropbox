import React, { useEffect,useRef,useState  } from "react";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../redux/actionCreators/authActionCreator";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [isNotBot,setIsNotBot] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const captchaRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        if(!isNotBot) {
            alert("Please confirm you are not a bot");
            return;
        }
        dispatch(signInUser(email, password, setSuccess));
    }

    const handleReCAPTCHA = (e) => {
        // console.log("value:" , e)
        const token = captchaRef.current.getValue();
        setIsNotBot(token)
        // captchaRef.current.reset();
    }

    useEffect(() => {
        if(success){
            navigate("/dashboard");
        }
    }, [success,navigate])

    return (
        <>
        <form autoComplete="off" className="form-horizontal shadow-sm px-2 bg-white text-dark" onSubmit={handleSubmit}>
            <div className="form-group my-2 mb-4">
                <input 
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group my-2 mt-2 mb-4">
                <input 
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group my-2">
                <ReCAPTCHA
                    sitekey="6LdNVNEhAAAAAKb07FLHENpJS5c6gFIFasbS8uzn"
                    onChange={handleReCAPTCHA}
                    ref={captchaRef}
                />
            </div>
            <button type="submit" className="btn btn-primary my-2 form-control">Login</button>

        </form>
        </>
    )
};

export default LoginForm;