import { useDrag } from "react-dnd";

import { ItemTypes } from "../../constants";

import style from "./style.module.scss";

const DraggableCard = (props) => {
  const { table } = props;

  const [{ offSet, opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: (x, y, z) => {
        const clientOffset = x.getInitialClientOffset();
        const sourceClientOffset = x.getInitialSourceClientOffset();
        return {
          table,
          clickOffset: {
            x: clientOffset.x - sourceClientOffset.x,
            y: clientOffset.y - sourceClientOffset.y,
          },
        };
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        offSet: monitor.getClientOffset(),
      }),
    }),
    []
  );

  return (
    <div ref={dragRef} className={style.draggableCard}>
      <div className={style.tableNameWrapper}>
        <div className={style.blackBox}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>{table.name}</p>
      </div>
    </div>
  );
};

export default DraggableCard;
