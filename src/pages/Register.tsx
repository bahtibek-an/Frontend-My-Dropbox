import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useSigninCheck } from 'reactfire';
import { useEffect } from 'react';

const authSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

interface User {
    email: string;
    password: string;
    confirmPassword: string;
}

export const Register = () => {
    const { status, data: signInCheckResult } = useSigninCheck({
        suspense: true
    });

    const { user } = signInCheckResult || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/workspace');
        }
    }, [user, navigate]);

    const { register, handleSubmit, formState: { errors }, setError } = useForm<User>(
        {
            resolver: yupResolver(authSchema),
            defaultValues: {
                email: '',
                password: '',
                confirmPassword: '',
            }
        }
    );

    const auth = getAuth();

    const onSubmit = (data: User) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                navigate('/workspace');
                return true
            }).catch(async (err) => {
                console.log('err', err);
                const formError = { type: "server", message: "An error occurred while registering. Please try again later." }
                setError('email', formError)
                return false
            })
    }

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-3 bg-neutral-100 p-6 w-96">
                    <h1 className="text-cyan-600 font-semibold text-6xl mb-1"> Register </h1>

                    <input type="text" placeholder="Email" className="rounded-md p-3" {...register("email")} />
                    {errors.email ? <span className="text-red-600">{errors.email.message}</span> : null}

                    <input type="password" placeholder="Password" className="rounded-md p-3" {...register("password")} />
                    {errors.password ? <span className="text-red-600">{errors.password.message}</span> : null}

                    <input type="password" placeholder="Confirm Password" className="rounded-md p-3" {...register("confirmPassword")} />
                    {errors.confirmPassword ? <span className="text-red-600">{errors.confirmPassword.message}</span> : null}

                    <button className="bg-cyan-500 rounded text-white hover:bg-cyan-400 p-2"> Register </button>
                    <Link to="/login">I Have Already Account!</Link>

                </div>
            </form>
        </div>
    )
}

export default Register
