import fs from 'fs-extra';
import path from 'path';
import { EOL } from 'os';

interface IndexConfigProps {
  componentsFolder: string;
  indexFolder: string;
  indexFile: string;
}

export const saveComponents = (iconpath: string, name: string, extension: string, component: string) => {
  const extensions = ['js', 'jsx', 'ts', 'tsx'];
  if (!extensions.includes(extension)) process.exit(1);
  fs.ensureDirSync(iconpath);
  fs.outputFileSync(path.resolve(iconpath, `${name}.${extension}`), component);
};

export const createIndex = ({ componentsFolder, indexFolder, indexFile }: IndexConfigProps) => {
  let content: string = '';
  fs.readdirSync(componentsFolder).forEach((file: string) => {
    const componentName = ((file.substring(0, file.indexOf('.')) || file).match(/[a-zA-Z0-9]+/g) || [])
      .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
      .join('');
    const relativePathToComponent = path.relative(indexFolder, path.resolve(componentsFolder, componentName));
    const componentExport = `export { default as ${componentName} } from "./${relativePathToComponent}";`;
    content += componentExport + EOL;
  });
  fs.writeFileSync(path.resolve(indexFolder, indexFile), content);
};
