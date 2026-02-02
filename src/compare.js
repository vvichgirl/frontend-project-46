const getSortedKeys = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const keysAll = [...new Set([...keys1, ...keys2])].sort()

  return keysAll
}

const compare = (map1, map2) => {
  const keys = getSortedKeys(map1, map2)

  const result = keys.reduce((acc, key) => {
    const value1 = map1[key]
    const value2 = map2[key]

    const mapComparison = new Object()
    mapComparison.key = key

    if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
      mapComparison.status = 'object'
      mapComparison.value = compare(value1, value2)
    }
    else if (!Object.hasOwn(map1, key)) {
      mapComparison.status = 'added'
      mapComparison.value = value2
    }
    else if (!Object.hasOwn(map2, key)) {
      mapComparison.status = 'removed'
      mapComparison.value = value1
    }
    else if (JSON.stringify(value1) === JSON.stringify(value2)) {
      mapComparison.status = 'unchanged'
      mapComparison.value = value1
    }
    else {
      mapComparison.status = 'updated'
      mapComparison.valueOld = value1
      mapComparison.valueNew = value2
    }

    acc.push(mapComparison)

    return acc
  }, [])

  return result
}

export default compare
