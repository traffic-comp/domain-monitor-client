import { useEffect } from "react";
import { getDomains } from "../../fetch/domains";
// import type { IDomains } from "../../interfaces/domain";
import SwitchDomains from "./SwitchDomains/SwitchDomains";
import { useDomainStore } from "../../sotre/domain";
import type { IDomains } from "../../interfaces/domain";

const Domains = () => {
  const { setDomains, domains } = useDomainStore();

  const fetchDomains = async () => {
    const data = await getDomains();
    setDomains(data as IDomains[]);
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  return <>{domains.length && <SwitchDomains fetchDomains={fetchDomains} />}</>;
};

export default Domains;
