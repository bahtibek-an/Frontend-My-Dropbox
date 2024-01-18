import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../mainStyles/mainInput';
import Button from '../mainStyles/mainButton';
import Message from '../mainStyles/mainMessage';
import { sendPasswordResetEmail } from '../../Logic/operations/authOperation';
import { RootState } from '../../Logic/store.main';
import { setError, setSuccess } from "../../Logic/operations/pageOperation";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.page);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
      if (success) {
        dispatch(setSuccess(''));
      }
    }
  }, [error, dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (success) {
      dispatch(setSuccess(''));
    }
    if (error) {
      dispatch(setError(''));
    }
    setLoading(true);
    dispatch(sendPasswordResetEmail(email, "Email sent!"));
    setLoading(false);
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Reset password</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          {success && <Message type="success" msg={success} />}
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Enter email"
            label="Email"
          />
          <Button text={loading ? "Loading..." : "Send password reset email"} className="is-dark is-fullwidth mt-5" disabled={loading} />
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
