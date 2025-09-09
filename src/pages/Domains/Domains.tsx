import { useEffect } from "react";
import { getDomains } from "../../fetch/domains";
import SwitchDomains from "./SwitchDomains/SwitchDomains";
import { useDomainStore } from "../../sotre/domain";
import type { IDomains } from "../../interfaces/domain";
import Balancer from "./Balancer/Balancer";

const Domains = () => {
  const { setActiveDomains, activeDomains } = useDomainStore();

  const fetchDomains = async () => {
    const data = await getDomains();
    setActiveDomains(data[0].activeDomains as IDomains[]);
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  return (
    <>
      {activeDomains ? <SwitchDomains fetchDomains={fetchDomains} /> : null}
      <Balancer />
    </>
  );
};

export default Domains;
