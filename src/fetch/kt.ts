import type {
  ReportByDate,
  ReportByDateResult,
  ReportDTO,
  ReportResult,
} from "../interfaces/kt";

export const getReports = async (dto: ReportDTO): Promise<ReportResult[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/kt/report`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ body: dto }),
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

export const reportFromStart = async (
  dto: ReportByDate
): Promise<ReportByDateResult[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/kt/report-from-start`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(dto),
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

export const reportByHours = async (
  dto: ReportByDate
): Promise<ReportByDateResult> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/kt/reportByHours`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(dto), // { ids: [20, 24] }
    });

    if (!res.ok) {
      throw new Error("Ошибка при получении статистики по часам");
    }

    const data: ReportByDateResult = await res.json();
    return data;
  } catch (err) {
    console.error("reportByHours error:", err);
    throw err;
  }
};
