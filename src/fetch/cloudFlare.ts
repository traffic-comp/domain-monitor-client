export const changeDNS = async (newIp: string, domain: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/cloudflare/changeDNS`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          newIp,
          domain,
        }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error while changing dns");
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
