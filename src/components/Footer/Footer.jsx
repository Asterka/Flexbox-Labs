import styles from "./Footer.module.css";
import { FiGithub } from "react-icons/fi";
import { TiInfoLarge } from "react-icons/ti";
import Modal from "../UI/Modal";
import About from "./About";
import Tooltip from "../UI/Tooltip";

function Footer() {
   return (
      <div className={styles.footer}>
         <a href="" className={styles.footer__item}>
            {/* <FaGithub className={styles.icon} /> */}
            <FiGithub className={styles.icon} />
            <Tooltip position="bottom">Github</Tooltip>
         </a>
         <Modal>
            <Modal.OpenBtn>
               <div className={styles.footer__item}>
                  <TiInfoLarge className={styles.icon} />
                  <Tooltip position="bottom">About</Tooltip>
               </div>
            </Modal.OpenBtn>
            <Modal.Content size="large">
               <About />
            </Modal.Content>
         </Modal>
      </div>
   );
}

export default Footer;
