// import { ErrorMessage, Field, Formik, Form } from "formik";
// import React, { useContext } from "react";

// import * as Yup from "yup";
// import css from "./Login.module.css";
// import Modal from "../Modal/Modal.jsx";
// import { AuthContext } from "../../context/AuthContext.jsx";

// const Login = ({ onClose }) => {
//   const { login } = useContext(AuthContext);
//   const formSchema = Yup.object().shape({
//     email: Yup.string().required("required"),
//     password: Yup.string()
//       .min(6, "too short")
//       .max(16, "too long")
//       .required("required"),
//   });
//   return (
//     <Modal onClose={onClose}>
//       <div className={css.loginContainer}>
//         <div className={css.loginLabel}>
//           <h2 className={css.loginTitle}>Log In</h2>
//           <p className={css.loginDesc}>
//             Welcome back! Please enter your credentials to access your account
//             and continue your babysitter search.
//           </p>
//         </div>
//         <Formik
//           initialValues={{ email: "", password: "" }}
//           onSubmit={(values, { resetForm }) => {
//             console.log(values); // form verileri
//             resetForm();
//             onClose();
//           }}
//           validationSchema={formSchema}
//         >
//           <Form>
//             <div className={css.formInput}>
//               <Field name="email" type="text" placeholder="Email" />
//               <ErrorMessage name="email" component="span" />
//             </div>
//             <div className={css.formInput}>
//               <Field name="password" type="text" placeholder="Password" />
//               <ErrorMessage name="password" component="span" />
//             </div>
//             <div>
//               <button type="submit" className={css.btn}>
//                 Log In
//               </button>
//             </div>
//           </Form>
//         </Formik>
//       </div>
//     </Modal>
//   );
// };

// export default Login;

import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import css from "./Login.module.css";
import Modal from "../Modal/Modal.jsx";
import { loginUser } from "../../services/authService.js"; // 👈 BURASI ÖNEMLİ

const Login = ({ onClose }) => {
  const formSchema = Yup.object().shape({
    email: Yup.string().required("required"),
    password: Yup.string()
      .min(6, "too short")
      .max(16, "too long")
      .required("required"),
  });

  return (
    <Modal onClose={onClose}>
      <div className={css.loginContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={formSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              await loginUser(values.email, values.password); // 🔥 Firebase login
              resetForm();
              onClose(); // modal kapanır
            } catch (error) {
              console.error(error.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form>
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="span" />

            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="span" />

            <button type="submit">Log In</button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
};

export default Login;
