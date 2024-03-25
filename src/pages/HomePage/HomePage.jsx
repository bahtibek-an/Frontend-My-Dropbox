import React from "react";
import "./HomePage.css";
import { NavigationComponent } from "../../components/HomePageComponents";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", background: "aqua", height: "100vh" }}>
      <NavigationComponent />
      <h1
        className="display-1 my-5 text-center"
        style={{ fontSize: "100px", marginTop: "300px", color: "black" }}
      >
        {" "}
        Welcome to my Dropbox
      </h1>
    </div>
  );
};

export default HomePage;

// return (
//   <div className="display-1 my-5 text-center" style={{textAlign:"center",background:'black',height:"100vh"}}>
//       <NavigationComponent/>
//       <h1 style={{fontSize:"50px",marginTop:"300px",color:"white"}}>Welcome to Dropbox project in Qwasar Silicon Waley</h1>
//   </div>
// )
