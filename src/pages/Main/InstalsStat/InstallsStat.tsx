import { useEffect, useState } from "react";
import DomainsIcon from "../../../components/icons/DomainsIcon/DomainsIcon";
import { getReports } from "../../../fetch/kt";
import type { ReportItem } from "../../../interfaces/kt";
import type { InstallsStatProps } from "./InstallsStat.props";
import s from "./installsstat.module.css";
import cn from "classnames";

const InstallsStat = ({ ids, ...props }: InstallsStatProps) => {
  const [dayReport, setDayReport] = useState<ReportItem[]>([]);

  const fetchReport = async () => {
    const result = await getReports({
      range: {
        interval: "today",
        timezone: "Europe/Kyiv",
      },
      dimensions: ["campaign_id", "campaign"],
      measures: ["clicks", "campaign_unique_clicks", "conversions", "cr"],
      filters: [
        {
          name: "campaign_id",
          operator: "IN_LIST",
          expression: ids,
        },
      ],
      sort: [
        {
          name: "clicks",
          order: "DESC",
        },
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const a: ReportItem[] = Object.keys(result).map((key: any) => ({
      campaignName: key,
      ...result[key],
    })) as ReportItem[];

    console.log(a);

    setDayReport(a);
  };

  useEffect(() => {
    if (ids.length) {
      fetchReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  return (
    <ul {...props}>
      <li className={cn(s.listheader, s.li)}>
        <span>
          <DomainsIcon />
          Domain
        </span>
        <span></span>
        <span>Impact</span>
      </li>

      {dayReport?.length
        ? dayReport.map((report) => {
            const percent = Number(report.cr); // CR уже с сервера

            let colorVar = "--success";
            if (percent < 10) colorVar = "--error";
            else if (percent < 20) colorVar = "--warning";

            return (
              <li className={s.li} key={report.campaignName}>
                <span>{report.domain}</span>
                <div className={s.progressWrapper}>
                  <div
                    className={s.progressBar}
                    style={{
                      width: `${percent}%`,
                      backgroundColor: `var(${colorVar})`,
                    }}
                  ></div>
                </div>
                <span>{percent.toFixed(1)}%</span>
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default InstallsStat;
