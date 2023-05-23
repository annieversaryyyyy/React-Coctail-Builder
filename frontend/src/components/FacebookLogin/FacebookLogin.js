import React from 'react';
import {useDispatch} from "react-redux";
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {facebookAppId} from "../../config";
import FacebookIcon from '@mui/icons-material/Facebook';
import {Button} from "@mui/material";
import {facebookLoginRequest} from "../../store/actions/usersActions";

const FacebookLogin = () => {
  const dispatch = useDispatch();

  const facebookResponse = response => {
    dispatch(facebookLoginRequest(response));
  };

  return (
    <FacebookLoginButton
      appId={facebookAppId}
      fields="name,email,picture"
      callback={facebookResponse}
      render={props => (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon/>}
          onClick={props.onClick}
          sx={{marginBottom: '5px'}}
        >
          Enter with Facebook
        </Button>
      )}
    />
  );
};

export default FacebookLogin;