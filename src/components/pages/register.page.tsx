import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../mainStyles/mainInput';
import Button from '../mainStyles/mainButton';
import Message from '../mainStyles/mainMessage';
import { signup } from '../../Logic/operations/authOperation';

import { RootState } from '../../Logic/store.main';
import { setError } from "../../Logic/operations/pageOperation";

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState('');
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
    // Assuming you have a name property, you might want to set it to an empty string or handle it appropriately.
    dispatch(signup({ email, password, firstName, name: '' }, () => setLoading(false)));
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3 pt-5 mt-5">Register</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <Input
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder="First name"
            label="First name"
          />
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Enter email"
            label="Email"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Enter password"
            label="Password"
          />
          <Button text={loading ? "Loading..." : "Sign Up"} className="is-dark is-fullwidth mt-5 btn-lg" disabled={loading} />
        </form>
      </div>
    </section>
  );
}

export default SignUp;
