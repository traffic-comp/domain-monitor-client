import React, { useEffect, useState } from "react";
import type { BalancerProps } from "./Balancer.props";
import type { ResultBalancer } from "../../../interfaces/balancer";
import {
  connectDomain,
  deleteBalancer,
  getBalancers,
} from "../../../fetch/balancer";
import s from "./balancer.module.css";
import BlockHeader from "../../../components/BlockHeader/BlockHeader";
import Button from "../../../components/Button/Button";
import { useDomainStore } from "../../../sotre/domain";
import CloseIcon from "../../../components/icons/CloseIcon/CloseIcon";
import { changeDNS } from "../../../fetch/cloudFlare";

const Balancer = ({ ...props }: BalancerProps) => {
  const [balancers, setBalancers] = useState<ResultBalancer[]>([]);
  const [selectedIp, setSelectedIp] = useState<string>("");
  const [slectedDomain, setSelectedDomain] = useState<string>("");
  const { ktDomains } = useDomainStore();

  const fetchBalancers = async () => {
    const d = await getBalancers();
    setBalancers(d);
  };

  useEffect(() => {
    fetchBalancers();
  }, []);

  const setDomin = async () => {
    await connectDomain(selectedIp, slectedDomain);
    await changeDNS(selectedIp, slectedDomain);
  };
  const fetchDeleteBalancer = async (ip: string) => {
    await deleteBalancer(ip);
    await fetchBalancers();
  };

  return (
    <div {...props} className={s.container}>
      <BlockHeader title="Balancers" />

      {balancers.length ? (
        <table className={s.table}>
          <tbody>
            {balancers.map((balancer) => (
              <tr key={balancer.ip}>
                <td>
                  <span>{balancer.ip}</span>
                </td>
                <td>
                  <Button click={() => setSelectedIp(balancer.ip)}>
                    Set domain
                  </Button>
                </td>
                <td>
                  {selectedIp === balancer.ip ? (
                    <div className={s.selected}>
                      <select
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setSelectedDomain(e.target.value)
                        }
                      >
                        <option value="">Choose domain</option>
                        {ktDomains.length
                          ? ktDomains.map(({ name, id }) => (
                              <option value={name} key={id}>
                                {name}
                              </option>
                            ))
                          : null}
                      </select>
                      <Button click={setDomin}>Set</Button>
                    </div>
                  ) : null}
                </td>
                <td
                  className={s.lasttd}
                  onClick={() => fetchDeleteBalancer(balancer.ip)}
                >
                  <CloseIcon className="pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "Not found"
      )}
    </div>
  );
};

export default Balancer;
