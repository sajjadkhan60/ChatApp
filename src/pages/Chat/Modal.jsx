import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/messages/messageActions";

function Modal({ modalPic }) {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  function closeModals(e) {
    if (
      e.target.classList.contains("modals") ||
      e.target.classList.contains("close-modals") ||
      e.target.classList.contains("clear-icon")
    ) {
      dispatch(closeModal());
    }
  }

  return (
    <div>
      <div className="modals" onClick={closeModals}>
        <div className="container">
          <div className="content">
            <div className="close-modals" onClick={closeModals}>
              <span className="clear-icon">&#x2715;</span>
            </div>
            <img src={modalPic} alt="Modal Picture" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
