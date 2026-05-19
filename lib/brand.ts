const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://milkybacklinks.com";

export const LOGO_PATH = "/logo.png";
export const LOGO_URL = `${SITE_URL}${LOGO_PATH}`;

export function emailLogoHtml(options?: { height?: number; darkBg?: boolean }) {
  const height = options?.height ?? 40;
  const padding = options?.darkBg ? "8px 12px" : "0";
  const bg = options?.darkBg ? "background:#000;border-radius:8px;" : "";
  return `<img src="${LOGO_URL}" alt="MilkyBacklinks" width="${height}" height="${height}" style="display:block;height:${height}px;width:auto;${bg}padding:${padding};" />`;
}
