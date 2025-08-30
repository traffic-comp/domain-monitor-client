import type { Proxy } from "../interfaces/proxy";

export const getProxy = async (): Promise<Proxy[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/proxy/get`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while gettign proxies");
    }

    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      throw err.message;
    }
    throw new Error("Unknown error");
  }
};

export const setProxy = async (proxyData: Proxy): Promise<Proxy[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/proxy/set`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(proxyData),
      mode: "cors",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while adding proxies");
    }

    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      throw err.message;
    }
    throw new Error("Unknown error");
  }
};

export const deleteProxy = async (proxyType: string): Promise<Proxy[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/proxy/delete`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ proxyType }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while deleting proxies");
    }

    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      throw err.message;
    }
    throw new Error("Unknown error");
  }
};
