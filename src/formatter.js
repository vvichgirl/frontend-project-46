import { getOutput as getOutputStylish } from './formatters/stylish.js'
import { getOutput as getOutputPlain } from './formatters/plain.js'

const formatter = (dataDiff, format) => {
  switch (format) {
    case 'stylish':
      return getOutputStylish(dataDiff)
    case 'plain':
      return getOutputPlain(dataDiff)
    case 'json':
      return JSON.stringify(dataDiff)
    default:
      throw new Error(`Unknown data format '${format}'`)
  }
}

export default formatter
