import { useState } from "react";
import BlockHeader from "../../../../components/BlockHeader/BlockHeader";
import CloseIcon from "../../../../components/icons/CloseIcon/CloseIcon";
import type { ProxyControllerProps } from "./ProxyController.props";
import s from "./addproxy.module.css";
import { setProxy } from "../../../../fetch/proxy";
import type { Proxy } from "../../../../interfaces/proxy";
// Интерфейс для формы

const ProxyController = ({ setIsOpen, ...props }: ProxyControllerProps) => {
  const [form, setForm] = useState<Proxy>({
    proxyType: "",
    type: "http",
    host: "",
    port: 0,
    user: "",
    pass: "",
  });

  const handleChange = (field: keyof Proxy, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Преобразуем port в число
    const data: Omit<Proxy, "_id"> = {
      ...form,
      port: Number(form.port),
    };

    try {
      const result = await setProxy(data); // отправка на сервер
      console.log("Proxy added:", result);
      setIsOpen(false);
    } catch (err) {
      console.error("Error adding proxy:", err);
    }
  };

  return (
    <div {...props} className={s.overlay}>
      <div className={s.container}>
        <BlockHeader title="">
          <CloseIcon className="pointer" click={() => setIsOpen(false)} />
        </BlockHeader>

        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            <span>Name</span>
            <input
              type="text"
              value={form.proxyType}
              onChange={(e) => handleChange("proxyType", e.target.value)}
            />
          </label>

          <label>
            <span>Type</span>
            <div className={s.switch}>
              <span
                className={form.type === "http" ? s.choosed : ""}
                onClick={() => handleChange("type", "http")}
              >
                http
              </span>
              <span
                className={form.type === "socks5" ? s.choosed : ""}
                onClick={() => handleChange("type", "socks5")}
              >
                socks5
              </span>
            </div>
          </label>

          <label>
            <span>Host</span>
            <input
              type="text"
              value={form.host}
              onChange={(e) => handleChange("host", e.target.value)}
            />
          </label>

          <label>
            <span>Port</span>
            <input
              type="text"
              value={form.port}
              onChange={(e) => handleChange("port", e.target.value)}
            />
          </label>

          <label>
            <span>Username</span>
            <input
              type="text"
              value={form.user}
              onChange={(e) => handleChange("user", e.target.value)}
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="text"
              value={form.pass}
              onChange={(e) => handleChange("pass", e.target.value)}
            />
          </label>

          <button type="button" onClick={handleSubmit}>
            Add Proxy
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProxyController;
