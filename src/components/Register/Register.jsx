import { useState } from "react"
import { auth } from "../extra/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { logo } from "../extra/icons"

function Register() {
  const [firstName, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword( auth, email, password)
          .then((data) => {
              updateProfile(data.user, { displayName: firstName, lastname })
              console.log(data)
              navigate("/home")
          })
          .catch((error) => {
            console.log(error)
          })
        }

  return (
    <div class='row d-flex justify-content-center'>
     <img className="w-50" src={logo} alt="logo"/>
		<div class='mt-5 w-25'>
			<p class='fs-1 text-center'>Register</p>
			<form>
				<div class='d-flex gap-3'>
					<div class='form-floating mb-3 w-50'>
						<input type='text' class='form-control' name='firstname' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
						<label for='floatingInput'>First Name</label>
					</div>
					<div class='form-floating mb-3 w-50'>
						<input type='text' class='form-control' name='lastname' value={lastname} onChange={(e) => setLastName(e.target.value)} />
						<label for='floatingInput'>Last Name</label>
					</div>
				</div>
				<div class='form-floating mb-3'>
					<input type='email' class='form-control' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
					<label for='floatingInput'>Email address</label>
				</div>
				<div class='form-floating'>
					<input type='password' class='form-control' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
					<label for='floatingPassword'>Password</label>
				</div>
				<button type='submit' class='btn btn-primary btn-lg mt-3' onClick={handleRegister}>Register</button>
        <p className='text-center'>Already have an account? <Link to="/login">Login</Link></p>
			</form>
		</div>
</div>
  )
}

export default Register