export interface Proxy {
  proxyType: string;
  type: "http" | "socks5";
  host: string;
  port: number;
  user: string;
  pass: string;
}