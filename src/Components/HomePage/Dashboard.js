import React, { useEffect } from 'react';
import './Dashboard.css';
import pic1 from './pic1.jpg';
import pic2 from './pic2.png';
import pic6 from './pic6.jpg';
import M from 'materialize-css';

const Dashboard = () => {
  useEffect(() => {
    let elements = document.querySelectorAll(".parallax");
    M.Parallax.init(elements);
  }, []);

  return (
    <body>

      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <br /><br />
            <h1 className="header center teal-text text-lighten-1"><i className="material-icons medium">cloud</i>Dropbox</h1>
            <div className="row center">
              <h5 className="header col s12 teal-text lighten-5"><b>Everything your teams need in one centralized place</b></h5>
              <h4 className="header col s12 black-text">Dropbox is more than a secure file storage. It's an intelligent workspace that centralizes teams, tools, and content.</h4>
            </div>
            <div className="row center">
              <a href='/signup' id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Try for free for 30 days</a>
            </div>
            <br /><br />
            <div className="parallax"><img src={pic2} alt={"Unsplashed background img 1"} /></div>

          </div>

        </div>
      </div>

      <div className="container">
        <div className="section">

          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">next_week</i></h2>
                <h5 className="center">Centralize your team's content</h5>
                <p className="light">Create, store, and share cloud content with Google Docs, Sheets, and Slides, Microsoft Office, and DropBox Paper, and group them with your standard FireBox files.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                <h5 className="center">Collaborate as a team, anywhere, anytime</h5>
                <p className="light">Easily access your team's work on your computer, mobile device, or the web browser of your choice.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">devices</i></h2>
                <h5 className="center">Gain peace of mind</h5>
                <p className="light">With our secure distributed infrastructure and administration tools providing control and visibility, your company's data is safe in DropBox.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h5 className="header col s12 black-text">Provide an intelligent workspace for your business</h5>
            </div>
          </div>
          <div className="parallax"><img src={pic1} alt={"Unsplashed background img 1"} /></div>
        </div>
      </div>

      <div className="container">
        <div className="section">

          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">next_week</i></h2>
                <h5 className="center">Transform your folders</h5>
                <p className="light">DropBox Spaces brings together your traditional files and cloud content in one place. Your PowerPoint presentations coexist with your Google Docs, Trello boards, and all the other tools your team wants to use.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">speed</i></h2>
                <h5 className="center">Quickly find what you need</h5>
                <p className="light">With intelligent file and folder suggestions, your team stays ahead. All users have access to the content they need, when they need it.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">cloud_done</i></h2>
                <h5 className="center">Use your favorite collaboration tools</h5>
                <p className="light">Group your team's files and corresponding conversations in DropBox by connecting tools like Slack and Zoom.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h5 className="header col s12 black-text">Multiply possibilities with Dropbox Business</h5>
            </div>
          </div>
        </div>
        <div className="parallax"><img src={pic6} alt="Unsplashed background img 1" /></div>
      </div>

      <footer className="page-footer teal">
        <div className="container">
          <div className="row">

            <div className="col s12 center ">
              <h5 className="white-text">Follow us on social media for special offers:</h5>
              <a className="white-text" href="#!"><i className="fab fa-facebook small fa-4x"></i></a>
              <a className="white-text" href="#!"><i className="fab fa-twitter small fa-4x"></i></a>
              <a className="white-text" href="#!"><i className="fab fa-linkedin small fa-4x"></i></a>
              <a className="white-text" href="#!"><i className="fab fa-google small fa-4x"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <p className="white-text left">A Dropbox clone made by Paul Tizhe</p>
            <p className="flow-text right">Dropbox &copy; 2024</p>
          </div>
        </div>
      </footer>

      <script src="http://materializecss.com/js/init.js"></script>

    </body>
  );
};

export default Dashboard;
