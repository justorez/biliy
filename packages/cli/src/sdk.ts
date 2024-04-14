import { ResultPagelist } from './types'
import axios from 'axios'

/**
 * API 参考文档：https://github.com/SocialSisterYi/bilibili-API-collect/
 */
export class Biliy {
    bv2aid(bvid: string) {
        const XOR_CODE = 23442827791579n
        const MASK_CODE = 2251799813685247n
        const BASE = 58n
        const CHAR_TABLE =
            'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf'
        const bvidArr = Array.from(bvid)
        ;[bvidArr[3], bvidArr[9]] = [bvidArr[9], bvidArr[3]]
        ;[bvidArr[4], bvidArr[7]] = [bvidArr[7], bvidArr[4]]
        bvidArr.splice(0, 3)
        const tmp = bvidArr.reduce(
            (pre, bvidChar) =>
                pre * BASE + BigInt(CHAR_TABLE.indexOf(bvidChar)),
            0n
        )
        return Number((tmp & MASK_CODE) ^ XOR_CODE)
    }

    async pagelist(bvid: string) {
        const url = `https://api.bilibili.com/x/player/pagelist?bvid=${bvid}`
        const res = await axios.get<ResultPagelist>(url)
        return res.data.data
    }

    async danmaku(input: string) {
        const bv = input.match(/BV[0-9a-zA-Z]{10}/)?.[0]
        if (!bv) {
            console.error('invalid bvid')
            return
        }

        const pagelist = await this.pagelist(bv)
        const promises = pagelist.map(async (p) => {
            const res = await axios.get<string>(
                `https://comment.bilibili.com/${p.cid}.xml`,
                {
                    responseType: 'text'
                }
            )
            return {
                title: p.part.trim(),
                xml: res.data,
                dimension: p.dimension
            }
        })
        return Promise.all(promises)
    }
}

export default new Biliy()
