import React from "react";
import css from "./AppointmentForm.module.css";
// import Modal from "../Modal/Modal";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const AppointmentForm = ({ onClose, nanny }) => {
  const formSchema = Yup.object().shape({
    address: Yup.string().required("required"),
    phoneNumber: Yup.string().required("required"),
    childAge: Yup.number().required("required"),
    time: Yup.string().required("required"),
    email: Yup.string().email("Invalid email").required("required"),
    parentName: Yup.string().required("required"),
    comment: Yup.string(),
  });

  const { name, avatar_url } = nanny;
  return (
    <div className={css.appointmentContainer}>
      <div className={css.appointmentInfo}>
        <h2>Make an appointment with a babysitter</h2>
        <p>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>
      </div>
      <div className={css.nannyInfo}>
        <div className={css.nannyImage}>
          <img src={avatar_url} alt={name} width={44} />
        </div>
        <div className={css.nannyName}>
          <p className={css.nanny}>Your nanny</p>
          <p className={css.name}>{name}</p>
        </div>
      </div>
      <div className={css.formArea}>
        <Formik
          initialValues={{
            address: "",
            phoneNumber: "",
            childAge: "",
            time: "",
            email: "",
            parentName: "",
            comment: "",
          }}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            console.log(values); // burada API çağrısı olur
            onClose(); // 🔥 modalı kapat
            actions.resetForm(); // isteğe bağlı
          }}
        >
          <Form className={css.form}>
            <div className={css.formGroup}>
              <div className={css.formItem}>
                <Field
                  className={css.formGroupItemInput}
                  name="address"
                  type="text"
                  placeholder="Address"
                />
                <ErrorMessage name="address" component="span" />
              </div>
              <div className={css.formItem}>
                <Field
                  className={css.formGroupItemInput}
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                />
                <ErrorMessage name="phoneNumber" component="span" />
              </div>
            </div>
            <div className={css.formGroup}>
              <div className={css.formItem}>
                <Field
                  className={css.formGroupItemInput}
                  name="childAge"
                  type="text"
                  placeholder="Child's Age"
                />
                <ErrorMessage name="childAge" component="span" />
              </div>
              <div className={css.formItem}>
                <Field
                  className={css.formGroupItemInput}
                  name="time"
                  type="time"
                  placeholder="Appointment Time"
                />
                <ErrorMessage name="time" component="span" />
              </div>
            </div>
            <div className={css.formItem}>
              <Field
                className={`${css.formGroupItemInput} ${css.fullWidth}`}
                name="email"
                type="text"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="span" />
            </div>
            <div className={css.formItem}>
              <Field
                className={`${css.formGroupItemInput} ${css.fullWidth}`}
                name="parentName"
                type="text"
                placeholder="Parent's Name"
              />
              <ErrorMessage name="parentName" component="span" />
            </div>
            <div className={css.formItem}>
              <Field
                className={`${css.formGroupItemInput} ${css.fullWidth} ${css.fullHeight}`}
                name="comment"
                type="text"
                placeholder="Comment"
              />
              <ErrorMessage name="comment" component="span" />
            </div>
            <div>
              <button type="submit" className={css.btn}>
                Send
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AppointmentForm;
