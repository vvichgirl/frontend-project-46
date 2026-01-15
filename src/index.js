import { readFileSync } from 'node:fs'
import path from 'node:path'
import parse from './parser.js'

const getPath = filepath => path.resolve(process.cwd(), filepath)

const getFileExtension = filename => path.extname(filename).slice(1)

const readFile = (filepath) => {
  const path = getPath(filepath)
  return readFileSync(path, 'utf-8')
}

const gendiff = (filepath1, filepath2, format) => {
  const fileData1 = readFile(filepath1)
  const fileData2 = readFile(filepath2)

  const ext1 = getFileExtension(filepath1)
  const ext2 = getFileExtension(filepath2)

  const data1 = parse(fileData1, ext1)
  const data2 = parse(fileData2, ext2)
}

export default gendiff
