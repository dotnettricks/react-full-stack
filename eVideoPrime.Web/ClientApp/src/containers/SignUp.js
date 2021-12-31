import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';

import * as Yup from "yup";
import AuthService from "../services/AuthService";

export default function SignUp() {
    let navigate = useNavigate();
    return (
        <div className="col-sm-5">
            <h1>Sign Up</h1>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phoneNumber: ''
                }}
                validationSchema={
                    Yup.object({
                        name: Yup.string().required('Please Enter Name'),
                        email: Yup.string().required('Please Enter Email').email('Please Enter Correct Email'),
                        password: Yup.string().required('Please Enter Password'),
                        confirmPassword: Yup.string().required('Please Enter Confirm Password').oneOf(
                            [Yup.ref('password'), null], "Confirm Password doesn't match"),
                        phoneNumber: Yup.string().required('Please Enter Phone Number'),
                    })
                }
                onSubmit={(values, { setSubmitting }) => {
                    values.role = "User"; //for creating end user
                    AuthService.Register(values).then(res => {
                        console.log(res);
                        if (res.status === 201) {
                            navigate('/login');
                        }
                    });
                }}>
                <Form>
                    <div className="mb-3">
                        <label>Name</label>
                        <Field name="name" type="text" placeholder="Name" className="form-control" />
                        <ErrorMessage component="label" className="text-danger" name="name" />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <Field name="email" type="text" className="form-control" />
                        <ErrorMessage component="label" className="text-danger" name="email" />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <Field name="password" type="password" className="form-control" />
                        <ErrorMessage component="label" className="text-danger" name="password" />
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <Field name="confirmPassword" type="password" className="form-control" />
                        <ErrorMessage component="label" className="text-danger" name="confirmPassword" />
                    </div>
                    <div className="mb-3">
                        <label>Phone Number</label>
                        <Field name="phoneNumber" type="text" className="form-control" />
                        <ErrorMessage component="label" className="text-danger" name="phoneNumber" />
                    </div>
                    <div className="mb-3">
                        <input type="submit" value="Sign Up" className="btn btn-primary" />
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
