import getConfig from './config'
import parse from './parse/bilibili'
import { filterDanmaku, mergeDanmaku, layoutDanmaku } from './util'
import ass from './ass/create'
import { SubtitleStyle } from './types'

type Options = {
    filename?: string
    title?: string
    substyle?: Partial<SubtitleStyle>
}

export function generateASS(text: string, options: Options) {
    const result = parse(text)
    const config = getConfig(options.substyle)
    const filteredList = filterDanmaku(result.list, config.block)
    const mergedList = mergeDanmaku(filteredList, config.mergeIn)
    const layoutList = layoutDanmaku(mergedList, config)
    const content = ass(layoutList, result.list, config, {
        filename: options.filename || 'unknown',
        title: options.title || 'unknown'
    })

    return content
}
