import React, { useState } from 'react'
import { Box, Container } from '@mui/system'
import { Avatar, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthValue } from '../../redux/slicers/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Spinner from '../../components/loadingSpinner';
import { SignUp } from '../../auth/helper';


// valiction
const validationSchema = yup.object({
    firstName: yup
        .string()
        .max(15, "Must be 15 characters or less")
        .required("First name is Require"),
    lastName: yup.string()
        .max(20, "Must be 20 characters or less")
    // .required("Last name is Require")
    ,
    phoneNumber: yup.string()
        .max(10, "Must be 20 characters or less")
        .required("Last name is Require"),
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
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
    gender: yup.string().required("Please select you gender"),
    userType: yup.string()
    // .required("Please select user Type")
    ,
    checkBox: yup
        .boolean()
    // .required("Required")
    // .oneOf([true], "You must accept the terms and conditions.")
    ,
});


// styles
const theme = createTheme();

const Index = () => {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState({
        confirmPassword: false,
        password: false
    });
    const [loader, setLoader] = useState(false);
    console.log("selector", auth);
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            changepassword: "",
            gender: "",
            checkBox: false
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoader(true)
            SignUp({ name: values.firstName, gender: values.gender, emailId: values.email, password: values.changepassword, phoneNumber: values.phoneNumber, })
                .then((data) => {
                    if (!data.error) {
                        setLoader(false)
                    } else {
                        setLoader(false)
                    }
                })
                .catch((error) => console.log(error))

            console.log("values", values);
            dispatch(setAuthValue(values))


        }
    });



    return (
        <>

            <ThemeProvider theme={theme}>
                {/* loader */}
                {loader && <Spinner />}
                {/* loader */}
                <Container maxWidth="xs">
                    <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }} >
                        <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>
                             <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        name="firstName"
                                        id="firstName"
                                        label="First Name"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        name="lastName"
                                        id="lastName"
                                        label="Last Name"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        // required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        // required
                                        fullWidth
                                        id="phoneNumber"
                                        label="Mobile Number"
                                        name="phoneNumber"
                                        autoComplete="email"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                </Grid>
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
                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"

                                        >
                                            <FormControlLabel value="female"
                                                name='gender'
                                                onChange={formik.handleChange}

                                                control={<Radio />} label="Female" />
                                            <FormControlLabel value="male"
                                                name='gender'
                                                onChange={formik.handleChange}

                                                control={<Radio />} label="Male" />
                                            <FormControlLabel value="other"
                                                name='gender'
                                                onChange={formik.handleChange}

                                                control={<Radio />} label="Other" />                             
                                        </RadioGroup>
                                    </FormControl>
                                    <Typography variant='subtitle1: h2' color={"error"} display="block" gutterBottom>{formik.errors.gender}</Typography>

                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.userType}
                                            label="User Type"
                                            onChange={formik.handleChange}
                                            name="userType"
                                            error={formik.errors.userType}
                                        >
                                            <MenuItem value={"user"}>User</MenuItem>
                                            <MenuItem value={"admin"}>Admin</MenuItem>
                                            <MenuItem value={"manager"}>Manager</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Typography variant='subtitle1: h2' color={"error"}>{formik.errors.userType}</Typography>

                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox
                                            name="checkBox"
                                            color="primary"
                                            checked={formik.values.checkBox}
                                            onChange={formik.handleChange}                               
                                            error={Boolean(formik.errors.checkBox)}
                                            helperText={formik.errors.checkBox}
                                        />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                        error={Boolean(formik.errors.checkBox)}
                                        helperText={formik.errors.checkBox}
                                    />

                                    <Typography variant='subtitle1: h2' color={"error"}>{formik.errors.checkBox}</Typography>

                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default Index;