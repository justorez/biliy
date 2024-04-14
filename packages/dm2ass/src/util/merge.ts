import { Danmaku } from '../types'

/**
 * 当一个弹幕出现时，记录这个弹幕的时间，如果后续有和这个弹幕一样的出现，且在`timespan`的时间内，
 * 那这条弹幕就直接丢掉了，如果超过了规定的时间，这条弹幕是允许出现的，然后更新时间
 */
export const mergeDanmaku = (list: Danmaku[], timespan: number) => {
    if (timespan < 0) {
        return list
    }

    const mergeContext = list.reduce(
        ([result, cache], danmaku) => {
            const lastAppearTime = cache[danmaku.content]

            if (danmaku.time - lastAppearTime <= timespan) {
                console.log(`[Info] Merged ${danmaku.time}: ${danmaku.content}`)
                return [result, cache]
            }

            cache[danmaku.content] = danmaku.time
            ;(result as Danmaku[]).push(danmaku)
            return [result, cache]
        },
        [[], {}]
    )

    return mergeContext[0] as Danmaku[]
}
