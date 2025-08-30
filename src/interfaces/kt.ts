export interface ReportDTO {
  range: {
    interval: string;
    timezone: string;
  };
  dimensions: string[];
  measures: string[];
  filters: ReportFilters[];
  sort: ReportSort[];
}

interface ReportSort {
  name: string;
  order: string;
}

interface ReportFilters {
  name: string;
  operator: "IN_LIST" | "EQUALS";
  expression: number[];
}

export interface ReportItem {
  campaignName?: string;
  campaign_id: number;
  clicks: number;
  campaign_unique_clicks: number;
  conversions: number;
  cr: string;
  domain: string;
}

export interface ReportResult {
  [campaignName: string]: ReportItem;
}

export interface ReportByDateResult {
  [campaignName: string]: ReportByDateItem;
}

export interface ReportByDate {
  ids: number[];
  date?: string;
}

export interface ReportByDateItem extends ReportItem {
  created_at: string;
  data: any[];
}
