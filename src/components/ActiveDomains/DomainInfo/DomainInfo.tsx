import { useEffect, useState } from "react";
import CloseIcon from "../../icons/CloseIcon/CloseIcon";
import type { DomainInfoProps } from "./DomainInfo.props";
import s from "./domain.module.css";

const DomainInfo = ({ detailedInfo = [], ...props }: DomainInfoProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (detailedInfo && detailedInfo.length > 0) {
      setIsOpen(true);
    }
  }, [detailedInfo]);

  // Берем первый объект, если есть
  const dt = detailedInfo.length > 0 ? detailedInfo[0] : null;

  if (!isOpen || !dt) return null;

  return (
    <div className={s.overlay} {...props} onClick={() => setIsOpen(false)}>
      <div className={s.domaininfo} onClick={(e) => e.stopPropagation()}>
        <div className={s.header}>
          <p className={s.title}>Log info - {dt?.domain ?? "N/A"}</p>
          <CloseIcon click={() => setIsOpen(false)} className="pointer" />
        </div>
        <ul className={s.body}>
          <li>
            <span>fullURL</span>
            <span>{dt?.fullUrl ?? "—"}</span>
          </li>
          <li>
            <span>Domain</span>
            <span>{dt?.domain ?? "—"}</span>
          </li>
          <li>
            <span>ip</span>
            <span>{dt?.ip ?? "—"}</span>
          </li>
          <li className={s.devider}>
            <span>SSL</span>
            <span>{dt?.sslInfo?.issuer ?? "—"}</span>
          </li>
          <li>
            <span>Nameserver</span>
            {dt?.ns && dt.ns.length > 0 ? (
              <span className="success">{dt.ns.length}</span>
            ) : (
              <span className="error">0</span>
            )}
          </li>
          <li>
            <span>port80</span>
            {dt?.port80Open ? (
              <span className="success">true</span>
            ) : (
              <span className="err">false</span>
            )}
          </li>
          <li>
            <span>port443</span>
            {dt?.port443Open ? (
              <span className="success">true</span>
            ) : (
              <span className="err">false</span>
            )}
          </li>
          <li>
            <span>httpAlive</span>
            {dt?.httpAlive ? (
              <span className="success">true</span>
            ) : (
              <span className="err">false</span>
            )}
          </li>
          <li>
            <span>httpStatus</span>
            <span>{dt?.httpStatus ?? "—"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DomainInfo;
