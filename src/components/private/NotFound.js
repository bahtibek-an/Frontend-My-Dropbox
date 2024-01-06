import React from "react";
import { Link, useParams } from "react-router-dom";

const NotFound = () => {
  const params = useParams();
  return (
    <>
      <main className="main">
        <div className="register d-flex justify-content-center align-items-center position-absolute">
          <div className="container text-center p-5">
            <h1 className="text-danger">"/{params.pageName}"</h1>
            <h3 className="card-text fs-4">Page not found</h3>
            <i className='f'>It's looking like you may have taken a wrong turn...</i> <br />
            <Link to="/"><button className="btn btn-primary w-100 mt-3">Go to the back.</button></Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;