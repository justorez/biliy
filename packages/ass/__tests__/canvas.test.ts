import { measureTextWidth } from '../src/util/layout'
import { it, assert, assertType } from 'vitest'

it('canvas measureTextWidth', () => {
    const text = '一段测试文字'
    const width = measureTextWidth('SimHei', 25, false, text)
    assertType<number>(width)
    assert(width >= 25 * text.length)
})
