import type {
  DetailDomainInfo,
  ReestrDomainsResult,
  ReestrIpsResult,
} from "../interfaces/domain";

export const checkDomain = async (
  domain: string | string[] = []
): Promise<DetailDomainInfo[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/check/domain`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ domains: [domain] }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while checking domain");
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

export const checklinks = async (
  domain: string | string[] = []
): Promise<DetailDomainInfo[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/check/links`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ domains: domain }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while checking domain");
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

export const checkReestrIps = async (
  ips: string[] = []
): Promise<ReestrIpsResult> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/check/reestr-ips`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ips }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while checking domain");
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

export const checkReestrDomains = async (
  domains: string[] = []
): Promise<ReestrDomainsResult> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/check/reestr-domains`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ domains }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while checking domain");
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
