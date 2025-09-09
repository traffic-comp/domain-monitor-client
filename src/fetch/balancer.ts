import type { Balancer, ResultBalancer } from "../interfaces/balancer";

export const getBalancers = async (): Promise<ResultBalancer[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/balanser/get`);
    const data: Balancer[] = await res.json();

    if (!res.ok) {
      throw new Error("Error while getting balancers");
    }

    return data[0].balansers.length ? data[0].balansers : [];
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      throw err.message;
    }
    throw new Error("Unknown error");
  }
};

export const connectDomain = async (ip: string, domain: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/balanser/connect-domain`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ip, domain }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while setting domian on balancer");
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

export const deleteBalancer = async (ip: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/balanser/delete`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ip }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while deleting balancer");
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
