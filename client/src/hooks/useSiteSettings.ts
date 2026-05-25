import { useQuery } from "@tanstack/react-query";
import { sanityClient, SITE_SETTINGS_QUERY, type SiteSettings } from "@/lib/sanity";

export function useSiteSettings() {
  return useQuery<SiteSettings | null>({
    queryKey: ["sanity-site-settings"],
    queryFn: () => sanityClient.fetch(SITE_SETTINGS_QUERY),
  });
}
