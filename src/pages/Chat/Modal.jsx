import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/messages/messageActions";

function Modal({ modalPic }) {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  function closeModals() {
    dispatch(closeModal());
  }

  return (
    <div>
      <div className="modals">
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
