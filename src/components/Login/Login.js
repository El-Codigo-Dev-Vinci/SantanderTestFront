import {
  Box,
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useApi } from '../../utils/fetchApi';
import { useSetRecoilState } from 'recoil';
import { initialUserRoute, userState } from '../../state/user';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { TEXT } from '../../text/Text';
import { LoadingButton } from '../ui/LoadingButton';

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { create } = useApi('user/login');

  const [showPassword, setShowPassword] = useState(false);
  const [haveErrorIn, setHaveErrorIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const setUser = useSetRecoilState(userState);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToSignUp = () => {
    history.push('/signUp');
  };

  const validateLogin = async () => {
    setHaveErrorIn(false);
    setLoading(true);

    try {
      const user = await create(userData);
      setUser(user.data);
      history.push(initialUserRoute(user));
    } catch (error) {
      setLoading(false);
      setHaveErrorIn(true);
    }
  };

  return (
    <ValidatorForm onSubmit={validateLogin} instantValidate={false}>
      <Box mt={5} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          {TEXT.login}
        </Typography>
      </Box>

      <Grid container spacing={4} align="center">
        <Grid item xs={12}>
          <Grid item xs={9} sm={7} md={4} className={classes.margin}>
            <TextValidator
              id="email"
              label={TEXT.mailGet}
              onChange={handleChange}
              name="email"
              fullWidth
              value={userData.email}
              validators={['required', 'isEmail']}
              errorMessages={[TEXT.required, TEXT.mailError]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIndIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={9} sm={7} md={4}>
            <TextValidator
              id="password"
              label={TEXT.passwordGet}
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              fullWidth
              value={userData.password}
              validators={['required']}
              errorMessages={[TEXT.required]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      style={{ color: 'black' }}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {haveErrorIn && (
          <Grid item xs={12} align="center">
            <Typography color="error">{TEXT.loginError}</Typography>
          </Grid>
        )}
      </Grid>

      <Grid container item xs={12} spacing={1} className={classes.margin}>
        <Grid item xs={6} align="right">
          <LoadingButton texto={TEXT.login} loading={loading} />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="inherit" onClick={goToSignUp}>
            {TEXT.signUp}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} align="center" className={classes.margin}>
        <Typography>{TEXT.forgotPassword}</Typography>
      </Grid>
    </ValidatorForm>
  );
}

const useStyles = makeStyles(() => ({
  margin: {
    marginTop: 20,
  },
}));
