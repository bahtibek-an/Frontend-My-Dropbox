import React, { useState, Dispatch, SetStateAction } from "react"
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore'

interface RegisterProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const Register: React.FC<RegisterProps> = ({ setIsAuthenticated }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegisterRoutes = () => {
    setIsAuthenticated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "fullName") {
      setFullName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const userRef = doc(db, "users", userId);
      await setDoc(userRef, {
        fullName,
        email,
      });

      navigate("/")

      console.log("Registration successful!", userId);

      let valid = true;
      const newErrors = { fullName: "", email: "", password: "" };

      if (fullName.trim().split(" ").length < 1) {
        valid = false;
        newErrors.fullName = "Please enter full name";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailRegex.test(email.trim())) {
        valid = false;
        newErrors.email = "Please enter a valid email address";
      }
      if (!password.trim() || password.trim().length < 8) {
        valid = false;
        newErrors.password = "Password should be at least 8 characters long";
      }

      if (valid) {
        console.log("Registration successful!");
      } else {
        setErrors(newErrors);
      }

    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  // const handleGoogleProvider = async () => {
  //   try {
  //     await signInWithPopup(auth, googleProvider)
  //     // const userGoogle = await signInWithPopup(auth, googleProvider);
  //     // const userId = userGoogle.user.uid;

  //     navigate("/verification")
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  return (
    <main className="flex overflow-hidden">
      <div className="flex-1 hidden lg:block">
        <img src="https://images.unsplash.com/photo-1697135807547-5fa9fd22d9ec?auto=format&fit=crop&q=80&w=3387&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-screen object-cover" />
      </div>
      <div className="py-12 flex-1 lg:flex lg:justify-center items-center lg:h-screen lg:overflow-auto">
        <div className="max-w-lg flex-1 mx-auto px-4 text-gray-600">
          <div>
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Register
            </h3>
            <p className="mt-3">
              I have an account? <span className="text-blue-700 font-normal cursor-pointer"><Link to={"/login"}>Back Login</Link></span>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-12 lg:pb-12"
          >
            <div>
              <label className="font-medium">Username</label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleInputChange}
                placeholder="Jon Deo"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
              <p className="text-red-700">{errors.fullName}</p>
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="yourname@company.host"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
              <p className="text-red-700">{errors.email}</p>
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="********"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
              <p className="text-red-700">{errors.password}</p>
            </div>
            <button
              className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150"
              type="submit"
              onClick={handleRegisterRoutes}
            >
              Submit
            </button>
            {/* <div className="flex items-center">
              <div className="grow border-b border-gray-400"></div>
              <span className="shrink px-1 pb-1 text-gray-400">or</span>
              <div className="grow border-b border-gray-400"></div>
            </div>
            <button onClick={handleGoogleProvider} type="submit" className="flex  w-full justify-center items-center bg-gray-800 dark:bg-gray-800 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
              <span>Register with Google</span>
            </button> */}
          </form>
        </div>
      </div>
    </main>
  )
}

export default Register;