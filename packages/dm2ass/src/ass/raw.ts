import { gzipSync } from 'zlib'

export default (list, config, context) => {
    const raw = { list, config, context }
    const rawText = JSON.stringify(raw)
    return ';Raw: ' + gzipSync(rawText).toString('base64')
}
