import { useState, type JSX } from "react";
import BlockHeader from "../../components/BlockHeader/BlockHeader";

import s from "./blocks.module.css";
import SearchIcon from "../../components/icons/SearchIcon/SearchIcon";
import { checkReestrDomains, checkReestrIps } from "../../fetch/check";
import Loader from "../../components/Loader/Loader";

const Blocks = (): JSX.Element => {
  const [searchData, setSearchData] = useState<string>("");
  const [reesterIps, setReestrIp] = useState<string[]>([]);
  const [reesterDomains, setReesterDomains] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setReestrIp([]);
    setReesterDomains([]);
    const data = searchData.split(" ");

    const domainRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    const ipv4Regex =
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

    const result = data.reduce(
      (acc, item) => {
        if (domainRegex.test(item)) {
          acc.domains.push(item);
        }
        if (ipv4Regex.test(item)) {
          acc.ips.push(item);
        }
        return acc;
      },
      { domains: [] as string[], ips: [] as string[] }
    );

    if (result.domains.length) {
      const reestrData = await checkReestrDomains(result.domains);

      if (reestrData) {
        if (reestrData.domains.length) {
          setReesterDomains(reestrData.domains);
        }
        setLoading(false);
      }
    }

    if (result.ips.length) {
      const reestrData = await checkReestrIps(result.ips);

      if (reestrData) {
        if (reestrData.ips.length) {
          setReestrIp(reestrData.ips);
        }
        setLoading(false);
      }
    }
  };

  return (
    <>
      <form
        className={s.form}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => search(e)}
      >
        <label>
          <span>Search domain or balancer</span>
          <div className={s.inputContainer}>
            <SearchIcon click={() => console.log(1)} />
            <input
              type="text"
              placeholder="Search for"
              value={searchData}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchData(e.target.value)
              }
            />
          </div>
        </label>
      </form>

      {loading ? (
        <div style={{ margin: "0 auto", marginTop: "30px" }}>
          <Loader />
        </div>
      ) : (
        <div className={s.container}>
          <div className={s.domains}>
            <BlockHeader title="Domains">
              <p className={s.headertext}>{reesterDomains.length}</p>
            </BlockHeader>

            {!reesterDomains.length ? (
              <p className={s.status}>Not found</p>
            ) : (
              <ul className={s.list}>
                {reesterDomains.map((domain) => (
                  <li>{domain}</li>
                ))}
              </ul>
            )}
          </div>

          <div className={s.balancers}>
            <BlockHeader title="Balancers">
              <p className={s.headertext}>{reesterIps.length}</p>
            </BlockHeader>

            {!reesterIps.length ? (
              <p className={s.status}>Not found</p>
            ) : (
              <ul className={s.list}>
                {reesterIps.map((ip) => (
                  <li>{ip}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Blocks;
