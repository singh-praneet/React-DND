import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import LeftSidebar from "../../components/leftSidebar";
import Dropzone from "../../components/dropzone";

import style from "./style.module.scss";

const PageContainer = () => {
  return (
    <div className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <LeftSidebar />
        <Dropzone />
      </DndProvider>
    </div>
  );
};

export default PageContainer;
