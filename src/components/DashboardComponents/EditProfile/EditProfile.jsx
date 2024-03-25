import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../../../redux/actionCreators/authActionCreator';

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [photoUrl,setPhotoUrl] = useState("");
    const handleEdit = (e) => {
        e.preventDefault();
        try {
            dispatch(editUser(name,photoUrl,navigate))
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',height:'100vh'}}>
            <h3>Edit youre profile</h3>
            <form onSubmit={handleEdit} style={{width:'700px'}}>
                <div class="form-group">
                    <label for="exampleInputEmail1">User Name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter new name" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Photo url</label>
                    <input onChange={(e) => setPhotoUrl(e.target.value)} type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter new photo url" />
                </div>
                <button onClick={handleEdit} type="submit" class="btn btn-primary my-4">Submit</button>
            </form>
        </div>
    )
}

export default EditProfile