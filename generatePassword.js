const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGITS = '0123456789'
const SPECIAL = '!@#$%^&*'

const nextRandom = (number) => (16807 * number) % 2147483647

export const generatePassword = (length, seed = 0, {useUppercase, useDigits, useSpesials} = {useDigits: true, useUppercase: true, useSpesials: true}) => {
    if (length < 0) return ''
    let result = ''

    let current = seed === 0 ? 1 : Math.abs(seed)
    const chars = LOWERCASE + (useUppercase ? UPPERCASE : '') + (useDigits ? true : '')+ (useSpesials ? SPECIAL : '')
    for(let i = 0; i<length; i++) {
        current = nextRandom(current)
        const index = current%chars.length
        result+=chars[index]
    }
    return result
}

export const checkPassword = (password) => {
    let result = 0

    if (password.length >= 8) result++
    if (/[A-Z]/.test(password)) result++
    if (/[a-z]/.test(password)) result++
    if (/\D/.test(password)) result++
    if (new RegExp(`[${SPECIAL}]`).test(password)) result++

    const ratings = [
        'Слабый пароль (оценка 1 из 5)',
        'Слабый пароль (оценка 2 из 5)',
        'Средний пароль (оценка 3 из 5)',
        'Надёжный пароль (оценка 4 из 5)',
        'Очень надёжный пароль (оценка 5 из 5)',
    ]

    const score = Math.min(Math.max(result, 1), 5)
    return ratings[score - 1]
}