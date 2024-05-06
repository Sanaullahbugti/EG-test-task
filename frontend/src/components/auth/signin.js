import { React, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { createTheme } from '@mui/material/styles';
// import { login } from "../../service";
import { Grid, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Notification from "../alert";
import {signIn} from "../../services/auth";

const defaultTheme = createTheme();

export function SignIn() {
  const [notify, setNotify] = useState({ open: false, type: "", message: "Welcome" })
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault(); };

  return (
    <div theme={defaultTheme}>
      <Notification notify={notify} setNotify={setNotify} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card className='card_shadow' sx={{
            maxWidth: 400, marginTop: 8,
            display: 'flex',
            padding: "4rem 2rem",
            flexDirection: 'column',
            alignItems: 'center',
          }}>

            <Typography style={{ fontSize: "15px", marginBottom: "2rem" }}>
              Sign in to continue
            </Typography>
            <Formik
              initialValues={{
                email: '',
                password: ''
                // submit: null
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email("Please enter a valid email address").required("Email is required"),
                password: Yup.string().required("Password is required")
                  .min(8, "Password must be at least 8 characters long")
                  .matches(/[a-zA-Z]/, "Password must contain at least one letter")
                  .matches(/[0-9]/, "Password must contain at least one number")
                  .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
              })}
              onSubmit={async (values) => {
                signIn(values).then((response) => {
                  setNotify({ open: true, message: response?.message ?? 'You are logged in', type: 'success' });
                  localStorage.setItem("auth",true)
                      navigate('/');
                    
                  })
                  .catch((err) => {
                    console.log('err ==>', err);
                    setNotify({
                      open: true,
                      message: err?.message ?? err ?? 'Error',
                      type: 'error'
                    });
                  });
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        id="email-login"
                        label="Email"
                        type="text"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter email"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password-login"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter password"
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    {errors.submit && (
                      <Grid item xs={12}>
                        <Typography color="error">{errors.submit}</Typography>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="outlined"
                        color="primary"
                      >
                        Sign in
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
            <Box noValidate sx={{ mt: 1 }}>

              <Grid container>
                <Grid item xs>
                  <Button onClick={() => navigate("/signup")}> Sign up</Button>
                </Grid>

              </Grid>
            </Box>
          </Card>

        </Box>
      </Container>
    </div>

  );
}