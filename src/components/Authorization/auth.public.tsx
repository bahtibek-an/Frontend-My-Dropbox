import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps, useHistory, useLocation } from 'react-router-dom';

import { RootState } from '../../Logic/store.main';

interface Props extends RouteProps {
  component: any;
}

const PublicRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation<{ next: string }>()
  const history = useHistory()

  return (
    <Route {...rest} render={props => !authenticated ? <Component {...props} /> :
      <Redirect to="/dashboard" />} />
  );
}

export default PublicRoute;