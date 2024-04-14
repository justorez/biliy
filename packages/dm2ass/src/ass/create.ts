import info from './info'
import style from './style'
import event from './event'
import raw from './raw'
import { SubtitleStyle } from '../types'

export default (list, rawList, config: SubtitleStyle, context = {}) => {
    const content = [info(config, context), style(config), event(list, config)]

    if (config.includeRaw) {
        content.push(raw(rawList, config, context))
    }

    return content.join('\n\n') + '\n'
}
