import React from "react"
import { shallowEqual, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import  NavigationComponent from '../../components/HomePageComponents/NavigationComponent';

import '../../CSS/HomeComponent.css';
const HomePage = () => {
    const { isLoggedIn } = useSelector((state) => ({
        isLoggedIn: state.auth.isAuthenticated
    }), shallowEqual);
    return (
        <>
            <NavigationComponent />
            <div className="home-main">
                <div className="home-content">
                    <div className="home">
                        <h1 className="welcome">Welcome</h1>
                        {isLoggedIn?(<Link to='/dashboard' className="position-absolute top-50 start-50 translate-middle-x"><button className="wel-btn">Dashboard</button></Link>):(
                            <Link to='/login' className="position-absolute top-50 start-50 translate-middle-x"><button className="wel-btn">GET STARTED</button></Link>
                        )}
                    </div>
                </div>
            </div>      
            <div className='folder1'>📁</div>
            <div className='folder2'>🗂️</div>
            <div className='folder3'>📑</div>
            <div className='folder4'>📧</div>
            <div className='folder5'>🗃️</div>
            <div className='folder6'>📁</div>
            <div className='folder7'>🗂️</div>
            <div className='folder8'>📑</div>
            <div className='folder9'>📧</div>
            <div className='folder11'>🗂️</div>
            <div className='folder12'>📑</div>
            <div className='folder13'>📧</div>
        </>
    )
}

export default HomePage;