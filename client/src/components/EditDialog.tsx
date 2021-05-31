import { useState } from "react";
import { Dialog } from "@reach/dialog";
import { useAppDispatch } from "../app/hooks";
import {
  editHotdogThunk,
  deleteHotdogThunk,
} from "../features/hotdogs/hotdogsSlice";

import styles from "../styles/Dialog.module.css";
import { IHotdog, IDraftHotdog } from "../app/types";

export function EditDialog(props: {
  activeHotdog: IHotdog;
  isOpen: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveId: React.Dispatch<React.SetStateAction<string>>;
}): React.ReactElement {
  const { isOpen, setShowDialog, activeHotdog, setActiveId } = props;

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>(activeHotdog.title);
  const [price, setPrice] = useState<string>(activeHotdog.price);
  const [image, setImage] = useState<string>(activeHotdog.image);
  const [description, setDescription] = useState<string>(
    activeHotdog.description
  );
  const [titleChanged, setTitleChanged] = useState<boolean>(false);
  const [priceChanged, setPriceChanged] = useState<boolean>(false);
  const [imageChanged, setImageChanged] = useState<boolean>(false);
  const [descriptionChanged, setDescriptionChanged] = useState<boolean>(false);

  const closeDialog = () => {
    setActiveId("");
    setShowDialog(false);
  };

  function onTitleChange(value: string): void {
    setTitle(value);
    setTitleChanged(true);
  }

  function onPriceChange(value: string): void {
    setPrice(value);
    setPriceChanged(true);
  }

  function onDescriptionChange(value: string): void {
    setDescription(value);
    setDescriptionChanged(true);
  }

  function onImageChange(value: string): void {
    setImage(value);
    setImageChanged(true);
  }

  function onSave(): void {
    if (!title || !image || !description || !price) {
      alert("All fields are required!");
    } else {
      const savedData = [
        ["title", titleChanged && title],
        ["image", imageChanged && image], // TODO add CHECK
        ["price", priceChanged && price], // TODO add CHECK
        ["description", descriptionChanged && description],
      ];

      const filteredData: IDraftHotdog = Object.fromEntries(
        savedData.filter((val) => val[1] !== false)
      );
      dispatch(
        editHotdogThunk({ id: activeHotdog.id, draftHotdog: filteredData })
      );
      setShowDialog(false);
    }
  }
  function onDelete(): void {
    dispatch(deleteHotdogThunk(activeHotdog.id));

    setShowDialog(false);
  }
  return (
    <Dialog
      aria-label="Edit the Hotdog"
      isOpen={isOpen}
      onDismiss={closeDialog}
      className={styles.dialogOuter}
    >
      <div className={styles.dialogInner}>
        <fieldset id="hotdog-edit" className={styles.dialogInputOuter}>
          <div className={styles.dialogHeaderOuter}>
            <div className={styles.dialogHeaderInner}>
              <div className={styles.dialogTitle}>Edit the HotDog</div>
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
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>
          <div className={styles.dialogInput}>
            <label className={styles.dialogLabel} htmlFor="title">
              Price:
            </label>
            <input
              id="title-input"
              placeholder="enter title"
              type="text"
              name="title"
              value={price}
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
              value={image}
              onChange={(e) => onImageChange(e.target.value)}
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
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>
          <div className={styles.dialogButtonsOuter}>
            <input
              onClick={() => onSave()}
              className={styles.dialogButton}
              type="submit"
              value="Save"
            />

            <input
              onClick={() => onDelete()}
              className={styles.dialogButton}
              type="submit"
              value="Delete"
            />
          </div>
        </fieldset>
      </div>
    </Dialog>
  );
}

export default EditDialog;
