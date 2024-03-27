import React from 'react'
import foler__logo from "../../../assets/icons/folder.svg"
import "./Folder.scss"
import dayjs from 'dayjs'
const Folder = ({data}) => {

  return (
    <div className='folders'>
        {data.map((el)=>(
            <a href={`/folder/${el.id}`} className="card">
                <div className="card_file">
                    <div className="img__container">
                        <img src={foler__logo} alt="" />
                    </div>
                    <span>{el.name}</span>
                </div>
                <span>{formatTimestamp(el.date)}</span>
            </a>
        ))}
    </div>
  )
}
const formatTimestamp = (timestamp) => {
    // Convert Firebase Timestamp to JavaScript Date
    const date = timestamp.toDate();
    
    // Format the Date using Day.js
    return dayjs(date).format('MM.DD.YYYY');
  };
  
export default Folder;