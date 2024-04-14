import { test, expect, describe } from 'vitest'
import { biliy } from '../src/sdk'

describe('Test biliy sdk', () => {
    test('bvid to avid', () => {
        const aid = biliy.bv2aid('BV1eW4y1W72d')
        expect(aid).toBe(945416623)
    })

    test('get video pagelist', async () => {
        const res = await biliy.pagelist('BV1eW4y1W72d')
        expect(res[0]).toHaveProperty('cid')
        expect(res[0]).toHaveProperty('part')
    })

    test('get video danmaku', async () => {
        try {
            const res = await biliy.danmaku('BV1eW4y1W72d')
            expect(res).not.toBeUndefined()
            if (res) {
                expect(res[0].xml).toContain(
                    '<?xml version="1.0" encoding="UTF-8"?>'
                )
            }
        } catch (error) {
            console.error(error)
        }
    })
})
