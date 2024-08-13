import styles from "./Toolbar.module.css";
import {
   IoAddCircleOutline,
   IoCloseOutline,
   IoDuplicateOutline,
} from "react-icons/io5";
import { BiSelectMultiple } from "react-icons/bi";
import { LuRedo, LuTrash2, LuUndo } from "react-icons/lu";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { RxReset } from "react-icons/rx";
import usePlayground from "../../hooks/usePlayground";
import DisplayCode from "../UI/DisplayCode/DisplayCode";
import Modal from "../UI/Modal/Modal";
import { CiMenuKebab } from "react-icons/ci";
import ToolbarMenu from "./ToolbarMenu";
import { useState } from "react";
import ToolbarBtn from "./ToolbarBtn";
import Slider from "../UI/Slider/Slider";

function Toolbar() {
   const {
      addItem,
      selectedItems,
      removeItem,
      duplicateItem,
      selectMultiple,
      setSelectMultiple,
      undoAction: undo,
      redoAction: redo,
      canUndo,
      canRedo,
      resetContainer,
   } = usePlayground();

   const [showMenu, setShowMenu] = useState(false);

   const toggleMenu = () => setShowMenu((prev) => !prev);

   const emptySelected = selectedItems.length === 0;

   return (
      <div className={styles.toolbar}>
         <ToolbarBtn value="Add" onClick={addItem}>
            <IoAddCircleOutline />
         </ToolbarBtn>

         <ToolbarBtn
            value="Duplicate"
            onClick={duplicateItem}
            disabled={emptySelected}
            alert={true}
            screen="lso"
         >
            <IoDuplicateOutline />
         </ToolbarBtn>

         <ToolbarBtn
            value="Delete"
            onClick={removeItem}
            disabled={emptySelected}
            alert={true}
         >
            <LuTrash2 />
         </ToolbarBtn>

         <Modal>
            <Modal.OpenBtn>
               <ToolbarBtn value="Code" onClick={toggleMenu} screen="lso">
                  <HiOutlineCodeBracket />
               </ToolbarBtn>
            </Modal.OpenBtn>
            <Modal.Content>
               <DisplayCode />
            </Modal.Content>
         </Modal>

         <ToolbarBtn value="Reset" onClick={resetContainer} screen="lso">
            <RxReset />
         </ToolbarBtn>

         {/* <Modal>
            <Modal.OpenBtn>
               <IoSettingsOutline />
            </Modal.OpenBtn>
            <Modal.Content>Settings code</Modal.Content>
         </Modal> */}

         <ToolbarBtn value="Undo" onClick={undo} disabled={!canUndo}>
            <LuUndo />
         </ToolbarBtn>

         <ToolbarBtn value="Redo" onClick={redo} disabled={!canRedo}>
            <LuRedo />
         </ToolbarBtn>

         <ToolbarBtn
            value="Select Multiple"
            onClick={() => setSelectMultiple(!selectMultiple)}
            screen="lso"
         >
            <BiSelectMultiple />
            <Slider checked={selectMultiple} />
         </ToolbarBtn>

         <ToolbarBtn
            value={!showMenu ? "More" : "Close"}
            onClick={toggleMenu}
            screen="smo"
         >
            {!showMenu ? <CiMenuKebab /> : <IoCloseOutline />}
         </ToolbarBtn>

         {/* For small screens */}
         <ToolbarMenu hide={toggleMenu} show={showMenu}>
            <ToolbarBtn
               value="Clone"
               onClick={duplicateItem}
               disabled={emptySelected}
               alert={true}
            >
               <IoDuplicateOutline />
               Clone
            </ToolbarBtn>

            <Modal>
               <Modal.OpenBtn>
                  <ToolbarBtn>
                     <HiOutlineCodeBracket />
                     Code
                  </ToolbarBtn>
               </Modal.OpenBtn>
               <Modal.Content>
                  <DisplayCode />
               </Modal.Content>
            </Modal>

            <ToolbarBtn onClick={resetContainer}>
               <RxReset />
               Reset
            </ToolbarBtn>

            <ToolbarBtn
               value="Select Multiple"
               onClick={() => setSelectMultiple(!selectMultiple)}
            >
               <BiSelectMultiple />
               <Slider checked={selectMultiple} />
            </ToolbarBtn>
         </ToolbarMenu>
      </div>
   );
}

export default Toolbar;
