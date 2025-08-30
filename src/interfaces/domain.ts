export interface IActiveDomains {
  domain: string;
  _id: string;
  stability: Stability[];
}

export interface IDomains extends IActiveDomains {
  _id: string;
  activeDomains: IActiveDomains[];
  __v: 110;
  domains: IActiveDomains[];
}

export interface Stability {
  proxyName: string;
  attempts: number;
  success: number;
  failed: number;
  stats: number;
  _id: string;
}

export interface DetailDomainInfo {
  fullUrl: string;
  domain: string;
  ip: string;
  sslInfo: {
    issuer: string;
    validTo: string;
  };
  ns: string[];
  balancerPing: {
    ip: string;
    dnsHost: string;
    pingAlive: boolean;
    pingTime: number;
  };
  port80Open: boolean;
  port443Open: boolean;
  httpAlive: boolean;
  httpStatus: number;
}

export interface ReestrDomainsResult {
  domains: string[];
  error: string | null;
}

export interface ReestrIpsResult {
  ips: string[];
  error: string | null;
}

export interface KTDomains {
  id: number;
  name: string;
  is_ssl: boolean;
  network_status: string;
  default_campaign_id: number;
  state: string;
  created_at: string;
  updated_at: string;
  catch_not_found: boolean;
  notes: string;
  error_description: string;
  ssl_status: string;
  ssl_data: boolean;
  next_check_at: string;
  ssl_redirect: boolean;
  allow_indexing: boolean;
  check_retries: number;
  group_id: never;
  admin_dashboard: boolean;
  registrar: string;
  external_id: string;
  cloudflare_proxy: boolean;
  cloudflare_id: string;
  dns_provider: string;
  campaigns_count: boolean;
  default_campaign: string;
  group: string;
  error_solution: string;
  status: string;
}
