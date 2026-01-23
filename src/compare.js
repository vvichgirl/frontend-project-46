const compare = (keys, map1, map2) => {
  const result = keys.reduce((acc, key) => {
    const value1 = map1[key]
    const value2 = map2[key]

    const mapComparison = new Object()
    mapComparison.key = key

    if (!Object.hasOwn(map1, key)) {
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
