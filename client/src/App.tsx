import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  getHotdogsThunk,
  selectAllHotdogs,
  selectHotdogById,
} from "./features/hotdogs/hotdogsSlice";
import Hotdog from "./components/Hotdog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddDialog from "./components/AddDialog";
import EditDialog from "./components/EditDialog";
import InfoDialog from "./components/InfoDialog";
import { IHotdog } from "./app/types";
import styles from "./styles/App.module.css";
import "@reach/dialog/styles.css";

function App(): React.ReactElement {
  const dispatch = useAppDispatch();
  const hotdogs = useAppSelector(selectAllHotdogs);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
  const [activeProductId, setActiveProductId] = useState<string>("");
  const activeHotdog: IHotdog | undefined = useAppSelector(
    selectHotdogById(activeProductId)
  );

  useEffect(() => {
    dispatch(getHotdogsThunk());
  }, []);

  return (
    <div className={styles.app}>
      <AddDialog isOpen={showAddDialog} setShowDialog={setShowAddDialog} />
      {activeHotdog && (
        <EditDialog
          activeHotdog={activeHotdog}
          isOpen={showEditDialog}
          setShowDialog={setShowEditDialog}
          setActiveId={setActiveProductId}
        />
      )}
      {activeHotdog && (
        <InfoDialog
          description={activeHotdog.description}
          isOpen={showInfoDialog}
          setShowDialog={setShowInfoDialog}
          setActiveId={setActiveProductId}
        />
      )}
      <Header
        setShowAddDialog={setShowAddDialog}
        setShowEditDialog={setShowEditDialog}
      />
      <div className={styles.hotdogListContainer}>
        {hotdogs.length ? (
          hotdogs.map((hotdog) => (
            <Hotdog
              key={hotdog.id}
              id={hotdog.id}
              price={hotdog.price}
              title={hotdog.title}
              image={hotdog.image}
              description={hotdog.description}
              setShowEditDialog={setShowEditDialog}
              setShowInfoDialog={setShowInfoDialog}
              setActiveId={setActiveProductId}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
