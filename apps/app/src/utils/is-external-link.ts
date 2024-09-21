export function isExternalLink(url?: string) {
  return url && url.startsWith("http") && !url.startsWith("/");
}
