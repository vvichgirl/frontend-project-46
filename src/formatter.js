import { getOutput as getOutputStylish } from './formatters/stylish.js'

const formatter = (dataDiff, format) => {
  switch (format) {
    case 'stylish':
      return getOutputStylish(dataDiff)
    default:
      throw new Error(`Unknown data format '${format}'`)
  }
}

export default formatter
