import { program } from 'commander'
import { readJSONSync } from 'fs-extra/esm'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import biliy from './sdk'
import { generateASS } from '@biliy/ass'
import fs from 'fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = readJSONSync(path.join(__dirname, '../package.json'))

program
    .name('biliy')
    .description('Bilibili command line')
    .version(`v${pkg.version}`, '-v, --version')

program
    .command('b2a')
    .description('convert bvid to aid')
    .argument('<bvid>', 'such as BV1eW4y1W72d')
    .action((bvid: string) => {
        const aid = biliy.bv2aid(bvid)
        console.log(aid)
    })

program
    .command('dm')
    .description('download danmaku in XML and ASS formats')
    .argument('<value>', 'videoURL or bvid')
    .action(async (input: string) => {
        const workdir = process.cwd()
        const danmakuList = (await biliy.danmaku(input)) || []
        for (const { title, xml, dimension } of danmakuList) {
            fs.writeFile(path.join(workdir, `${title}.xml`), xml)
            const ass = generateASS(xml, {
                title,
                filename: `${title}.xml`,
                substyle: {
                    playResX: dimension.width,
                    playResY: dimension.height
                }
            })
            fs.writeFile(path.join(workdir, `${title}.ass`), ass)
        }
    })

program.parse()
