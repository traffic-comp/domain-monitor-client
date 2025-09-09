import { useEffect, useRef, useState } from "react";
import BlockHeader from "../../../components/BlockHeader/BlockHeader";
import Button from "../../../components/Button/Button";
import PlusIcon from "../../../components/icons/PlusIcon/PlusIcon";
import s from "./proxylist.module.css";
import { deleteProxy, getProxy } from "../../../fetch/proxy";
import type { Proxy } from "../../../interfaces/proxy";
import cn from "classnames";
import ProxyController from "./ProxyController/ProxyController";
import CloseIcon from "../../../components/icons/CloseIcon/CloseIcon";

const ProxyList = () => {
  const [proxyList, setProxyList] = useState<Proxy[]>([]);
  const [isOpenIdx, setIsOpenIdx] = useState<number | null>(null);
  const [proxyData, setProxyData] = useState<Proxy | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const actionRef = useRef<HTMLTableCellElement | null>(null);

  const fetchProxyList = async () => {
    const data = await getProxy();
    setProxyList(data);
  };

  useEffect(() => {
    fetchProxyList();
  }, []);

  // Обработчик клика вне окна
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        setIsOpenIdx(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={s.container}>
      <BlockHeader title="Proxy">
        <Button click={() => setIsOpen(true)}>
          <PlusIcon />
          Add Proxy
        </Button>
      </BlockHeader>

      <table className={s.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Host</th>
            <th>Port</th>
            <th>Pass</th>
            <th>User</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {proxyList.length
            ? proxyList.map((proxy, idx) => (
                <tr key={idx}>
                  <td>{proxy.proxyType}</td>
                  <td>{proxy.type}</td>
                  <td>{proxy.host}</td>
                  <td>{proxy.port}</td>
                  <td>{proxy.pass}</td>
                  <td>{proxy.user}</td>
                  <td
                    ref={isOpenIdx === idx ? actionRef : null}
                    className={cn("pointer", s.right, s.lastchild)}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await deleteProxy(proxy.proxyType);
                    }}
                  >
                    <CloseIcon />
                  </td>
                  <td></td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      <div className={s.cards}>
        {proxyList.length
          ? proxyList.map((proxy) => (
              <div className={s.card}>
                <div
                  className={s.close}
                  onClick={async (e) => {
                    e.stopPropagation();
                    await deleteProxy(proxy.proxyType);
                  }}
                >
                  <CloseIcon />
                </div>
                <div className={s.body}>
                  <div className={s.bodyrow}>
                    <span>Name:</span> <span>{proxy.proxyType}</span>
                  </div>
                  <div className={s.bodyrow}>
                    <span>Type:</span> <span>{proxy.type}</span>
                  </div>
                  <div className={s.bodyrow}>
                    <span>Host:</span> <span>{proxy.host}</span>
                  </div>
                  <div className={s.bodyrow}>
                    <span>Port:</span> <span>{proxy.port}</span>
                  </div>
                  <div className={s.bodyrow}>
                    <span>Pass:</span> <span>{proxy.pass}</span>
                  </div>
                  <div className={s.bodyrow}>
                    <span>User:</span> <span>{proxy.user}</span>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>

      {isOpen ? (
        <ProxyController
          proxyData={proxyData}
          setProxyData={setProxyData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : null}
    </div>
  );
};

export default ProxyList;
