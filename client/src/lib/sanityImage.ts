import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(
  source: unknown,
  options?: { width?: number; height?: number },
): string | undefined {
  if (!source) return undefined;
  try {
    let img = builder.image(source).auto("format").quality(85);
    if (options?.width) img = img.width(options.width);
    if (options?.height) img = img.height(options.height);
    return img.url();
  } catch {
    return undefined;
  }
}
