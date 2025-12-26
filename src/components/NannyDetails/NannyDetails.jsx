// import React from 'react'

// const NannyDetails = () => {
//   return (
//     <div>NannyDetails</div>
//   )
// }

// export default NannyDetails

import { useState } from "react";
import Modal from "../Modal/Modal.jsx";
import AppointmentForm from "../Appointment/AppointmentForm.jsx";

const NannyDetails = ({ nanny }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { about, experience, education, kids_age, characters, reviews } = nanny;

  return (
    <div className="nanny-details">
      <p className="nanny-details__about">{about}</p>

      <ul className="nanny-details__info">
        <li>
          <strong>Experience:</strong> {experience}
        </li>
        <li>
          <strong>Education:</strong> {education}
        </li>
        <li>
          <strong>Kids age:</strong> {kids_age}
        </li>
        <li>
          <strong>Character:</strong> {characters.join(", ")}
        </li>
      </ul>

      {reviews && (
        <div className="nanny-details__reviews">
          <h4>Reviews</h4>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p>{review.comment}</p>
                <span>⭐ {review.rating}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        className="nanny-details__appointment-btn"
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
