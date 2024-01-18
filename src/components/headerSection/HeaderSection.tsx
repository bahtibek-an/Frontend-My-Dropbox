import React, { FC } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../mainStyles/mainButton';
import { RootState } from '../../Logic/store.main';
import { signout } from '../../Logic/operations/authOperation';

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-40 pt-5 mt-5">
        {!user ? (
          <div className="d-flex flex-row">
            <Button text="Register" onClick={() => history.push('/signup')} className="btn btn-success btn-lg mx-2" />
            <Button text="Login" onClick={() => history.push('/signin')} className="btn btn-success btn-lg mx-2" />
          </div>
        ) : (
          <Button text="Sign out" onClick={logoutClickHandler} className="btn btn-success btn-lg" />
        )}
      </div>
    </div>
  );

}

export default Header;
