export interface Balancer {
  _id: string;
  activeBalansers: [];
  balansers: ResultBalancer[];
}

export interface ResultBalancer {
  ip: string;
  isUsage: boolean;
}
