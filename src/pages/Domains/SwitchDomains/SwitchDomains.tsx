import { useEffect, useState, type JSX } from "react";
import Button from "../../../components/Button/Button";
import RefreshIcon from "../../../components/icons/RefreshIcon/RefreshIcon";
import s from "./switchdomains.module.css";
import type { SwitchDomainsProps } from "./SwitchDomains.props";
import ActiveDomains from "../../../components/ActiveDomains/ActiveDomains";
import BlockHeader from "../../../components/BlockHeader/BlockHeader";
import { getKTDomains, setActiveDomain } from "../../../fetch/domains";
import cn from "classnames";
import { useDomainStore } from "../../../sotre/domain";
import LockIcon from "../../../components/icons/LockIcon/LockIcon";

const SwitchDomains = ({
  fetchDomains,
  ...props
}: SwitchDomainsProps): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { setKtDomains, ktDomains, addActiveDomain, activeDomains } =
    useDomainStore();

  const fetchKTDomains = async () => {
    const domains = await getKTDomains();
    setKtDomains(domains);
  };

  useEffect(() => {
    fetchKTDomains();
  }, []);
  
  const addActive = async (name: string) => {
    if (isActive) {
      setActiveDomain(name);
      addActiveDomain({
        domain: name,
        _id: "1",
        stability: [],
      });
    }
  };

  return (
    <div className={s.container} {...props}>
      <section className={cn(s.section, s.left)}>
        <BlockHeader title="All Domains"></BlockHeader>

        <ul className={cn(s.list)}>
          {ktDomains.length
            ? ktDomains.map((domain) => (
                <li
                  key={domain.name}
                  className={cn({ [s.lock]: !isActive })}
                  onClick={() => addActive(domain.name)}
                >
                  {domain.name}
                </li>
              ))
            : "Доменов нет"}
        </ul>
      </section>
      <section className={cn(s.section, s.right)}>
        <BlockHeader title="Active Domains">
          <div className={s.headercontainer}>
            <LockIcon
              onClick={() => setIsActive(!isActive)}
              isActive={isActive}
              className="pointer"
            />
            <Button onClick={fetchDomains}>
              <RefreshIcon />
              Refresh
            </Button>
          </div>
        </BlockHeader>

        <div className={s.scrollcontainer}>
          <ActiveDomains
            activeDomains={activeDomains}
            isDeactivateDomain={true}
            isActive={isActive}
          />
        </div>
      </section>
    </div>
  );
};

export default SwitchDomains;
