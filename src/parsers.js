import yaml from 'js-yaml'

const parse = (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data)
    case 'yaml':
      return yaml.load(data)
    case 'yml':
      return yaml.load(data)
    default:
      throw new Error(`Unknown data type '${dataType}'`)
  }
}

export default parse
