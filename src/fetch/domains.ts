import type { IDomains, KTDomains } from "../interfaces/domain";

export const getDomains = async (): Promise<IDomains[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/domain/get`);
    const data: IDomains[] = await res.json();

    if (!res.ok) {
      throw new Error("Error while getting domains");
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

export const getKTDomains = async (): Promise<KTDomains[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/domain/kt-domains`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while getting domains from keitaro");
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

export const setActiveDomain = async (domain: string): Promise<IDomains[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/domain/set-active`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        domain,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while setting active domain");
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

export const deleteActivateDomain = async (domain: string): Promise<IDomains[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/domain/deactivate`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        domain: domain,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while deactivate domain");
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
