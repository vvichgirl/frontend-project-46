import path from 'node:path'
import { dirname } from 'path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'url'
import { expect, test, beforeAll } from '@jest/globals'
import gendiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

let resultStylish = ''

beforeAll(() => {
  resultStylish = readFile('resultStylish.txt')
})

test('json stylish format', () => {
  const path1 = getFixturePath('file1.json')
  const path2 = getFixturePath('file2.json')
  const actual = gendiff(path1, path2, 'stylish')
  expect(actual).toEqual(resultStylish)
})

test('yaml stylish format', () => {
  const path1 = getFixturePath('file1.yaml')
  const path2 = getFixturePath('file2.yaml')
  const actual = gendiff(path1, path2, 'stylish')
  expect(actual).toEqual(resultStylish)
})
