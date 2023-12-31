import { useState, useEffect } from "react"
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject,} from "firebase/storage"
import { storage } from "../extra/firebase"
import Alert from "../extra/Alert"
import { all_file, trash, upload_file } from '../extra/icons'

function Upload() {
  const [imageData, setImageData] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [alert, setAlert] = useState("")
  const [deleted, setDeleted] = useState("")

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    setSelectedImage(file)
  }

  const handleImageSubmit = async () => {
    const storageRef = ref(storage, "images/" + selectedImage.name)
    await uploadBytes(storageRef, selectedImage)
    setAlert(selectedImage)
  }

  const handleImageDelete = async (image) => {
    const imageRef = ref(storage, image)
    await deleteObject(imageRef)
    listAll(ref(storage, `images/`))
      .then((res) => {
        const imagePromises = res.items.map((item) => getDownloadURL(item))
        return Promise.all(imagePromises)
      })
      .then((data) => {
        setImageData(data)
      })
      .catch((error) => {
        console.error(error)
      })
    setDeleted(imageRef)
  }

  useEffect(() => {
    listAll(ref(storage, `images/`))
      .then((res) => {
        const imagePromises = res.items.map((item) => getDownloadURL(item))
        return Promise.all(imagePromises)
      })
      .then((data) => {
        setImageData(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [imageData])

  return (
    <div>

        {alert ? (<Alert message={"Success Uploaded!"} color={"success"} />) : (<div></div>)}
        {deleted ? (<Alert message={"Success Deleteded!"} color={"danger"} />) : (<div></div>)}

      <div className=" container mt-3 gap-5 d-flex justify-content-center">
        <label for="file-upload" class="custom-file-upload">
          <p className="btn btn-success font-weight-bold">Upload File<img src={upload_file} alt="upload" /></p>
          <input className="d-none" id="file-upload" type="file" onChange={handleImageUpload}/>
        </label>

        {selectedImage ? (
        <p className="btn btn-primary font-weight-bold" onClick={handleImageSubmit}>Upload File</p>) : (<div></div>)}
        <label class="custom-file-upload">
          <button className="btn btn-primary font-weight-bold"> All Files<img width="48" height="48" src={all_file} alt="documents"/></button>
        </label>
      </div>

      <div className="d-flex justify-content-center row gap-3 mx-auto ">
        {imageData ? (imageData.map((img) => (
            <div class="col-6 mt-5 card w-25">
              <img class="card-img-top mt-3" src={img} alt="Card image" />
              <div class="card-body d-flex justify-content-end">
                <button onClick={() => handleImageDelete(img)}class="btn btn-outline-danger">
                  <img src={trash} alt="trash"/>
                </button>
              </div>
            </div>))) : (<h1>No File</h1>)}
      </div>
    </div>
  )
}

export default Upload
