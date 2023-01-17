import React from 'react'
// import { Avatar, CssBaseline } from '@mui/material';
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { Box, Container } from '@mui/system';
// import { makeStyles } from '@material-ui/core/styles';
import { Button, CssBaseline, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {SignIn,Authenticated,isAuthenticated} from '../../components/auth/auth'
import Spinner from '../../components/loadingSpinner';

const validationSchema = yup.object({

    email: yup
        .string("Enter your email")
        // .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .required('Please Enter your password')
    // .matches(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // ),

});



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

const LogIn = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //  console.log("values", values);
            setLoader(true);
            SignIn({ emailId: values.email, password: values.password })
                .then((data) => {
                    setLoader(false);
                    if (data.error) {
                        toast("Wow so easy !")
                    }
                    else {
                        toast.error(data.err);
                    }
                }
            )

            .catch(error => 
                {
                setLoader(false)
                console.log("err", error)
            }
                
                )

        }
    });

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [loader,setLoader] =  useState(false)
    
     
    
    return (
        <>
        {/* // <ThemeProvider theme={theme}> */}

        <Container maxWidth="xs" className={classes.mainCon}>
            {/* <CssBaseline /> */}
            {/* <Toster /> */}
            {/* <button onClick={notify}>Notify !</button> */}
          {  loader && <Spinner/>}

            <div className={classes.paper}>
                <Avatar
                    className={classes.avatar}
                >
                </Avatar>
                <Typography variant="h5" gutterBottom> Signin </Typography>
                <Box
                    className={classes.box}
                    component="form"
                    onSubmit={formik.handleSubmit}
                >

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        id="email"
                        name="email"
                        type={"email"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="password"
                        name='password'
                        label="Password"
                        type={showPassword ? "text" : "Password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                    // onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>

                                </InputAdornment>
                            )
                        }

                        }

                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >Sign In</Button>
                </Box >

            </div>

        </Container>
        </>
    // {/* </ThemeProvider> */}
      
    )
}

export default LogIn;
