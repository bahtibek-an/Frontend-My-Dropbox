import "./FolderWin.css"
import folder from "../images/folder.png"
import {
    collection,
    getDocs
} from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect, useState } from "react";
import FolderWin from "./FolderWin.js";
import Img from "./Img";

const Folderwin = ({ foldr, path, dirName, setPut, setDocName, setUser, margin, createWin, setDelFile, setDelDir, setDelPut, setDelId, setDelUser, deletedPut, deletedDir, deletedUser, setViewWin, setUrl, delFile }) => {

    const [docs, setDocs] = useState()
    const [openFolder, setOpenFolder] = useState(false)


    const usersCollectionRef = collection(db, `${path}/${dirName}`);

    useEffect(() => {
        getUser()
    }, [createWin])

    const getUser = async () => {
        const data = await getDocs(usersCollectionRef);
        const doc = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        doc.forEach((d) => {
            if (d.id === dirName) {
                setDocs(d)
            }
        })
    }


    const folders = docs && docs.folders
    const fils = docs && docs.files ? docs.files : []


    return (
        <>
            <div className="fold"
                style={{ marginLeft: `${margin}px` }}
                onClick={() => {
                    setPut(`${path}/${dirName}`)
                    setDocName(dirName)
                    openFolder ? setOpenFolder(false) : setOpenFolder(true)
                    setUser(docs)
                    setDelFile(dirName)
                    setDelPut(deletedPut)
                    setDelDir(deletedDir)
                    setDelUser(deletedUser)
                    setViewWin(true)
                    setUrl(false)
                }}>
                <button
                    style={{ rotate: openFolder ? "90deg" : "" }}>{">"}</button>
                <img className="folderIcon" src={folder} alt="folder" />
                <p style={{textDecoration: delFile === foldr ? "underline" : "none"}}>{foldr}</p>
            </div>

            {openFolder && folders ? folders.length !== 0 &&
                folders.map((foldr) => (
                    <FolderWin
                        foldr={foldr}
                        margin={margin + 10}
                        path={`${path}/${dirName}/${dirName}`}
                        dirName={foldr}
                        setPut={setPut}
                        setDocName={setDocName}
                        setUser={setUser}
                        createWin={createWin}
                        setDelFile={setDelFile}
                        setDelPut={setDelPut}
                        setDelDir={setDelDir}
                        setDelId={setDelId}
                        setDelUser={setDelUser}
                        deletedUser={docs}
                        deletedPut={`${path}/${dirName}`}
                        deletedDir={dirName}
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
                            setDelPut(`${path}/${dirName}`)
                            setDelDir(dirName)
                            setDelId(file.id)
                            setDelUser(docs)
                            setUrl(file.url)
                        }}
                        style={{ marginLeft: `${margin + 15}px` }}>
                        <Img type={file.type} width="20px" />
                        <p style={{textDecoration: delFile === file.name ? "underline" : "none"}}>{file.name}</p>
                    </div>
                ))}
        </>

    )
}

export default Folderwin