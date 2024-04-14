import { formatColor, getDecoratingColor, isWhite } from '../util'
import { DanmakuType } from '../types'
// Dialogue: 0,0:00:00.00,0:00:08.00,R2L,,20,20,2,,{\move(622.5,25,-62.5,25)}标准小裤裤
// Dialogue: 0,0:00:08.35,0:00:12.35,Fix,,20,20,2,,{\pos(280,50)\c&HEAA000}没男主吗

const formatTime = (seconds: number) => {
    const div = (i: number, j: number) => Math.floor(i / j)
    const pad = (n: number) => (n < 10 ? '0' + n : '' + n)

    const integer = Math.floor(seconds)
    const hour = div(integer, 60 * 60)
    const minute = div(integer, 60) % 60
    const second = integer % 60
    const minorSecond = Math.floor((seconds - integer) * 100) // 取小数部分2位

    return `${hour}:${pad(minute)}:${pad(second)}.${minorSecond}`
}

const encode = (text) =>
    text.replace(/\{/g, '｛').replace(/\}/g, '｝').replace(/\r|\n/g, '')

const scrollCommand = ({ start, end, top }) =>
    `\\move(${start},${top},${end},${top})`
const fixCommand = ({ top, left }) => `\\an8\\pos(${left},${top})`
const colorCommand = (color) => `\\c${formatColor(color)}`
const borderColorCommand = (color) => `\\3c${formatColor(color)}`

export default (danmaku, config) => {
    const { fontSizeType, content, time } = danmaku
    const { scrollTime, fixTime } = config

    const commands = [
        danmaku.type === DanmakuType.SCROLL
            ? scrollCommand(danmaku)
            : fixCommand(danmaku),
        // 所有网站的原始默认色是白色，所以白色的时候不用额外加和颜色相关的指令
        isWhite(danmaku.color) ? '' : colorCommand(danmaku.color),
        isWhite(danmaku.color)
            ? ''
            : borderColorCommand(getDecoratingColor(danmaku.color))
    ]
    const fields = [
        0, // Layer,
        formatTime(time), // Start
        formatTime(
            time + (danmaku.type === DanmakuType.SCROLL ? scrollTime : fixTime)
        ), // End
        'F' + fontSizeType, // Style
        '', // Name
        '0000', // MarginL
        '0000', // MarginR
        '0000', // MarginV
        '', // Effect
        '{' + commands.join('') + '}' + encode(content) // Text
    ]

    return 'Dialogue: ' + fields.join(',')
}
