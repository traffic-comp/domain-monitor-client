import LogoIcon from "../icons/LogoIcon/LogIcon";
import s from "./activedomains.module.css";
import type { ActiveDomainsProps } from "./ActiveDomains.props";
import cn from "classnames";
import type {
  DetailDomainInfo,
  IActiveDomains,
  Stability,
} from "../../interfaces/domain";
import React, { useEffect, useState } from "react";
import { checkDomain } from "../../fetch/check";
import DomainInfo from "./DomainInfo/DomainInfo";
import { deleteActivateDomain } from "../../fetch/domains";
import { getProxy } from "../../fetch/proxy";
import { useDomainStore } from "../../sotre/domain";

const ActiveDomains = ({
  activeDomains,
  isDeactivateDomain,
  ...props
}: ActiveDomainsProps) => {
  const [proxyList, setProxyList] = useState<string[]>([]);
  const [detailedInfo, setDetailedInfo] = useState<DetailDomainInfo[]>([]);
  const { removeActiveDomain } = useDomainStore();

  useEffect(() => {
    fetchProxyList();
  }, []);

  const fetchProxyList = async () => {
    const proxies = await getProxy();

    const filtered: string[] = await proxies.map((proxy) => proxy.proxyType);
    setProxyList(filtered);
  };

  const fetchcheckDomain = async (domain: string) => {
    const detailedInfo: DetailDomainInfo[] = await checkDomain(domain);

    setDetailedInfo(detailedInfo);
  };

  const setStatus = (stats: number) => {
    if (stats >= 75) return "success";
    if (stats < 75 && stats >= 40) return "warning";
    if (stats < 40) return "error";
  };

  const deactivate = (
    e: React.MouseEvent<HTMLTableRowElement>,
    domain: string
  ) => {
    e.stopPropagation();
    deleteActivateDomain(domain);
    removeActiveDomain(domain);
  };

  return (
    <>
      <table {...props} className={s.table}>
        <thead
          className={s.thead}
          // style={{
          //   gridTemplateColumns: `repeat(${proxyList.length + 2}, 1fr)`,
          // }}
        >
          <tr>
            <th></th>
            {proxyList.length
              ? proxyList.map((item: string, idx: number) => (
                  <th key={idx}>{item ? item : null}</th>
                ))
              : null}
            <th></th>
          </tr>
        </thead>
        <tbody
          className={s.tbody}
          // style={{
          //   gridTemplateColumns: `repeat(${proxyList.length + 1}, 1fr)`,
          // }}
        >
          {activeDomains.length
            ? activeDomains.map((i: IActiveDomains, idx: number) => (
                <tr
                  key={idx}
                  className={cn({ [s.deactivateDomain]: isDeactivateDomain })}
                  onClick={
                    isDeactivateDomain
                      ? (e: React.MouseEvent<HTMLTableRowElement>) =>
                          deactivate(e, i.domain)
                      : undefined
                  }
                >
                  {i.stability.length ? (
                    <td key={i._id}>{i.domain}</td>
                  ) : (
                    <td key={i._id}>{i.domain}</td>
                  )}

                  {i.stability.length
                    ? i.stability.map((st: Stability) => (
                        <td className={cn(setStatus(st.stats))} key={st._id}>
                          {st.stats.toFixed()}%
                        </td>
                      ))
                    : proxyList.map((_, idx) => <td key={idx}>n/d</td>)}

                  {i.stability.length ? (
                    <td
                      onClick={(e) => {
                        e.stopPropagation();
                        fetchcheckDomain(i.domain);
                      }}
                      className={cn(s.showedlog, "pointer")}
                    >
                      <LogoIcon />
                    </td>
                  ) : (
                    <td
                      onClick={(e) => {
                        e.stopPropagation();
                        fetchcheckDomain(i.domain);
                      }}
                      className={cn(s.showedlog, "pointer")}
                    >
                      <LogoIcon />
                    </td>
                  )}
                </tr>
              ))
            : null}
        </tbody>
      </table>

      <DomainInfo detailedInfo={detailedInfo} />
    </>
  );
};

export default ActiveDomains;
