import React, { FC, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/headerSection/HeaderSection';

import ForgotPassword from './components/pages/forgot.page';
import Loader from './components/mainStyles/mainLoader';
import firebase from './dataConfig/firabesa.config';
import { getUserById, setNeedVerification } from './Logic/operations/authOperation';
import { RootState } from './Logic/store.main';
import { startLoading, endLoading } from "./Logic/operations/pageOperation";
import PrivateRoute from "./components/Authorization/auth.private";
import PublicRoute from "./components/Authorization/auth.public";
import FileUpload from './components/pages/upload.page';

const SignIn = React.lazy(() => import('./components/pages/login.page'))
const SignUp = React.lazy(() => import('./components/pages/register.page'))
const Homepage = React.lazy(() => import('./components/pages/home.page'))
const Dashboard = React.lazy(() => import('./components/pages/dashboard.page'))

const App: FC = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.page);

    // Check if user exists
    useEffect(() => {
        dispatch(startLoading);
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(startLoading);
                await dispatch(getUserById(user.uid));
                if (!user.emailVerified) {
                    dispatch(setNeedVerification());
                }
            }
            dispatch(endLoading);
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Header />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path="/" component={Homepage} exact />
                    <PublicRoute path="/signup" component={SignUp} exact />
                    <PublicRoute path="/signin" component={SignIn} exact />
                    <PublicRoute path="/forgot-password" component={ForgotPassword} exact />
                    <PrivateRoute path="/dashboard" component={FileUpload} exact />
                    {/* <PrivateRoute path="/files" component={FileUpload} exact /> */}
                </Switch>
            </Suspense>
        </>
    );
}

export default App;
