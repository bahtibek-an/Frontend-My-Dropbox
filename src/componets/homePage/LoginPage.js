import { useRef, useState } from "react"
import "./Home.css"
import { auth } from "../../firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {
    setDoc,
    doc,
    deleteDoc
  } from "firebase/firestore";
import {db} from '../../firebase'
import { Navigate } from "react-router-dom";

const LoginPage = ({enter, setId, login}) => {


    const [register, setRegister] = useState(false)

    const email = useRef()
    const password = useRef()
    const email1 = useRef()
    const password1 = useRef()

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            enter(userCredential.user.uid)
          })
          .catch((error) => {
            alert("wrong email or user or password")
          });
      };

      const createUser = async(id) =>{
        await setDoc(doc(db, "users", `${id}`),{});
    }

    const handleSubmit = async () => {
            await setDoc(doc(db, 'users/Wz48aG7eNySp7kfkb9BrlM9y7Zg1/sayyora', "zirohat"), {});
    };

    const deletedoc = async () =>{
        await deleteDoc(doc(db, 'users/Wz48aG7eNySp7kfkb9BrlM9y7Zg1/sayyora', "sayyora"));
    }

   

    

      const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email1.current.value, password1.current.value)
            .then((userCredential) => {
                setId(userCredential.user.uid);
                enter(userCredential.user.uid)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
        {login && <Navigate to="/home"/>}
        <div className="login">
            <div className="l_header">
                <h1>Dropbox</h1>
                <button
                onClick={()=>{
                    register ? setRegister(false) : setRegister(true)
                }}>{register ? "To Come In" : "Register"}</button>
            </div>

            {!register && <div className="signin">
                <div>
                    <p className="title">Enter or register</p>
                    <input type="text" placeholder="Email addres" 
                    ref={email}/>
                    <input type="password" placeholder="Password" 
                    ref={password}/>
                    <button onClick={signIn}>Enter</button>
                </div>
            </div>}

            {register && <div className="signin">
                <div>
                    <p className="title">Enter or register</p>
                    <input type="text" placeholder="Email addres" 
                    ref={email1}/>
                    <input type="password" placeholder="Password" 
                    ref={password1}/>
                    <button onClick={signUp}>Registration</button>
                </div>
            </div>}


        </div>
        </>
    )
}

export default LoginPage