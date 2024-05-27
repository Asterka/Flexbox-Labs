import Tooltip from "../UI/Tooltip";
import styles from "./ToolbarBtn.module.css";
import toast from "react-hot-toast";

function ToolbarBtn({
   children,
   onClick,
   disabled = false,
   alert = false,
   value = "",
   screen = "all",
}) {
   const handleClick = () => {
      if (disabled && alert)
         return toast.error(`Select an item to ${value.toLowerCase()}`);
      onClick();
   };

   return (
      <button
         className={`${styles.toolbar__btn} ${
            disabled ? styles.disabled : ""
         } ${screen !== "all" ? styles[screen] : ""}`}
         onClick={handleClick}
      >
         {children}
         {value && <Tooltip>{value}</Tooltip>}
      </button>
   );
}

export default ToolbarBtn;
