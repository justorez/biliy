import parseXML from 'xml-parser'
import { Danmaku, DanmakuType, FontSize } from '../types'
import { decimalColorToRGB } from '../util/index'

// Bilibili的弹幕XML结构如下：
//
// ```xml
// <?xml version="1.0" encoding="UTF-8"?>
// <i>
//     <chatserver>chat.bilibili.com</chatserver>
//     <chatid>747601</chatid>
//     <mission>0</mission>
//     <maxlimit>3000</maxlimit>
//     <max_count>3000</max_count>
//     <d p="42.442,4,25,65280,1430559225,0,ff5d0daf,886337510">WTF?</d>
//     ...
// </i>
// ```
//
// 其中每个`<d>`节点是一条弹幕，`p`属性是弹幕的信息，节点内容是弹幕的内容。`p`属性以逗号分隔分别为以下属性：
//
// 1. 弹幕发送时间，相对于视频开始时间，以秒为单位
// 2. 弹幕类型，1-3为滚动弹幕、4为底部、5为顶端、6为逆向、7为精确、8为高级
// 3. 字体大小，25为中，18为小，当前Bilibili只有这2个字号
// 4. 弹幕颜色，RGB颜色转为十进制后的值
// 5. 弹幕发送时间
// 6. 弹幕池，0为普通，1为字幕，2为特殊
// 7. 发送人的cid
// 8. 弹幕id
//
// 转换时只需要使用前4项即可

const DANMAKU_TYPE_MAPPING = {
    1: DanmakuType.SCROLL,
    2: DanmakuType.SCROLL,
    3: DanmakuType.SCROLL,
    4: DanmakuType.TOP,
    5: DanmakuType.BOTTOM
}

const FONT_SIZE_MAPPING = {
    18: FontSize.SMALL,
    25: FontSize.NORMAL
}

const nodeToDanmaku = (node: parseXML.Node) => {
    const [time, type, fontSize, color] = node.attributes.p.split(',')
    const danmaku = {
        time: parseFloat(time),
        type: DANMAKU_TYPE_MAPPING[type],
        fontSizeType:
            fontSize in FONT_SIZE_MAPPING
                ? FONT_SIZE_MAPPING[fontSize]
                : FontSize.NORMAL,
        color: decimalColorToRGB(Number(color)),
        content: node.content
    }

    if (!danmaku.content) {
        console.warn(`[Warn] Dropped empty danmaku at ${danmaku.time}`)
        return
    }

    if (danmaku.type) {
        return danmaku
    }

    console.warn(
        `[Warn] Dropped unsupported ${danmaku.time}: ${danmaku.content}`
    )
}

export default function parse(text: string) {
    const xml = parseXML(text)
    const comments = xml.root.children
        .filter((node) => node.name === 'd')
        .map((node) => nodeToDanmaku(node))
        .filter((dm) => dm)
    return { list: comments } as { list: Danmaku[] }
}
