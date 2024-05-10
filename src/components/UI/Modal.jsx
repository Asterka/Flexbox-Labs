import styles from "./Modal.module.css";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

const ModalContext = createContext();

function Modal({ children }) {
   const [showModal, setShowModal] = useState(false);

   const openModal = () => setShowModal(true);

   const closeModal = () => setShowModal(false);

   return (
      <ModalContext.Provider value={{ showModal, openModal, closeModal }}>
         {children}
      </ModalContext.Provider>
   );
}

function OpenBtn({ children }) {
   const { openModal } = useContext(ModalContext);

   return <button className={styles.open__btn} onClick={openModal}>{children}</button>;
}

function Content({ children, size="medium" }) {
   const { showModal, closeModal } = useContext(ModalContext);

   if (!showModal) return null;

   return createPortal(
      <>
         <div className={`${styles.modal} ${styles[size]}`}>
            <button className={styles.close__btn} onClick={closeModal}>
               <IoCloseOutline />
            </button>
            <div>{children}</div>
         </div>
         <div className={styles.overlay} onClick={closeModal}></div>
      </>,
      document.body
   );
}

Modal.Content = Content;
Modal.OpenBtn = OpenBtn;

export default Modal;
