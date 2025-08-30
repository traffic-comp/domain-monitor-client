import { useEffect, type JSX } from "react";
import Button from "../../../components/Button/Button";
import RefreshIcon from "../../../components/icons/RefreshIcon/RefreshIcon";
import s from "./switchdomains.module.css";
import type { SwitchDomainsProps } from "./SwitchDomains.props";
import ActiveDomains from "../../../components/ActiveDomains/ActiveDomains";
import BlockHeader from "../../../components/BlockHeader/BlockHeader";
import { getKTDomains, setActiveDomain } from "../../../fetch/domains";
import cn from "classnames";
import { useDomainStore } from "../../../sotre/domain";

const SwitchDomains = ({
  fetchDomains,
  ...props
}: SwitchDomainsProps): JSX.Element => {
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
    setActiveDomain(name);
    addActiveDomain({
      domain: name,
      _id: "1",
      stability: [],
    });
  };

  return (
    <div className={s.container} {...props}>
      <section className={cn(s.section, s.left)}>
        <BlockHeader title="All Domains"></BlockHeader>

        <ul className={s.list}>
          {ktDomains.length
            ? ktDomains.map((domain) => (
                <li key={domain.name} onClick={() => addActive(domain.name)}>
                  {domain.name}
                </li>
              ))
            : "Доменов нет"}
        </ul>
      </section>
      <section className={cn(s.section, s.right)}>
        <BlockHeader title="Active Domains">
          <Button onClick={fetchDomains}>
            <RefreshIcon />
            Refresh
          </Button>
        </BlockHeader>

        <div className={s.scrollcontainer}>
          <ActiveDomains
            activeDomains={activeDomains}
            isDeactivateDomain={true}
          />
        </div>
      </section>
    </div>
  );
};

export default SwitchDomains;
