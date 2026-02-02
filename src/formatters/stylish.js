const statuses = {
  added: '+',
  removed: '-',
  unchanged: ' ',
}

const indentSize = 4
const getIndent = depth => ' '.repeat(indentSize * depth - 2)

const getString = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return String(data)
  }

  const indent = getIndent(depth + 1)
  const entries = Object.entries(data)
    .map(([key, value]) => `${indent}  ${key}: ${getString(value, depth + 1)}`)
    .join('\n')
  return `{\n${entries}\n${getIndent(depth)}  }`
}

const getResult = (data, depth = 1) => {
  const result = data.map((diff) => {
    const status = diff['status']
    const indent = getIndent(depth)
    const key = diff['key']
    const value = status === 'updated' ? getString(diff['valueOld'], depth) : getString(diff['value'], depth)
    const valueNew = getString(diff['valueNew'], depth)

    if (status === 'object') {
      return `${indent}  ${key}: {\n${getResult(diff.value, depth + 1)}\n${indent}  }`
    }
    if (status === 'updated') {
      return `${indent}${statuses['removed']} ${key}: ${value}\n`
        + `${indent}${statuses['added']} ${key}: ${valueNew}`
    }
    else {
      return `${indent}${statuses[status]} ${key}: ${value}`
    }
  })

  return result.join('\n')
}

export const getOutput = (data, depth = 1) => {
  return `{\n${getResult(data, depth)}\n}`
}
