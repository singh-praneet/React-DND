import { useDrag } from "react-dnd";

import { ItemTypes } from "../../constants";

const DraggableColumn = (props) => {
  const { table, col, colIndex } = props;

  const [{}, columnDragRef] = useDrag(
    () => ({
      type: ItemTypes.COLUMN,
      item: () => {
        return {
          table,
          col,
          colIndex,
        };
      },
    }),
    []
  );

  return (
    <p key={col.id} ref={columnDragRef}>
      <b>{col.name}</b>
    </p>
  );
};

export default DraggableColumn;
