import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import DraggableColumn from "../draggableColumn";
import { ItemTypes } from "../../constants";

import style from "./style.module.scss";

const DraggableTable = (props) => {
  const { table, draggedTables, connectingLines } = props;

  const ref = useRef(null);

  const [{}, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: (x) => {
        const clientOffset = x.getInitialClientOffset();
        const sourceClientOffset = x.getInitialSourceClientOffset();
        return {
          table,
          type: "move",
          clickOffset: {
            x: clientOffset.x - sourceClientOffset.x,
            y: clientOffset.y - sourceClientOffset.y,
          },
        };
      },
    }),
    []
  );

  const [{}, drop] = useDrop(() => ({
    accept: ItemTypes.COLUMN,
    drop: (x) => {
      const {
        table: sourceColumnTable,
        // col: collll,
        colIndex: columnIndex,
      } = x;

      const mostUpdatedDataForTable = draggedTables.availableTables.find(
        (t) => t.id === table.id
      );
      const mostUpdatedDataForSourceColumnTable =
        draggedTables.availableTables.find(
          (t) => t.id === sourceColumnTable.id
        );
      //   const columnIndex = mostUpdatedDataForSourceColumnTable.columns.findIndex(
      //     (c) => c.column_id === col.column_id
      //   );
      const col = mostUpdatedDataForSourceColumnTable.columns.find(
        (c, i) => i === columnIndex
      );
      const areSourceAndTargetTablesDifferent =
        sourceColumnTable.id !== table.id;
      const canMoveColumn =
        areSourceAndTargetTablesDifferent &&
        mostUpdatedDataForSourceColumnTable.columns.length > 1;
      //   debugger;
      if (canMoveColumn) {
        //   add a column in the destination table
        draggedTables.updateTable({
          ...mostUpdatedDataForTable,
          columns: [...mostUpdatedDataForTable.columns, col],
          rows: mostUpdatedDataForTable.rows.map((row, rowIndex) => {
            // if (!sourceColumnTable.rows[rowIndex][columnIndex]) {
            //   console.log(
            //     "most updated data for source coulumn table: ",
            //     mostUpdatedDataForSourceColumnTable
            //   );
            //   debugger;
            // }
            // return [...row, sourceColumnTable.rows[rowIndex][columnIndex]];
            return [
              ...row,
              mostUpdatedDataForSourceColumnTable.rows[rowIndex][columnIndex],
            ];
          }),
        });

        // remove the column from source table
        draggedTables.updateTable({
          ...mostUpdatedDataForSourceColumnTable,
          columns: mostUpdatedDataForSourceColumnTable.columns.filter(
            (c) => c.column_id !== col.column_id
          ),
          rows: mostUpdatedDataForSourceColumnTable.rows.map((row) => {
            return row.filter((e, i) => i !== columnIndex);
          }),
        });

        // add the connecting line
        // connectingLines.addLine({
        //   top: "20px",
        //   left: "20px",
        //   width: "300px",
        //   height: "300px",
        // });
      }
    },
  }));

  dragRef(drop(ref));

  return (
    <div ref={ref} className={style.container}>
      <div className={style.header}>
        <p>{table.name}</p>
        <button
          onClick={() => {
            draggedTables.removeTable(table);
          }}
        >
          <span className={style.cross}>x</span>
        </button>
      </div>
      <div className={style.row + " " + style.topRow}>
        <input type="checkbox" defaultChecked />
        {table.columns.map((col, colIndex) => {
          return (
            <DraggableColumn
              key={col.column_id}
              table={table}
              col={col}
              colIndex={colIndex}
            />
          );
        })}
      </div>
      <div className={style.rowsWrapper}>
        {table.rows.map((row) => {
          return (
            <div
              key={row.map((e) => e.id).join("-")}
              className={style.row + " " + style.partition}
            >
              <input type="checkbox" defaultChecked />
              {row.map((e) => (
                <p key={e.id}>{e.name}</p>
              ))}
            </div>
          );
        })}
      </div>
      <div className={style.footer}>
        <p>Scroll to see more columns</p>
      </div>
    </div>
  );
};

export default DraggableTable;
