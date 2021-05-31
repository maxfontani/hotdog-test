import React from "react";
import { Dialog } from "@reach/dialog";

import styles from "../styles/Dialog.module.css";

export function AddDialog(props: {
  description: string;
  isOpen: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveId: React.Dispatch<React.SetStateAction<string>>;
}): React.ReactElement {
  const { description, isOpen, setShowDialog, setActiveId } = props;

  const closeDialog = () => {
    setActiveId("");
    setShowDialog(false);
  };

  return (
    <Dialog
      aria-label="Full hotdog description"
      isOpen={isOpen}
      onDismiss={closeDialog}
      className={styles.infoDialogOuter}
    >
      <div className={styles.infoDialogInner}>
        <div className={styles.hotdogDescription}></div>
        {description}
      </div>
    </Dialog>
  );
}

export default AddDialog;
