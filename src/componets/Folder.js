import folder from "./images/folder.png"
import "./Folder.css"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Img from "./Windows/Img";


const Folder = () => {

    const url = window.location.href

    const searchParams = new URL(url).searchParams

    const entries = new URLSearchParams(searchParams).entries()

    const array = Array.from(entries)

    const [collec, setCollec] = useState(array[0][1])
    const [docName, setDocName] = useState(array[1][1])
    const [foldrs, setFoldrs] = useState()
    const [files, setFiles] = useState()
    const [check, setCheck] = useState(true)

    const usersCollectionRef = collection(db, `${collec}`);
    useEffect(() => {
        getUsers()
    }, [docName])

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    
        users.forEach((user) => {
            if (user.id === docName) {
                setFoldrs(user.folders ? user.folders : [])
                setFiles(user.files ? user.files : [])
            }
        })
        createButton(collec, docName)
    }




    const createButton = (fol, doc) => {
        const btns = document.getElementById("btns")
        const button = document.createElement("button")
        button.textContent = doc
        button.name = fol
        button.className = "btn"
        btns.appendChild(button)
        button.addEventListener("click", (e) => {
            setCollec(e.target.name)
            setDocName(e.target.textContent)
            setCheck(false)
            const children = btns.children
            const array = Array.from(children)
            const index = array.indexOf(e.target)
            const length = array.length
            for (let i = length-1; i >= index; i--) {
                btns.removeChild(children[i])
            }


        })

    }

    console.log("hello")





    return (
        <div className="folder_div">
            <div>
                <h2>{docName}</h2>
                <img src={folder} alt="folder" width="150" />
                <div>
                    <div id="btns">

                    </div>

                    <div className="viewDiv">
                        {foldrs && foldrs.length !== 0 && foldrs.map((fol) => (
                            <div onClick={() => {
                                setCollec(`${collec}/${docName}/${fol}`)
                                setDocName(fol)
                                setCheck(true)
                            }}>
                                <img src={folder} alt="fold" width="50" />
                                <p>{fol}</p>
                            </div>
                        ))}

                        {files && files.length !== 0 && files.map((file) => (
                            <a href={file.url} target="_blank">
                                <div>
                                    <Img type={file.type} width="50px"/>
                                    <p>{file.name}</p>
                                </div>
                            </a>

                        ))}

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Folder