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
import { SignIn } from '../../components/auth/auth';

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
            console.log("values", values);
            SignIn({name:"kminchelle",password:"0lelplR"})
            .then(res => console.log("res",res))
            .catch(err => console.log("err",err))    
        }
    });

    const classes = useStyles();
    const [showPassword,setShowPassword] = useState(false)
// useEffect(() => {
// axios.get("http://10.100.127.90:8081/test/person").then((res) => {
//     console.log("res",res.data);
// })
// axios.post("http://10.100.127.90:8081/login",{
//     userName:"ravi",
//     password:"Ravikumar123"
// }).then((res) => {
//         console.log("res",res.data);
//     })

// },[])

    return (
        // <ThemeProvider theme={theme}>
        <Container maxWidth="xs" className={classes.mainCon}>
            {/* <CssBaseline /> */}
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
                            endAdornment : (
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
        // </ThemeProvider>
    )
}

export default LogIn;
