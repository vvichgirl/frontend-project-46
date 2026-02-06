import path from 'node:path'
import { dirname } from 'path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'url'
import { expect, test, beforeAll, describe } from '@jest/globals'
import gendiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

let results = {}

beforeAll(() => {
  results = {
    default: readFile('resultStylish.txt'),
    stylish: readFile('resultStylish.txt'),
    plain: readFile('resultPlain.txt'),
  }
})

const formats = ['default', 'stylish', 'plain']
const extensions = ['json', 'yaml']

describe.each(formats)('test %s format', (format) => {
  test.each(extensions)(`test %s file`, (ext) => {
    const path1 = getFixturePath(`file1.${ext}`)
    const path2 = getFixturePath(`file2.${ext}`)

    const actual = format === 'default' ? gendiff(path1, path2) : gendiff(path1, path2, format)

    expect(actual).toEqual(results[format])
  })
})
