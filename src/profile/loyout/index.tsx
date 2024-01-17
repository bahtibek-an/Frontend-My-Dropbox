import React from 'react';
import icon from "../../../public/icon.svg";
import deleteIcon from "../../../public/delete.svg";
import homeIcon from '../../../public/home.svg'
import logoutIcon from '../../../public/logout.svg'
import settingsIcon from '../../../public/settings.svg'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from './header';
import { signOut } from '../../firebase/firebase';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <img src={icon} alt="icon dropbox" />
      </button>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center ps-2.5 mb-5">
            <img src={icon} className="h-6 me-3 sm:h-7" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Dropbox</span>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={"/upload"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img src={homeIcon} alt="" />
                <span className="ms-3">Upload</span>
              </Link>
            </li>
            <li>
              <Link to={"/delete"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img src={deleteIcon} alt="delete" />
                <span className="flex-1 ms-3 whitespace-nowrap">Delete</span>
              </Link>
            </li>
            <li>
              <Link to={"/settings"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img src={settingsIcon} alt="delete" />
                <span className="flex-1 ms-3 whitespace-nowrap">Setting</span>
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut} className="w-full text-start flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <img src={logoutIcon} alt="logout" />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <header className='ml-64'>
        <Header />
      </header>
      <section className='p-4 sm:ml-64'>
        <Outlet />
      </section>
    </div>
  )
}

export default Index
