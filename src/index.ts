#!/usr/bin/env node

import yargs from 'yargs-parser';
import { getSvg } from './exporter';
import { SVGToReactComponent } from './convert';
import { createIndex, saveComponents } from './utils';

interface Config {
  output: string;
  figmaToken: string;
  figmaFile: string;
  figmaCanva: string;
}

const args = yargs(process.argv.slice(2));
const parser = () => {
  const config: Config = {
    output: args.o || args.output,
    figmaToken: args.t || args.token,
    figmaFile: args.f || args.file,
    figmaCanva: args.c || args.canva,
  };
  let property: keyof typeof config;
  for (property in config) {
    if (typeof config[property] === 'undefined') process.exit(1);
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
