import { gzipSync } from 'zlib'
import { Danmaku } from '../types'

export default (list: Danmaku[], config, context) => {
    const raw = { list, config, context }
    const rawText = JSON.stringify(raw)
    return ';Raw: ' + gzipSync(rawText).toString('base64')
}
