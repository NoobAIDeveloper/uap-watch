import OgImage from "./opengraph-image";

export const runtime = "edge";
export const alt =
  "UAP.WATCH — Independent visualization of declassified UAP files released by the U.S. Department of War.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return OgImage();
}
