import s from "./loader.module.css";
import type { LoaderProps } from "./Loader.props";
const Loader = ({ ...props }: LoaderProps) => {
  return (
    <div className={s.loaderContainer} {...props}>
      <div className={s.loader} />
      <div className={s.loaderText}>Loading...</div>
    </div>
  );
};

export default Loader;
