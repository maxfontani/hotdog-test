import React, { useState } from "react";
import { Dialog } from "@reach/dialog";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addHotdogThunk,
  selectAllHotdogs,
} from "../features/hotdogs/hotdogsSlice";
import { checkTitleIsUnique } from "../features/utils";

import styles from "../styles/Dialog.module.css";

export function AddDialog(props: {
  isOpen: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
  const dispatch = useAppDispatch();
  const hotdogs = useAppSelector(selectAllHotdogs);
  const { isOpen, setShowDialog } = props;
  const [price, setPrice] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const closeDialog = () => {
    setShowDialog(false);
  };

  function onTitleChange(value: string): void {
    setTitle(value);
  }

  function onPriceChange(value: string): void {
    setPrice(value);
  }
  function onDescriptionChange(value: string): void {
    setDescription(value);
  }

  function onImageChange(value: string): void {
    setImage(value);
  }
  function onSave(): void {
    if (!title || !image || !description || !price) {
      alert("All fields are required!");
    } else {
      if (!checkTitleIsUnique(hotdogs, title)) {
        alert("Title already exists!");
      } else {
        const newHotdog = {
          title: title,
          image: image,
          description: description,
          price: price,
        };
        dispatch(addHotdogThunk(newHotdog));
      }
    }
  }
  function onCancel(): void {
    setShowDialog(false);
  }
  return (
    <Dialog
      aria-label="Edit the HotDog"
      isOpen={isOpen}
      onDismiss={closeDialog}
      className={styles.dialogOuter}
    >
      <div className={styles.dialogInner}>
        <fieldset id="hotdog-edit" className={styles.dialogInputOuter}>
          <div className={styles.dialogHeaderOuter}>
            <div className={styles.dialogHeaderInner}>
              <div className={styles.dialogTitle}>Add a HotDog</div>
              <button className={styles.closeButton} onClick={closeDialog}>
                <span aria-hidden>×</span>
              </button>
            </div>
          </div>
          <div className={styles.dialogInput}>
            <label className={styles.dialogLabel} htmlFor="title">
              Title:
            </label>
            <input
              id="title-input"
              placeholder="enter title"
              type="text"
              name="title"
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>
          <div className={styles.dialogInput}>
            <label className={styles.dialogLabel} htmlFor="price">
              Price:
            </label>
            <input
              id="price-input"
              placeholder="enter title"
              type="text"
              name="price"
              onChange={(e) => onPriceChange(e.target.value)}
            />
          </div>
          <div className={styles.dialogInput}>
            <label className={styles.dialogLabel} htmlFor="image">
              Image:
            </label>
            <input
              id="image-input"
              placeholder="enter image URL"
              type="text"
              name="image"
              onChange={(e) => {
                onImageChange(e.target.value);
              }}
            />
          </div>
          <div className={styles.dialogInput}>
            <label className={styles.dialogLabel} htmlFor="description">
              Description:
            </label>
            <textarea
              id="description-input"
              className={styles.dialogTextarea}
              placeholder="enter description"
              name="description"
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>
          <div className={styles.dialogButtonsOuter}>
            <input
              onClick={() => onSave()}
              className={styles.dialogButton}
              type="submit"
              value="Add"
            />

            <input
              onClick={() => onCancel()}
              className={styles.dialogButton}
              type="submit"
              value="Cancel"
            />
          </div>
        </fieldset>
      </div>
    </Dialog>
  );
}

export default AddDialog;
