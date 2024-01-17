import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword: React.FC = () => {
      const [email, setEmail] = useState('');
      const [, setResetEmailSent] = useState(false);
      const [error, setError] = useState<string | null>(null);

      const handleResetPassword = async () => {
            try {
                  await sendPasswordResetEmail(auth, email);
                  setResetEmailSent(true);
                  alert(<div className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline"> Password reset email sent. Check your email.</span>
                  </div>)
                  setError(null);
            } catch (error) {
                  setResetEmailSent(false);
            }
      };

      return (
            <div>
                  <main className="flex overflow-hidden">
                        <div className="flex-1 hidden lg:block">
                              <img src="https://images.unsplash.com/photo-1697135807547-5fa9fd22d9ec?auto=format&fit=crop&q=80&w=3387&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-screen object-cover" />
                        </div>
                        <div className="py-12 flex-1 lg:flex lg:justify-center items-center lg:h-screen lg:overflow-auto">
                              <div className="max-w-lg flex-1 mx-auto px-4 text-gray-600">
                                    <div>
                                          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                                                Forgot password
                                          </h3>
                                    </div>
                                    <p className="mt-3">
                                          Back <span className="text-blue-700 font-normal cursor-pointer"><Link to={"/login"}>Login</Link></span>
                                          <hr className='mb-2 mt-2' />
                                          <span className='text-gray-400'>A message to change the password will be sent to the email you entered.
                                                <Link to={"https://gmail.google.com"} className='text-blue-600 pl-1'>Gmail</Link>
                                          </span>
                                    </p>
                                    <hr className='mb-2 mt-2' />
                                    <form
                                          onSubmit={handleResetPassword}
                                          className="space-y-5 mt-3 lg:pb-12"
                                    >
                                          <div>
                                                <label className="font-medium">Enter your email</label>
                                                <input
                                                      type="email"
                                                      placeholder="yourname@company.host"
                                                      required
                                                      value={email}
                                                      onChange={(e) => setEmail(e.target.value)}
                                                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                                />
                                          </div>
                                          <button
                                                type="submit"
                                                className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150"
                                          >
                                                Submit
                                          </button>
                                    </form>
                                    {error && (
                                          <p className="text-red-500 mt-3">{error}</p>
                                    )}
                              </div>
                        </div>
                  </main>
            </div>
      );
};

export default ForgotPassword;
