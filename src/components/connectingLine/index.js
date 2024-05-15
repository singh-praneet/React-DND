import style from "./style.module.scss";

const ConnectingLine = () => {
  return (
    <div className={style.container}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={style.svg}
      >
        <path
          d="M 0 0 C 50 2, 50 98, 100 100 "
          stroke="#f5a74a"
          strokeWidth="1"
          fill="transparent"
        />
      </svg>
    </div>
  );
};

export default ConnectingLine;
