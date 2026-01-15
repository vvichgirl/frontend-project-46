const parse = (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data)
    default:
      throw new Error(`Unknown data type '${dataType}'`)
  }
}

export default parse
