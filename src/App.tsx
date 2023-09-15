import React, { useState } from "react";
import { LaunchList } from "./components/organisms/launch-list";
import { Loader } from "./components/atoms/loader";
import { SelectedLaunchesContextProvider } from "./context/SelectedLaunchesContext";
import { CalculationSection } from "./components/organisms/calculation-section";
import { Modal } from "./components/atoms/modal";
import { ISelectedLaunch } from "./types/launch-list.types";
import { LaunchItemFragment } from "./graphql/launch-list/LaunchFragment.generated";
import { LaunchInfo } from "./components/organisms/launch-info";
import styles from "./index.module.scss";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLaunchModalVisible, setIsLaunchModalVisible] =
    useState<boolean>(false);
  const [clickedLaunch, setClickedLaunch] = useState<LaunchItemFragment>({});
  const [selectedLaunches, setSelectedLaunches] = useState<ISelectedLaunch[]>(
    []
  );

  function openModal(selectedLaunches: ISelectedLaunch[]) {
    setSelectedLaunches(selectedLaunches);
    setIsVisible(true);
  }

  function openLaunchModal(launch: LaunchItemFragment) {
    setClickedLaunch(launch);
    setIsLaunchModalVisible(true);
  }

  return (
    <SelectedLaunchesContextProvider
      launches={selectedLaunches}
      clickedLaunch={clickedLaunch}
    >
      <div className={styles.app}>
        <h1 className={styles.title}>All launches made by SpaceX</h1>
        {loading && <Loader />}
        <LaunchList
          setLoading={setLoading}
          setSelectedLaunches={openModal}
          setClickedLaunch={openLaunchModal}
        />
        <Modal visible={isVisible} setVisible={setIsVisible}>
          <CalculationSection visible={isVisible} />
        </Modal>
        <Modal
          visible={isLaunchModalVisible}
          setVisible={setIsLaunchModalVisible}
        >
          <LaunchInfo />
        </Modal>
      </div>
    </SelectedLaunchesContextProvider>
  );
}

export default App;
