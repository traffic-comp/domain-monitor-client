import { useEffect, type JSX } from "react";

import s from "./proxystats.module.css";

import cn from "classnames";
import ActiveDomains from "../../../components/ActiveDomains/ActiveDomains.tsx";
import { getDomains } from "../../../fetch/domains.ts";
import BlockHeader from "../../../components/BlockHeader/BlockHeader.tsx";
import RefreshIcon from "../../../components/icons/RefreshIcon/RefreshIcon.tsx";
import Button from "../../../components/Button/Button.tsx";
import type { ProxyStatsProps } from "./ProxyStats.props.ts";
import InstallsStat from "../InstalsStat/InstallsStat.tsx";
import Graphic from "../Graphic/Graphic.tsx";
import { useDomainStore } from "../../../sotre/domain.ts";
import { useGraphicStore } from "../../../sotre/graphic.ts";
import AddCompaingWindow from "./AddCompaingWindow/AddCompaingWindow.tsx";

const ProxyStats = ({ ...props }: ProxyStatsProps): JSX.Element => {
  const { setActiveDomains, activeDomains } = useDomainStore();
  const { setIds, ids } = useGraphicStore();

  const fetchDomain = async () => {
    const d = await getDomains();
    const active = d[0].activeDomains;
    setActiveDomains(active);
  };

  const getIdFromLs = () => {
    const lsids = localStorage.getItem("ids");

    if (lsids?.length) {
      const ids = JSON.parse(lsids);

      const mapped = ids.map((id: string) => Number(id));

      setIds(mapped);
    }
  };

  useEffect(() => {
    fetchDomain();
    getIdFromLs();
  }, []);

  return (
    <div className={s.proxyStats} {...props}>
      <div className={s.left}>
        <div className={cn(s.container, s.domainsOperators)}>
          <BlockHeader title="Active Domains">
            <Button onClick={fetchDomain}>
              <RefreshIcon />
              Refresh
            </Button>
          </BlockHeader>
          <div className={s.scrollcontainer}>
            <ActiveDomains activeDomains={activeDomains} />
          </div>
        </div>
        <div className={cn(s.graphic, s.container)}>
          <BlockHeader title="Total Registration and Instalis">
            <AddCompaingWindow />
          </BlockHeader>
          <Graphic period="day" width="100%" height="100%" ids={ids} />
        </div>
      </div>

      <div className={s.right}>
        <div className={cn(s.installs, s.container)}>
          <BlockHeader title="Installs and Registrations" />
          <InstallsStat ids={ids} />
        </div>

        <div className={cn(s.activeIsntalls, s.container)}>
          <BlockHeader title="Statistics for today">
            <AddCompaingWindow />
          </BlockHeader>

          <Graphic period="hour" width="100%" height="100%" ids={ids} />
        </div>
      </div>
    </div>
  );
};

export default ProxyStats;
