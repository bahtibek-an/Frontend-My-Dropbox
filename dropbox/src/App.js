import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NewPost from './components/NewPost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/' element={<SignUp />} />
          <Route path='/newpost' element={<NewPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;