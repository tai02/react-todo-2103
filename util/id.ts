import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890', 10)

export const getId = () => Number(nanoid())
