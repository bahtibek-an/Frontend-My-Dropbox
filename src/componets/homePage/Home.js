import { Navigate, Outlet } from "react-router-dom"


const Home = ({login}) => {

    console.log(login)


    return (
        <>
            {!login && <Navigate to="/" />}
        <Outlet/>

        </>
    )
}

export default Home 