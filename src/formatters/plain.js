import { sprintf } from 'sprintf-js'

const templates = {
  added: 'Property \'%s\' was added with value: %s',
  removed: 'Property \'%s\' was removed',
  updated: 'Property \'%s\' was updated. From %s to %s',
}

const getValueFormatted = (value) => {
  switch (typeof value) {
    case 'object': {
      return !value ? 'null' : '[complex value]'
    }
    case 'string': {
      return `'${value}'`
    }
    default: {
      return String(value)
    }
  }
}

export const getOutput = (data, parent = '', depth = 1) => {
  const result = data
    .filter(diff => diff['status'] !== 'unchanged')
    .map((diff) => {
      const status = diff['status']
      const template = templates[status]
      const key = parent ? `${parent}.${diff['key']}` : diff['key']
      const value = status === 'updated' ? getValueFormatted(diff['valueOld'], depth) : getValueFormatted(diff['value'], depth)
      const valueNew = getValueFormatted(diff['valueNew'], depth)
      if (status === 'object') {
        return getOutput(diff.value, key, depth + 1)
      }
      return sprintf(template, key, value, valueNew)
    })

  return result.join('\n')
}
