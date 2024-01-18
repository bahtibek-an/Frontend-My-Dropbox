import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../mainStyles/mainMessage';
import { RootState } from '../../Logic/store.main';
import { setSuccess } from "../../Logic/operations/pageOperation";

const Dashboard: FC = () => {
  const { user, needVerification } = useSelector((state: RootState) => state.auth);
  const { success } = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(''));
    }
  }, [success, dispatch]);

  return (
    <section className="section">
      <div className="container">
        {needVerification && <Message type="success" msg="Please verify your email address." />}
        <h1 className="is-size-1">Welcome {user?.firstName}</h1>
      </div>
    </section>
  );
}

export default Dashboard;
