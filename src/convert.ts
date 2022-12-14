import { transform } from '@svgr/core';

interface SVGElement {
  url: string;
  id: string;
  name: string;
  data: string;
  component?: string;
}

export const SVGToReactComponent = (svgs: SVGElement[]): SVGElement[] => {
  return svgs.map((item) => {
    const code = transform.sync(
      item.data,
      {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
        icon: true,
        replaceAttrValues: {
          '#000': '{props.color || "#000"}',
        },
      },
      { componentName: item.name },
    );
    return {
      ...item,
      component: code,
    };
  });
};
