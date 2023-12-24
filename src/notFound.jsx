import { Link } from "react-router-dom";

export default function Notfound() {
    return (
        <div className="notfound">
            <center>
                <h1>404</h1>
                <p>Not Fount!</p>
                <h2><Link to={"/"}>Back home</Link></h2>
            </center>
        </div>
    )
}