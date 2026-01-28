import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  featuresKkn2025Sidebar: [
    {
      type: "category",
      label: "QR Code",
      link: { type: "doc", id: "kkn2025/qr-code/overview" },
      items: [
        {
          type: "doc",
          id: "kkn2025/qr-code/developer-guide",
          label: "QR Code Developer Guide",
        },
      ],
    },
    {
      type: "category",
      label: "Geotagging",
      link: { type: "doc", id: "kkn2025/geotagging/overview" },
      items: [
        {
          type: "doc",
          id: "kkn2025/geotagging/developer-guide",
          label: "Geotagging Developer Guide",
        },
      ],
    },
    {
      type: "doc",
      id: "kkn2025/peta-kesesuaian-lahan/overview",
      label: "Peta Kesesuaian Lahan",
    },
  ],
};

export default sidebars;
