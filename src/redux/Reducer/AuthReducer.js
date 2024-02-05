import * as types from '../Actions/AuthAction'

const initialState = {
  isLogged: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        ...state,
        isLogged: true,
        user: action.payload,
      };

    case types.SIGN_OUT:
      return {
        ...state,
        isLogged: false,
        user: null,
      };
      

    default:
      return state;
  }
};


export default authReducer