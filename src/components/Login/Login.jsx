import { useState } from "react"
import { auth } from "../extra/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Link, useNavigate} from 'react-router-dom'
import { logo } from "../extra/icons"
function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  
  const handleLogin = (e) => {
      e.preventDefault()
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/home")
        })
        .catch(error => {
          console.log(error)
        })
    }

  return (
    <div class='row d-flex justify-content-center'>
    <img className="w-50" src={logo} alt="logo"/>
		<div class='mt-5 w-25'>
			<p class='fs-1 text-center'>Login</p>
			<form>
				<div class='form-floating mb-3'>
					<input type='email' class='form-control' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
					<label for='floatingInput'>Email address</label>
				</div>
				<div class='form-floating'>
					<input type='password' class='form-control' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
					<label for='floatingPassword'>Password</label>
				</div>
				<button type='submit' class='btn btn-primary btn-lg mt-3' onClick={handleLogin}>Login</button>
        <p className='text-center'>Already have an account? <Link to="/">Register</Link></p>
			</form>
		</div>
</div>
  )
}

export default Login
