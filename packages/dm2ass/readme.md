# @biliy/dm2ass

> forked from https://github.com/otakustay/danmaku-to-ass

## Installation

```bash
pnpm add @biliy/dm2ass
```

## Quick Example

```js
import fs from 'fs'
import dm2ass from '@biliy/dm2ass'

const filename = 'example.xml'
const xmlText = fs.readFileSync(filename, 'utf-8')
const assText = dm2ass(xmlText, { filename, title: 'Quick Example' })
fs.writeFileSync(`${filename}.ass`, assText, 'utf-8')
```

```js
// default subtitle style
// convert function options.substyle
{
    fontSize: [14, 16, 18],
    fontName: '黑体',
    color: '#ffffff',
    outlineColor: null,
    backColor: null,
    outline: 2,
    shadow: 0,
    bold: false,
    padding: [2, 2, 2, 2],
    playResX: 1280,
    playResY: 720,
    scrollTime: 8,
    fixTime: 4,
    opacity: 0.6,
    bottomSpace: 60,
    includeRaw: true,
    mergeIn: -1,
    block: []
}
```

## FAQ

If you get errors about node-canvas when install, please check [node-canvas docs](https://github.com/Automattic/node-canvas#installation).