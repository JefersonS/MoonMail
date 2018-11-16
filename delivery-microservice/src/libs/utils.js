import { deflateSync, unzipSync } from 'zlib'

export const deflateToBase = (input, stringify = true) => {
    let newInput = input
    if (stringify) newInput = JSON.stringify(input)
    const deflate = deflateSync(newInput)
    return deflate.toString('base64')
}

export const unzipFromBase = (input, parse = true) => {
    const buffer = Buffer.from(input, 'base64')
    let unzipped = unzipSync(buffer)
    if (parse) unzipped = JSON.parse(unzipped)
    else unzipped = unzipped.toString()
    return unzipped
}

export function customError(name, message) {
    this.name = name;
    this.message = message;
}
customError.prototype = new Error();