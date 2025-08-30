/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { ReportByDateItem } from "../../../interfaces/kt";
import type { GrapicProps } from "./Graphic.props";
import { reportFromStart, reportByHours } from "../../../fetch/kt";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import s from "./graphic.module.css";
import Loader from "../../../components/Loader/Loader";
import Button from "../../../components/Button/Button";
import PlusIcon from "../../../components/icons/PlusIcon/PlusIcon";
import { useGraphicStore } from "../../../sotre/graphic";

const Graphic = ({ period, width, height, ids, ...props }: GrapicProps) => {
  const [report, setReport] = useState<ReportByDateItem[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totals, setTotals] = useState({ clicks: 0, conversions: 0 });
  const [isShow, setIsShow] = useState<boolean>(false);
  const [campaingIds, setCampaingIds] = useState<string>("");
  const { setIds } = useGraphicStore();

  const fetchReport = async (currentPeriod: "day" | "hour", ids: number[]) => {
    setLoading(true);
    let result: any = {};

    try {
      if (currentPeriod === "day") {
        result = await reportFromStart({ ids });
      } else {
        result = await reportByHours({ ids });
      }
    } catch (err) {
      console.error("Ошибка при получении данных:", err);
      setLoading(false);
      return;
    }

    const campaignsArr: ReportByDateItem[] = Object.keys(result).map((key) => {
      const firstItem =
        Array.isArray(result[key]) && result[key].length > 0
          ? result[key][0]
          : {};
      return {
        campaignName: key,
        data: result[key],
        created_at: firstItem.created_at ?? "",
        campaign_id: firstItem.campaign_id ?? 0,
        clicks: firstItem.clicks ?? 0,
        campaign_unique_clicks: firstItem.campaign_unique_clicks ?? 0,
        conversions: firstItem.conversions ?? 0,
        cost: firstItem.cost ?? 0,
        cr: firstItem.cr ?? 0,
        domain: firstItem.domain ?? "",
      };
    });

    setReport(() => campaignsArr);

    if (!campaignsArr.length) {
      setLoading(false);
      return;
    }

    setActiveCampaign(campaignsArr[0].campaignName || null);
    buildChartData(campaignsArr[0], currentPeriod);
    setLoading(false);
  };

  const buildChartData = (
    campaign: ReportByDateItem,
    currentPeriod: "day" | "hour"
  ) => {
    if (!campaign.data || !Array.isArray(campaign.data)) {
      setChartData([]);
      setTotals({ clicks: 0, conversions: 0 });
      return;
    }

    const normalized = campaign.data.map((item: any) => {
      let label = item.date;

      if (currentPeriod === "hour") {
        const hour = item.date.slice(-2);
        label = `${hour}:00`;
      }

      return {
        label,
        campaign_unique_clicks: item.campaign_unique_clicks ?? 0,
        conversions: item.conversions ?? 0,
      };
    });

    setChartData(normalized);

    // считаем общие суммы
    const totalClicks = normalized.reduce(
      (
        acc: number,
        cur: {
          campaign_unique_clicks: number;
          conversions: number;
          label: string;
        }
      ) => acc + cur.campaign_unique_clicks,
      0
    );
    const totalConversions = normalized.reduce(
      (
        acc: number,
        cur: {
          campaign_unique_clicks: number;
          conversions: number;
          label: string;
        }
      ) => acc + cur.conversions,
      0
    );

    setTotals({ clicks: totalClicks, conversions: totalConversions });
  };

  const handleCampaignChange = (name: string) => {
    setActiveCampaign(name);
    const campaign = report.find((r) => r.campaignName === name);
    if (!campaign) return;
    buildChartData(campaign, period);
  };

  useEffect(() => {
    fetchReport(period, ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const addActiveCampaing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const campaings = campaingIds.split(" ").filter(Boolean);
    localStorage.setItem("ids", JSON.stringify(campaings));
    const mapped = campaings.map((camp) => Number(camp));
    setIds(mapped);
    await fetchReport(period, mapped);

    // автоматически выбираем первую кампанию для отображения графика
    if (report.length === 0 && mapped.length > 0) {
      setActiveCampaign(null); // сбрасываем перед установкой
    }
  };

  // Удаление кампании
  const removeCampaign = (campaignId: number) => {
    const lsIds = localStorage.getItem("ids");

    if (lsIds) {
      const paresedLS: number[] = JSON.parse(lsIds).map((item: string) =>
        Number(item)
      );
      console.log(campaignId);
      const filteredIds = paresedLS.filter((id: number) => campaignId !== id);

      localStorage.setItem("ids", JSON.stringify(filteredIds));
      fetchReport(period, filteredIds);
    }
  };

  const handleCampaignClick = (campaignName: string) => {
    handleCampaignChange(campaignName);
  };

  return (
    <div {...props} className={s.container}>
      {ids.length > 0 || report.length > 0 ? (
        <>
          {/* Табы кампаний */}
          <div className={s.tabs}>
            {report.map((c, idx) => (
              <div key={`${c.campaign_id}-${idx}`} className={s.tabWrapper}>
                <div
                  className={
                    s.tabButton +
                    (activeCampaign === c.campaignName
                      ? ` ${s.tabButtonActive}`
                      : "")
                  }
                  onClick={() =>
                    handleCampaignClick(c.campaignName ? c.campaignName : "")
                  }
                >
                  <button>{c.campaignName}</button>

                  <button
                    className={s.deleteButton}
                    onClick={() => removeCampaign(c.campaign_id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Блок с общими суммами */}
          <div className={s.totals}>
            <div className={s.totalClicks}>
              <span className={s.circle}></span>
              <span>Instalis: {totals.clicks}</span>
            </div>

            <div className={s.conversions}>
              <span className={s.circle}></span>
              <span>Registrations: {totals.conversions}</span>
            </div>
          </div>

          {/* График */}
          <div className={s.chartWrapper}>
            {loading ? (
              <Loader />
            ) : (
              <ResponsiveContainer width={width} height={height}>
                <LineChart data={chartData}>
                  <CartesianGrid
                    stroke="#4E556C" // цвет линий
                    horizontal={true}
                    vertical={false} // только горизонтальные линии
                  />
                  <XAxis
                    dataKey="label"
                    axisLine={{ stroke: "transparent" }} // линия оси
                    tickLine={{ stroke: "transparent" }} // маленькие штрихи
                    tick={{ fill: "#AEB9E1" }} // цвет текста подписей
                  />

                  <YAxis
                    axisLine={{ stroke: "transparent" }}
                    tickLine={{ stroke: "transparent" }}
                    tick={{ fill: "#AEB9E1" }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="campaign_unique_clicks"
                    stroke="var(--good)"
                    fill="var(--good)"
                    name="Instalis"
                  />
                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="var(--pink)"
                    fill="var(--pink)"
                    name="Registrations"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      ) : (
        <div className={s.notfound}>
          <p>Not found active campaing</p>
          <Button click={() => setIsShow(!isShow)}>
            <PlusIcon />
            Add active campaing
          </Button>

          {isShow ? (
            <div className={s.setactivecampaing}>
              <p>Enter campaing ids</p>
              <form onSubmit={addActiveCampaing}>
                <input
                  placeholder="Enter ids"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCampaingIds(e.target.value)
                  }
                />
                <Button>Add</Button>
              </form>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Graphic;
