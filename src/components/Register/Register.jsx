import React from "react";
import * as Yup from "yup";
import css from "./Register.module.css";
import Modal from "../Modal/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerUser } from "../../services/authService.js";

const Register = ({ onClose }) => {
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "tooshort")
      .max(50, "too long")
      .required("required"),
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string()
      .min(6, "too short")
      .max(16, "too long")
      .required("required"),
  });
  return (
    <div>
      <Modal onClose={onClose}>
        <div className={css.registerContainer}>
          <div className={css.registerLabel}>
            <h2 className={css.registerTitle}>Registration</h2>
            <p className={css.registerDesc}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information.
            </p>
          </div>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={async (
              values,
              { resetForm, setSubmitting, setStatus }
            ) => {
              try {
                await registerUser(values.email, values.password); // 🔥 FIREBASE
                resetForm();
                onClose();
              } catch (error) {
                console.log("FIREBASE ERROR CODE:", error.code);
                console.log("FIREBASE ERROR MESSAGE:", error.message);
                setStatus(error.message);
              } finally {
                setSubmitting(false);
              }
            }}
            validationSchema={formSchema}
          >
            <Form className={css.form}>
              <div className={css.formItem}>
                <Field
                  className={css.formInput}
                  name="name"
                  type="text"
                  placeholder="Name"
                />
                <ErrorMessage name="name" component="span" />
              </div>
              <div className={css.formItem}>
                <Field
                  className={css.formInput}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="span" />
              </div>
              <div className={css.formItem}>
                <Field
                  className={css.formInput}
                  name="password"
                  type="text"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="span" />
              </div>
              <div>
                <button type="submit" className={css.btn}>
                  Sign Up
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
