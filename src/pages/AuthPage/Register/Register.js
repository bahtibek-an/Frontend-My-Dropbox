import React,{ useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import RegisterForm from "../../../components/AuthComponents/RegisterForm";
import { signInWithGoogle,signInWithGithub, signInWithFacebook } from '../../../config/firebase';
import { loginUser } from "../../../redux/actionCreators/authActionCreator";


const Register = () => {
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogle = (e) => {
        e.preventDefault();
        signInWithGoogle().then((data) => {
            console.log(data.user.email);
            dispatch(loginUser({
                displayName:data.user.displayName, 
                email:data.user.email, 
                uid:data.user.uid}))
            setSuccess(true);
        })
        .catch((err) => {
            alert(err)
        })
    }

    const handleGithub = (e) => {
        e.preventDefault();
        signInWithFacebook().then((data) => {
            console.log(data.user.email);
            dispatch(loginUser({
                displayName:data.user.displayName, 
                email:data.user.email, 
                uid:data.user.uid}))
            setSuccess(true);
        })
        .catch((err) => {
            alert(err)
        })
    }

    const handleFacebook = (e) => {
        e.preventDefault();
        signInWithGithub().then((data) => {
            console.log(data.user.email);
            dispatch(loginUser({
                displayName:data.user.displayName, 
                email:data.user.email, 
                uid:data.user.uid}))
            setSuccess(true);
        })
        .catch((err) => {
            alert(err)
        })
    }

    useEffect(() => {
        if (success) {
            navigate("/dashboard")
        }
    },[success,navigate])

    return(
        <div className="row m-5 no-gutters shadow-lg bg-white">
            <div className="col-md-4 d-none d-md-block">
            <img src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80" className="img-fluid" style={{"minHeight":"100%"}} alt="side login"/>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-6 bg-white p-5 text-center my-auto">
            <h1 className="text-center my-5">Register Here</h1>
            <div className="col">
                <div className="d-flex justify-content-center row-md-3 center mx-auto mt-5">
                    <button className="btn shadow me-3" onClick={handleGoogle}><img src="https://img.icons8.com/fluency/48/000000/google-logo.png" alt="google"/>Google</button>
                    <button className="btn shadow me-3" onClick={handleFacebook}><img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="github"/>Github</button>
                    <button className="btn shadow me-3" onClick={handleGithub}><img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" alt="facebook"/>Facebook</button>
                </div>
                <div className="mx-auto mt-5">
                    <RegisterForm />
                    <p>Already a member?
                    <Link to="/login">
                        Login
                    </Link></p>
                </div> 
            </div>
            </div>
        </div>
    )
};

export default Register;