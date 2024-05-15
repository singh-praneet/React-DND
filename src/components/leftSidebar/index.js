import { tables } from "../../constants";
import searchIcon from "../../images/icon-search.svg";
import DraggableCard from "../draggableCard";

import style from "./style.module.scss";

const LeftSidebar = () => {
  return (
    <div className={style.container}>
      <div className={style.inputWrapper}>
        <input className={style.input} placeholder="Filter by Table Name" />
        <div className={style.searchIconWrapper}>
          <img src={searchIcon} alt="search icon" />
        </div>
      </div>

      <div className={style.tableListWrapper}>
        {tables.map((table) => {
          return <DraggableCard key={table.id} table={table} />;
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
