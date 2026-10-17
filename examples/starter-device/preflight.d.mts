export function checkStarterDeviceReadiness(options?: {
  origin?: string;
  issuer?: string;
  clientId?: string;
  scope?: string[];
  fetchImpl?: (url: string | URL, init: RequestInit) => Promise<Response>;
}): Promise<{ checks: string[]; authenticatedAcceptance: string }>;
