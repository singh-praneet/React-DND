import { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { ResizableBox } from "react-resizable";

import DraggableTable from "../draggableTable";
import ConnectingLine from "../connectingLine";
import { ItemTypes } from "../../constants";

import style from "./style.module.scss";

export class DraggedTables {
  availableTables = [];
  observers = [];

  observe(o) {
    this.observers.push(o);
    this.emitChange();
    return () => {
      this.observers = this.observers.filter((t) => t !== o);
    };
  }
  addTable(table) {
    this.availableTables = [...this.availableTables, table];
    this.emitChange();
  }
  canAddTable(table) {
    return this.availableTables.every(
      (availableTable) => availableTable.id !== table.id
    );
  }
  updateTable(table) {
    this.availableTables = this.availableTables.map((availableTable) => {
      if (availableTable.id === table.id) {
        return table;
      }
      return availableTable;
    });
    console.log("new table after updating table: ", this.availableTables);
    this.emitChange();
  }
  removeTable(table) {
    this.availableTables = this.availableTables.filter(
      (availableTable) => availableTable.id !== table.id
    );
    this.emitChange();
  }
  emitChange() {
    const availableTables = this.availableTables;
    this.observers.forEach((o) => o && o(availableTables));
  }
}

const draggedTables = new DraggedTables();

class ConnectingLines {
  lines = [];
  observers = [];

  observe(o) {
    this.observers.push(o);
    this.emitChange();
    return () => {
      this.observers = this.observers.filter((t) => t !== o);
    };
  }
  addLine(line) {
    this.lines = [...this.lines, line];
    this.emitChange();
  }
  emitChange() {
    const lines = this.lines;
    this.observers.forEach((o) => o && o(lines));
  }
}

const connectingLines = new ConnectingLines();

const Dropzone = () => {
  const [availableTables, setAvailableTables] = useState(
    draggedTables.availableTables
  );
  const [availableLines, setAvailableLines] = useState(connectingLines.lines);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (x, y, z) => {
      const clientOffset = y.getClientOffset();
      const { table, type, clickOffset } = x;
      const dropzoneRect = dropzoneRef.current.getBoundingClientRect();

      const shouldAddTable = draggedTables.canAddTable(table);
      const shouldMoveTable = type === "move";
      if (shouldAddTable) {
        draggedTables.addTable({
          ...table,
          clientOffset: {
            x: clientOffset.x - clickOffset.x - dropzoneRect.left,
            y: clientOffset.y - clickOffset.y - dropzoneRect.top,
          },
        });
      } else if (shouldMoveTable) {
        const mostUpdatedDataForTable = draggedTables.availableTables.find(
          (t) => t.id === table.id
        );
        draggedTables.updateTable({
          ...mostUpdatedDataForTable,
          clientOffset: {
            x: clientOffset.x - clickOffset.x - dropzoneRect.left,
            y: clientOffset.y - clickOffset.y - dropzoneRect.top,
          },
        });
      } else {
        alert(`${table.name} already exists in the grid area!`);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  useEffect(
    () => draggedTables.observe(setAvailableTables),
    [setAvailableTables]
  );

  useEffect(
    () => connectingLines.observe(setAvailableLines),
    [setAvailableLines]
  );

  const dropzoneRef = useRef(null);

  console.log("available lines are: ", availableLines);

  return (
    <div className={style.container}>
      <div ref={drop} className={style.wrapper}>
        <div ref={dropzoneRef}>
          {availableTables.map((table) => {
            return (
              <ResizableBox
                key={table.id}
                className={style.draggableTableWrapper}
                style={{
                  top: `${table.clientOffset.y}px`,
                  left: `${table.clientOffset.x}px`,
                }}
                width={350}
                height={230}
                resizeHandles={["s", "w", "e", "n", "sw", "nw", "se", "ne"]}
                minConstraints={[350, 230]}
              >
                <DraggableTable
                  key={table.id}
                  table={table}
                  draggedTables={draggedTables}
                  connectingLines={connectingLines}
                />
              </ResizableBox>
            );
          })}

          {availableLines.map((line, index) => {
            return (
              <ConnectingLine
                key={`${line.top}-${line.left}-${line.width}-${line.height}-${index}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
