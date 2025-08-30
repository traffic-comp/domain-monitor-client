import s from "./blockheader.module.css";
import type { BlockHeaderProps } from "./BlockHeader.porps";

const BlockHeader = ({ title, children, ...props }: BlockHeaderProps) => {
  return (
    <div className={s.header} {...props}>
      <div className={s.title}>{title}</div>
      {children}
    </div>
  );
};

export default BlockHeader;
