import { isWhite } from './color'
import { DanmakuType, Danmaku, BlockRule } from '../types'

const getBlockInfo = (danmaku: Danmaku, rule: BlockRule) => {
    if (rule instanceof RegExp) {
        return [rule.test(danmaku.content || ''), `custom rule ${rule}`]
    }

    switch (rule) {
        case 'COLOR':
            return [!isWhite(danmaku.color), 'color danmaku']
        case 'TOP':
            return [danmaku.type === DanmakuType.TOP, 'top fixed danmaku']
        case 'BOTTOM':
            return [danmaku.type === DanmakuType.BOTTOM, 'bottom fixed danmaku']
        default:
            return [false, '']
    }
}

const matchBlock = (danmaku: Danmaku, block: BlockRule[]) => {
    for (const rule of block) {
        const [blocked, reason] = getBlockInfo(danmaku, rule)
        if (blocked) {
            return { danmaku, blocked, reason }
        }
    }

    return {
        danmaku: danmaku,
        blocked: false,
        reason: null
    }
}

export const filterDanmaku = (list: Danmaku[], block: BlockRule[]) => {
    const blockInfo = list.map((danmaku) => matchBlock(danmaku, block))

    for (const { reason, danmaku } of blockInfo.filter(
        (info) => info.blocked
    )) {
        console.log(
            `[Info] blocked ${danmaku.time}: ${danmaku.content} (${reason})`
        )
    }

    return blockInfo.filter((info) => !info.blocked).map((info) => info.danmaku)
}
