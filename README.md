# figma-react-icons-generator

## Install
```bash
$ npm install --save-dev figma-react-icons-generator
```
OR
```bash
$ yarn add --dev figma-react-icons-generator
```

## Prerequisites
You will need to have a figma access token, you can get it from [here](https://www.figma.com/developers/api#authentication).


## How to use

- Create a figma file with icons like this [file](https://www.figma.com/file/B1v7c2kZ8EnvF3tLlxmT69/how-to-delivery-svg-from-figma-to-react?node-id=0%3A1).

- Open the project in a browser to get `file id`.

For example, for a url like this,
```
https://www.figma.com/file/UdgrZIihTO3DoiYFYcCg6R/xxx
```

The file id is `UdgrZIihTO3DoiYFYcCg6R`.

- Add in your package.json `icons` script with `figma-react-icons-generator -t <FIGMA_TOKEN> -f <FIGMA_FILE> -c <FIGMA_CANVA> -o <OUTPUT_FOLDER>`

```
  "scripts": {
    "icons": "figma-react-icons-generator -t <FIGMA_TOKEN> -f <FIGMA_FILE> -c <FIGMA_CANVA> -o <OUTPUT_FOLDER>",
  },
```

- Then you only have to run this command

```bash
$ npm run icons
```
OR
```bash
$ yarn icons
```