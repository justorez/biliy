export const assign = (source, ...targets) => {
    for (const target of targets) {
        for (const key of Object.keys(target)) {
            source[key] = target[key]
        }
    }

    return source
}

export const arrayOfLength = (length, defaultValue) => {
    const array = new Array(length)
    for (let i = 0; i < length; i++) {
        array[i] = defaultValue
    }
    return array
}

export const uniqueArray = (array: []) => {
    const duplicates = []
    const result = []

    for (const item of array) {
        if (duplicates.indexOf(item) < 0) {
            duplicates.push(item)
            result.push(item)
        }
    }

    return result
}
