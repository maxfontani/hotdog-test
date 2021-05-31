import styles from "../styles/App.module.css";
import logo from "../assets/logo.png";

export function Header(props: {
  setShowAddDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
  const { setShowAddDialog, setShowEditDialog } = props;
  return (
    <div className={styles.headerOuter}>
      <div className={styles.headerInner}>
        <div className={styles.headerLogo}>
          <img alt="" src={logo}></img>
        </div>
        <button
          className={styles.headerButton}
          onClick={() => {
            setShowEditDialog(false);
            setShowAddDialog(true);
          }}
        >
          Add a hot-dog
        </button>
      </div>
    </div>
  );
}

export default Header;
