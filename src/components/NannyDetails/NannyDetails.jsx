import { useState } from "react";
import Modal from "../Modal/Modal.jsx";
import AppointmentForm from "../Appointment/AppointmentForm.jsx";
import css from "./NannyDetails.module.css";
import { CiStar } from "react-icons/ci";

const NannyDetails = ({ nanny }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={css.details}>
      {nanny.reviews?.length > 0 && (
        <div className={css.reviewsContainer}>
          {nanny.reviews.map((r, i) => (
            <div key={i} className={css.reviews}>
              <div className={css.reviewerInfo}>
                <div className={css.reviewerLogo}>
                  <p>{r.reviewer.charAt(0).toUpperCase()}</p>
                </div>
                <div className={css.reviewerName}>
                  <p>{r.reviewer}</p>
                  <p>
                    <CiStar />
                    {r.rating}
                  </p>
                </div>
              </div>

              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      )}

      <button
        className={css.appointmentBtn}
        onClick={() => setIsModalOpen(true)}
      >
        Make an appointment
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AppointmentForm nanny={nanny} />
        </Modal>
      )}
    </div>
  );
};

export default NannyDetails;
