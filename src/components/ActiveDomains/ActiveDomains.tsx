import LogoIcon from "../icons/LogoIcon/LogIcon";
import s from "./activedomains.module.css";
import type { ActiveDomainsProps } from "./ActiveDomains.props";
import cn from "classnames";
import type { DetailDomainInfo, IActiveDomains } from "../../interfaces/domain";
import React, { useEffect, useState } from "react";
import { checkDomain } from "../../fetch/check";
import DomainInfo from "./DomainInfo/DomainInfo";
import { deleteActivateDomain } from "../../fetch/domains";
import { getProxy } from "../../fetch/proxy";
import { useDomainStore } from "../../sotre/domain";

const ActiveDomains = ({
  activeDomains,
  isDeactivateDomain,
  isActive,
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
    if (isActive) {
      e.stopPropagation();
      deleteActivateDomain(domain);
      removeActiveDomain(domain);
    }
  };

  return (
    <>
      <table {...props} className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th>Домен</th>
            {proxyList.map((proxy, idx) => (
              <th key={idx}>{proxy}</th>
            ))}
            <th></th>
          </tr>
        </thead>

        <tbody className={s.tbody}>
          {activeDomains.length
            ? activeDomains.map((i: IActiveDomains, idx: number) => (
                <tr
                  key={idx}
                  className={cn({
                    [s.deactivateDomain]: isDeactivateDomain,
                    [s.lock]: !isActive,
                  })}
                  onClick={
                    isDeactivateDomain
                      ? (e: React.MouseEvent<HTMLTableRowElement>) =>
                          deactivate(e, i.domain)
                      : undefined
                  }
                >
                  {/* Домен */}
                  <td>{i.domain}</td>

                  {/* Колонки под прокси */}
                  {proxyList.map((proxy, idx) => {
                    const stability = i.stability.find(
                      (st) => st.proxyName === proxy
                    );

                    return stability ? (
                      <td className={cn(setStatus(stability.stats))} key={idx}>
                        {stability.stats.toFixed()}%
                      </td>
                    ) : (
                      <td key={idx}>n/d</td>
                    );
                  })}

                  {/* Икона лога всегда последняя */}
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchcheckDomain(i.domain);
                    }}
                    className={cn(s.showedlog, "pointer")}
                  >
                    <LogoIcon />
                  </td>
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
