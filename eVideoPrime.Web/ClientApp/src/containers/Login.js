import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useSearchParams } from 'react-router-dom';

import * as Yup from "yup";
import AuthService from "../services/AuthService";

export default function Login() {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const returnUrl = searchParams.get('return');
    return (
        <div className="col-sm-5">
            <h1>Login</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={
                    Yup.object({
                        username: Yup.string().required('Please Enter Name'),
                        password: Yup.string().required('Please Enter Password')
                    })
                }
                onSubmit={(values, { setSubmitting }) => {
                    AuthService.Login(values).then(res => {
                        if (res.status === 200 && res.data) {
                            const user = res.data;
                            localStorage.setItem('user', JSON.stringify(user));

                            console.log(returnUrl);
                            if (returnUrl != null)
                                navigate(`/${returnUrl}`);

                            if (user.roles.indexOf('User') > -1) {
                                navigate('/user');
                            }
                            else if (user.roles.indexOf('Admin') > -1) {
                                navigate('/admin');
                            }
                        }
                    });
                }}>
                <Form>
                    <div className="mb-3">
                        <label>Email</label>
                        <Field name="username" type="text" className="form-control" />
                        <ErrorMessage component="label" className="text-danger" name="username" />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <Field name="password" type="password" className="form-control" />
                        <ErrorMessage component="label" className="text-danger" name="password" />
                    </div>
                    <div className="mb-3">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </Form>
            </Formik>
        </div>
    );
}