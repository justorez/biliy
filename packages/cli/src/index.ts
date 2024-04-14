import { program } from 'commander'
import { readJSONSync } from 'fs-extra/esm'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { biliy } from './sdk'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = readJSONSync(path.join(__dirname, '../package.json'))

program
    .name('biliy')
    .description('Bilibili command line')
    .version(`v${pkg.version}`, '-v, --version')

program
    .command('b2a')
    .description('Convert bvid to aid')
    .argument('<bvid>', 'such as BV1eW4y1W72d')
    .action((bvid: string) => {
        const aid = biliy.bv2aid(bvid)
        console.log(aid)
    })

program
    .command('dm')
    .description('Download danmaku in XML and ASS formats')
    .argument('<value>', 'video url/bvid / avid')

program.parse()
