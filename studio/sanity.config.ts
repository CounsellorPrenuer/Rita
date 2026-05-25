import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Rita Portfolio Studio",
  projectId: "hytzqone",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings (images & logo)")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings"),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["siteSettings"].includes(item.getId() || ""),
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
