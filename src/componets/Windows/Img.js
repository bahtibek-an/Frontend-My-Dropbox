import wordIcon from "../images/wordIcon.png"
import excel from "../images/excel.png"
import img from "../images/img.png"
import json from "../images/json.webp"
import video from "../images/video.png"
import pdf from "../images/pdf.png"
import zip from "../images/zip.png"

const Img = ({type, width}) => {

    let src;

    if(type === "image/jpeg" || type==="image/png" || type==="image/jpg"){
        src = img
    }else if(type==="video/mp4"){
        src=video
    }else if(type==="application/msword" || type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
        src=wordIcon
    }else if (type==="application/pdf"){
        src=pdf
    }else if(type="application/zip"){
        src=zip
    }


    return (
        <img src={src}  width={width}/>
    )
}

export default Img