import { Button, Grid, Typography, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '../ui/LoadingButton';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useApi } from '../../utils/fetchApi';
import { useSetRecoilState } from 'recoil';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { userState } from '../../state/user';
import { TEXT } from '../../text/Text';

export default function SignUp() {
  const history = useHistory();
  const { create } = useApi('user/signup');

  ValidatorForm.addValidationRule(
    'isPasswordMatch',
    (value) => value === userData.password
  );

  ValidatorForm.addValidationRule('validPassword', (value) =>
    /^.{6,}$/.test(String(value))
  );

  const setUser = useSetRecoilState(userState);

  const [userData, setUserData] = useState({
    password: '',
    matchPassword: '',
  });
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [haveError, setHaveError] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const goBackToLogin = () => {
    history.push('/login');
  };

  const validateSignUp = async () => {
    setLoadingIcon(true);
    setHaveError(false);

    create(userData)
      .then((user) => {
        setUser(user.data);
        history.push('/home');
      })
      .catch((err) => {
        setLoadingIcon(false);
        setHaveError(true);
      });
  };

  return (
    <>
      <ValidatorForm onSubmit={validateSignUp} instantValidate={false}>
        <Grid item align="center" xs={12}>
          <Typography variant="h4" color="primary">
            {TEXT.signUp}
          </Typography>
        </Grid>

        <Grid container spacing={4} align="center">
          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4} style={{ marginTop: 20 }}>
              <TextValidator
                id="name"
                label={TEXT.nameGet}
                name="name"
                value={userData.name}
                fullWidth
                onChange={handleChange}
                validators={['required']}
                errorMessages={[TEXT.required]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                id="email"
                label={TEXT.mailGet}
                name="email"
                onChange={handleChange}
                fullWidth
                value={userData.email}
                validators={['required', 'isEmail']}
                errorMessages={[TEXT.required, TEXT.mailError]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                id="password"
                label={TEXT.passwordGet}
                name="password"
                type="password"
                fullWidth
                helperText={TEXT.passwordHelper}
                onChange={handleChange}
                value={userData.password}
                validators={['required', 'validPassword']}
                errorMessages={[TEXT.requerido, TEXT.passwordError]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                id="matchPassword"
                label={TEXT.passwordMatchGet}
                name="matchPassword"
                type="password"
                fullWidth
                onChange={handleChange}
                value={userData.matchPassword}
                validators={['required', 'isPasswordMatch']}
                errorMessages={[TEXT.required, TEXT.passwordMatchError]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {haveError && (
            <Grid item xs={12} align="center">
              <Typography color="error">{TEXT.signUpError}</Typography>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={1} style={{ marginTop: 20 }}>
          <Grid item xs={6} align="right">
            <Button onClick={goBackToLogin}>{TEXT.cancel}</Button>
          </Grid>
          <Grid item xs={6}>
            <LoadingButton loading={loadingIcon} />
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}
