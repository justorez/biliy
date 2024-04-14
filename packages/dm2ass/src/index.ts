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

export default (text: string, options: Options) => {
    const result = parse(text)
    // 配置一切看当前设置的为优先
    const config = getConfig(options.substyle)
    // 上下文信息是解析出来的优先，因为要恢复最初的文件名等
    const filteredList = filterDanmaku(result.list, config.block)
    const mergedList = mergeDanmaku(filteredList, config.mergeIn)
    const layoutList = layoutDanmaku(mergedList, config)
    const content = ass(layoutList, result.list, config, {
        filename: options.filename || 'unknown',
        title: options.title || 'unknown'
    })

    return content
}
