import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  featuresKkn2025Sidebar: [
    {
      type: 'category',
      label: 'QR Code',
      link: {type: 'doc', id: 'kkn2025/qr-code/overview'},
      items: [
        {type: 'doc', id: 'kkn2025/qr-code/overview', label: 'Fitur QR Code'},
        {type: 'doc', id: 'kkn2025/qr-code/developer-guide', label: 'Developer Guide'},
      ],
    },
    {
      type: 'category',
      label: 'Geotagging',
      link: {type: 'doc', id: 'kkn2025/geotagging/overview'},
      items: [
        {type: 'doc', id: 'kkn2025/geotagging/overview', label: 'Fitur Geotagging'},
        {type: 'doc', id: 'kkn2025/geotagging/developer-guide', label: 'Developer Guide'},
      ],
    },
  ],
};

export default sidebars;
