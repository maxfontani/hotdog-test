import React from "react";
import styles from "../styles/App.module.css";

const defaultImg =
  "https://s3.amazonaws.com/cdn.tastesofchicago.com/images/uploads/category_956_8833.jpg";

export function Hotdog(props: {
  title: string;
  price: string;
  description: string;
  image?: string;
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInfoDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveId: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}): React.ReactElement {
  const {
    title,
    description,
    setShowEditDialog,
    setShowInfoDialog,
    setActiveId,
    id,
    price,
  } = props;
  const image = props.image || defaultImg;
  return (
    <div className={styles.hotdogOuter}>
      <div className={styles.hotdogImage}>
        <img alt="" src={image} width="250px" height="200px"></img>
      </div>
      <div className={styles.hotdogPrice}>{price}$</div>
      <div className={styles.hotdogTitle}>{title}</div>
      <div className={styles.hotdogDescription}>
        {description.length > 200 ? (
          <div>
            {description.slice(0, 200)}...
            <button
              aria-label="read full description"
              className={styles.hotdogReadMore}
              onClick={() => {
                setActiveId(id);
                setShowInfoDialog(true);
              }}
            >
              &nbsp;read more
            </button>
          </div>
        ) : (
          description
        )}
      </div>
      <button
        value={id}
        className={styles.hotdogButton}
        onClick={() => {
          setActiveId(id);
          setShowEditDialog(true);
        }}
      >
        Edit
      </button>
    </div>
  );
}

export default Hotdog;
