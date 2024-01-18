import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Input from '../mainStyles/mainInput';
import Button from '../mainStyles/mainButton';
import Message from '../mainStyles/mainMessage';
import { signin } from '../../Logic/operations/authOperation';
import { RootState } from '../../Logic/store.main';
import { setError } from "../../Logic/operations/pageOperation";

const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.page);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    }
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(''));
    }
    setLoading(true);
    dispatch(signin({ email, password }, () => setLoading(false)));
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-5 pt-5 mt-5">Login</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <h1>Email</h1>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Enter Email"
            label=""
          />
          <h1>Password</h1>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Enter Password"
            label=""
          />
          <p><Link to="/forgot-password">Forgot password</Link></p>
          <Button text={loading ? "Loading..." : "Login"} className="is-dark is-fullwidth mt-5" disabled={loading} />
        </form>
      </div>
    </section>
  );
}

export default SignIn;

