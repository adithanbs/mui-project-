import React from 'react'
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Container, CssBaseline, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';
import { userforgotPasswordRequest } from '../../redux/slicers/authenticationSlice/auth';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/loadingSpinner';




// valitaction
const validationSchema = yup.object({

    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required")
   
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


const ForgotPassword = () => {
  

     // use redux Hooks
     const auth = useSelector (state => state.auth)
    //  console.log("auth",auth);
     
    // styles
    const classes = useStyles();
  
    const dispatch = useDispatch(); 

      // On submit fun
      const formik = useFormik({
        initialValues: {
            email: "",
           
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
             console.log("values", values);
             dispatch(userforgotPasswordRequest({emailId:values.email}))
            //  if(error){
            //     toast.error("wrong email please check")
            //     return false
            //  }
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
                {/* {isLoading && <Spinner />} */}
                <div className={classes.paper}>
                <Typography variant="h5" gutterBottom>Forgot Password</Typography>
                </div>
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

export default ForgotPassword;
