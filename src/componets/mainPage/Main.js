import "./Main.css"
import { useState, useEffect } from "react"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import create from "../images/create.png"
import delet from "../images/delete.png"
import down from "../images/download.png"
import close from "../images/close.png"
import folder from "../images/folder.png"
import copy from "../images/copy.png"
import {
    collection, getDocs, setDoc, doc, deleteDoc
} from "firebase/firestore";
import { db, imageDb } from "../../firebase"
import FolderWin from "../Windows/FolderWin";
import { v4 as uuidv4 } from 'uuid';
import wI from "../images/wordIcon.png"
import Img from "../Windows/Img";
import { CopyToClipboard } from 'react-copy-to-clipboard';


const Main = ({ id, signOut }) => {
    const margin = 5;
    const [createWin, setCreateWin] = useState(false)
    const [deleteWin, setDeleteWin] = useState(false)
    const [folderName, setFolderName] = useState("")
    const [currentUser, setCurrentUser] = useState()
    const [openFolder, setOpenFolder] = useState(false)
    const [put, setPut] = useState("users")
    const [docName, setDocName] = useState(id)
    const [delFile, setDelFile] = useState()
    const [delPut, setDelPut] = useState("users")
    const [delDir, setDelDir] = useState(id)
    const [delUser, setDelUser] = useState()
    const [delId, setDelId] = useState()
    const [user, setUser] = useState()
    const [check, setCheck] = useState("")
    const [checkId, setCheckId] = useState(false)
    const [viewWin, setViewWin] = useState(false)
    const [uRl, setUrl] = useState(false)
    const foldrs = user && user.folders ? user.folders : []
    const files = user && user.files ? user.files : []
    const fils = currentUser && currentUser.files ? currentUser.files : []

    const usersCollectionRef = collection(db, "users");

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        users.forEach((user) => {
            if (user.id === id) {
                setCurrentUser(user)
                setUser(user)
                setDelUser(user)
            }
        })
        setViewWin(false)
    }

    const folders = currentUser && currentUser.folders


    const url = 'localhost:3000/folder?'

    const obj = {
        fold: put,
        docName: docName
    }

    const searchParams = new URLSearchParams(obj)

    const query = searchParams.toString()

    console.log(url + query)

    useEffect(() => {

        getUsers();

    }, [id]);

    const handleSubmit = async () => {
        await setDoc(doc(db, `${put}`, `${docName}`), { ...user, folders: [...foldrs, folderName] });
        creatFolder()
        getUsers()
        setCreateWin(false)
        setCheck(put)
    };

    const creatFolder = async () => {
        await setDoc(doc(db, `${put}/${docName}/${folderName}`, `${folderName}`), {});
        getUsers()
    }


    const download = (files, name) => {
        const imgRef = ref(imageDb, `files/${docName}/${name}`)
        uploadBytes(imgRef, files).then((value) => {
            getDownloadURL(value.ref)
                .then((url) => {
                    upDateUser(url, value.metadata.name, value.metadata.contentType)
                    getUsers()
                })
        })
    }

    const upDateUser = async (url, idPhoto, type) => {
        await setDoc(doc(db, `${put}`, `${docName}`), { ...user, files: [...files, { url: url, name: idPhoto, type: type, id: uuidv4() }] });
        getUsers()
        setCheck(`${Math.random()}`)
    }


    const importData = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = () => {
            let files = input.files[0];
            download(files, files.name)
        };
        input.click();
    }


    const deletedoc = async () => {
        await deleteDoc(doc(db, `${put}`, `${docName}`));
        getUsers()
    }

    const deletefolder = async (folder) => {
        const filteredFolders = delUser.folders.filter((user) => {
            return user !== folder
        })
        await setDoc(doc(db, `${delPut}`, `${delDir}`), { ...delUser, folders: [...filteredFolders] })
        getUsers()
    }

    const deletefile = async () => {
        const filteredFolders = delUser && delUser.files.filter((file) => {
            return file.id !== delId
        })
        await setDoc(doc(db, `${delPut}`, `${delDir}`), { ...delUser, files: [...filteredFolders] })
        getUsers()
    }

    return (
        <div className="main">
            <div className="m_left">
                <div>
                    <div className="fold" onClick={() => {
                        openFolder ? setOpenFolder(false) : setOpenFolder(true)
                        setPut("users")
                        setDocName(id)
                        setUser(currentUser)
                        setDelUser(currentUser)
                        setCheckId(false)
                        setViewWin(true)
                        setUrl(false)
                    }}>
                        <button
                            style={{ rotate: openFolder ? "90deg" : "" }}
                        >{">"}</button>
                        <img className="folderIcon" src={folder} alt="folder" />
                        <h3 className="titl">Folders</h3>
                    </div>

                    {openFolder && folders ? folders.length !== 0 &&
                        folders.map((foldr) => (
                            <FolderWin
                                foldr={foldr}
                                margin={margin}
                                path={`users/${id}`}
                                dirName={foldr}
                                setPut={setPut}
                                setDocName={setDocName}
                                setUser={setUser}
                                user={user}
                                createWin={check}
                                setDelFile={setDelFile}
                                setDelPut={setDelPut}
                                setDelDir={setDelDir}
                                setDelId={setDelId}
                                setDelUser={setDelUser}
                                deletedUser={delUser}
                                deletedPut="users"
                                deletedDir={id}
                                setViewWin={setViewWin}
                                setUrl={setUrl}
                                delFile={delFile}
                            />
                        )) : <></>}

                    {openFolder && fils && fils.length !== 0 &&
                        fils.map((file) => (
                            <div className="fold"
                                onClick={() => {
                                    setDelFile(file.name)
                                    setDelPut("users")
                                    setDelDir(id)
                                    setDelId(file.id)
                                    setDelUser(currentUser)
                                    setCheckId(true)
                                    setUrl(file.url)
                                }}
                                style={{ marginLeft: `${margin + 15}px` }}>
                                <Img type={file.type} width="20px" />
                                <p style={{textDecoration: delFile === file.name ? "underline" : "none"}}>{file.name}</p>
                            </div>
                        ))}

                </div>
            </div>

            <div className="m_right">
                <div className="ce-up-del">
                    <div onClick={() => setCreateWin(true)}>
                        <img src={create} alt="create" width="25" />
                        <p>Create a folder</p>
                    </div>
                    <div onClick={importData}>
                        <img src={down} alt="download" width="25" />
                        <p>Download</p>
                    </div>
                    <div onClick={() => {
                        checkId || id !== docName ? setDeleteWin(true) : setDeleteWin(false)
                    }}>
                        <img src={delet} alt="delete" width="25" />
                        <p>Delete</p>
                    </div>
                    <CopyToClipboard text={uRl ? uRl : url+query}>
                        <div className="copyLink">
                            <img src={copy} alt="copy" width="30" />
                        </div>
                    </CopyToClipboard>

                </div>
                <button className="out"
                onClick={signOut}>Sign Out</button>


                {viewWin && <div className="view">
                    <h3>{docName === id ? "Folders" : docName}</h3>
                    <div className="viewFol">

                        {foldrs && foldrs.length !== 0 &&
                            foldrs.map((foldr) => (
                                <div>
                                    <img src={folder} width="50" />
                                    <p>{foldr}</p>
                                </div>
                            ))}

                        {files && files.length !== 0 &&
                            files.map((file) => (
                                <a href={file.url} target="_blank" style={{textDecoration: delFile===file.nam ? "underline" : "none"}}>
                                    <div>
                                        <Img type={file.type} width="50px" />
                                        <p>{file.name}</p>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>}

            </div>

            {createWin && <div className="creating-folder">
                <div>
                    <div className="cre_header">
                        <h3>Creating a folder</h3>
                        <img src={close} alt="close" width="13"
                            onClick={() => {
                                setFolderName("")
                                setCreateWin(false)
                            }} />
                    </div>
                    <p>Name</p>
                    <input type="text" placeholder="Folder name"
                        onChange={(e) => { setFolderName(e.target.value) }} />
                    <button
                        style={{ backgroundColor: folderName ? "#0095f6" : "#dbdbdb", color: "#fff" }}
                        disabled={folderName ? false : true}
                        onClick={handleSubmit}>Create</button>
                    <button
                        onClick={() => {
                            setFolderName("")
                            setCreateWin(false)
                        }}>Cancel</button>
                </div>
            </div>}

            {deleteWin && <div className="creating-folder">
                <div>
                    <div style={{ display: "flex", padding: "20px", justifyContent: "center", alignItems: "center" }}>
                        <h3>Delete {delFile === docName ? " folder" : " file"}</h3>
                        <h3 style={{ color: "red" }}>{delFile}</h3>
                    </div>

                    <button style={{ backgroundColor: "#0095f6", color: "#fff" }}
                        onClick={() => {
                            if (delFile === docName) {
                                deletedoc()
                                deletefolder(delFile)
                            } else {
                                deletefile()
                            }
                            setCheck(put)
                            setDeleteWin(false)
                        }}
                    >Delete</button>
                    <button
                        onClick={() => {
                            setDeleteWin(false)
                        }}>Cancel</button>
                </div>
            </div>}

        </div>
    )
}

export default Main