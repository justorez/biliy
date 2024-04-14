import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import convert from '../src'

const __dirname = dirname(fileURLToPath(import.meta.url))

const filename = '898651903.xml'
const xmlPath = path.join(__dirname, filename)
const xmlText = fs.readFileSync(xmlPath, 'utf-8')
const assText = convert(xmlText, { filename, title: '我的忏悔' })
fs.writeFileSync(path.join(__dirname, `${filename}.ass`), assText, 'utf-8')
