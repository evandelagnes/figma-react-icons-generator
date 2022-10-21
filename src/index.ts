const yargs = require('yargs-parser')(process.argv.slice(2));
import { getSvg } from './exporter';
import { SVGToReactComponent } from './convert';
import { createIndex, saveComponents } from './utils';

interface Config {
  output: string;
  figmaToken: string;
  figmaFile: string;
  figmaCanva: string;
}

const parser = () => {
  const config: Config = {
    output: yargs.o || yargs.output,
    figmaToken: yargs.t || yargs.token,
    figmaFile: yargs.f || yargs.file,
    figmaCanva: yargs.c || yargs.canva,
  };
  let property: keyof typeof config;
  for (property in config) {
    if (typeof config[property] === 'undefined') {
      console.error('error: bad arguments.');
      process.exit(1);
    }
  }
  run(config);
};

const run = async (config: Config) => {
  const svgs = SVGToReactComponent(await getSvg(config.figmaToken, config.figmaFile, config.figmaCanva));
  svgs.forEach((item) => {
    saveComponents(config.output, item.name, 'js', item.component!);
  });
  createIndex({
    componentsFolder: config.output,
    indexFolder: config.output,
    indexFile: 'index.js',
  });
};

parser();
