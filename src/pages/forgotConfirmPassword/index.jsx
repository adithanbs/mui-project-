import React from 'react'
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';
import { userforgotPasswordConfirm } from '../../redux/slicers/authenticationSlice/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';




// valitaction
const validationSchema = yup.object({
    password: yup
        .string()
        .required('Please Enter your password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    changepassword: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
            [yup.ref("password")],
            "Both password need to be the same"
        )
    }),

});


// styles
const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    box: {
        marginTop: theme.spacing(1),
        m: 1
    }

}));


const ForgotConfirmPassword = () => {


    // use redux Hooks
    const {auth}  = useSelector (state => state.auth)
    // console.log("auth",auth);
    // useStyles
    const classes = useStyles();
    //   state
    const [showPassword, setShowPassword] = useState({
        confirmPassword: false,
        password: false
    });

    const dispatch = useDispatch();

    // On submit fun
    const formik = useFormik({
        initialValues: {
            email: "",

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("values", values);
            dispatch(userforgotPasswordConfirm({ emailId: values.email }))
            // setLoader(true);
            // SignIn({ emailId: values.email, password: values.password })
            //     .then((data) => {

            // setLoader(false);
            // if (!data.data.error) {
            //     toast.success("Logged in Successfully")

            //     Authenticated(data.data.data.accessToken)
            //     console.log("isAuthenticated()", isAuthenticated());
            // didRedirect(isAuthenticated());
            // if (isAuthenticated()?.type === "ADMIN") {
            //     // console.log(jwt_decode(data.data.data.accessToken))
            //     console.log("oooo", isAuthenticated()?.type);
            //     //  return <Navigate to="/admin-dashboard" replace />
            //     return navigate("/admin-dashboard");
            // } else {
            //     return navigate("/user-dashboard");
            // }
            // }
            // else {
            //     toast.error("User Name and Password are not Matching");

            // }
            // }
            // )

            // .catch(error => {
            //     setLoader(false)
            //     console.log("err", error)
            // }

            // )
        }
    });

    return (
        <>
            <Container maxWidth="xs" className={classes.mainCon}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography variant="h5" gutterBottom>Forgot Password</Typography>
                </div>
                <Box
                    className={classes.box}
                    component="form"
                    onSubmit={formik.handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                // required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword.password ? "text" : "Password"}
                                id="password"
                                autoComplete="new-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                                            // onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword.password ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>

                                        </InputAdornment>
                                    )
                                }

                                }
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                // required
                                fullWidth
                                name="changepassword"
                                label="Change Password"
                                type={showPassword.confirmPassword ? "text" : "Password"}
                                id="password"
                                autoComplete="new-password"
                                value={formik.values.changepassword}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.changepassword)}
                                helperText={formik.touched.changepassword && formik.errors.changepassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                                            // onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>

                                        </InputAdornment>
                                    )
                                }

                                }
                            />

                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >Submit</Button>
                </Box>
            </Container>
        </>
    )
}

export default ForgotConfirmPassword;
