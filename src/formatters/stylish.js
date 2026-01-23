const statuses = {
  added: '+',
  removed: '-',
  unchanged: '',
}

export const getOutput = (data) => {
  const result = data.map((diff) => {
    const status = diff['status']
    const indent = status === 'unchanged' ? '   ' : '  '
    const key = diff['key']
    const value = status === 'updated' ? diff['valueOld'] : diff['value']
    const valueNew = diff['valueNew']
    if (diff['status'] === 'updated') {
      return `${indent}${statuses['removed']} ${key}: ${value}\n`
        + `${indent}${statuses['added']} ${key}: ${valueNew}`
    }
    else {
      return `${indent}${statuses[diff['status']]} ${key}: ${value}`
    }
  })

  return `{\n${result.join('\n')}\n}`
}
