import s from "./loader.module.css";
import type { LoaderProps } from "./Loader.props";
const Loader = ({
  width = "50px",
  height = "50px",
  isText = true,
  ...props
}: LoaderProps) => {
  return (
    <div className={s.loaderContainer} {...props}>
      <div className={s.loader} style={{ width, height }} />
      {isText ? <div className={s.loaderText}>Loading...</div> : null}
    </div>
  );
};

export default Loader;
