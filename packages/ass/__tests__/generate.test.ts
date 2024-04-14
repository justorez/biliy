import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { generateASS } from '../src'
import { it } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))

it('generate ass from xml', () => {
    const filename = '898651903.xml'
    const xmlPath = path.join(__dirname, filename)
    const xmlText = fs.readFileSync(xmlPath, 'utf-8')
    const assText = generateASS(xmlText, { filename, title: '我的忏悔' })
    fs.writeFileSync(path.join(__dirname, `${filename}.ass`), assText, 'utf-8')
})
