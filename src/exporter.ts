const figmaApiExporter = require('figma-api-exporter').default;
const axios = require('axios');

// get from parser these values
// /!\ TO REMOVE /!\
const figmaToken = 'figd_aFejy1YD8IiY7qt5YRbpxn0kHvelY-xh8TxczP9h';
const figmaFile = 'gZqzGEIMCigqNWUcCNFQcL';
const figmaCanva = '📊 Dashboard';

const exporter = figmaApiExporter(figmaToken);

interface SVGOption {
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}

interface SVGElement {
  url: string;
  name: string;
  id: string;
}

export const getSvg = (options?: SVGOption) => {
  const defaults = { strokeWidth: 1, strokeColor: '#222222', fillColor: '#222222' };
  exporter
    .getSvgs({
      fileId: figmaFile,
      canvas: figmaCanva,
    })
    .then(async (svgsData: any) => {
      const svgs = await getSvgElement(svgsData.svgs, { ...defaults, ...options });
      svgs.map((svg: SVGElement) => {
        svg.name = (svg.name.match(/[a-zA-Z0-9]+/g) || []).map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('') + 'Icon';
      });
    })
    .catch((err: unknown) => {
      process.exit(1);
    });
};

const getSvgElement = async <T extends {}>(
  data: ({ url: string; id: string; name: string } & T)[],
  options: SVGOption,
) => {
  return Promise.all(
    data.map(async (item) => {
      const { data } = await axios.get(item.url);
      return {
        ...item,
        data: data
          .replaceAll(/stroke="#[a-fA-F0-9]{6}"/g, `stroke="${options.strokeColor}"`)
          .replaceAll(/fill="#[a-fA-F0-9]{6}"/g, `fill="${options.fillColor}"`)
          .replaceAll(/stroke-width="[0-9]{1,2}\.[0-9]{1,2}"/g, `stroke-width="${options.strokeWidth?.toString()}"`),
      };
    }),
  );
};