export const APP_NAME = 'TechLab Challenge 2024 3q Backend'

const APP_PORT_PROCESS_ARG: string | undefined = process.argv.find((arg, index, args) => (args[index - 1] === '--port' || args[index - 1] === '-p'))

if (APP_PORT_PROCESS_ARG && Number.isInteger(Number(APP_PORT_PROCESS_ARG))) process.env.APP_PORT = APP_PORT_PROCESS_ARG

if (!process.env.APP_PORT) throw TypeError('APP_PORT must be defined')

export const APP_PORT = Number(process.env.APP_PORT)

if (!Number.isInteger(APP_PORT)) throw TypeError('APP_PORT must be an integer')

if (!process.env.SECRET) throw TypeError('SECRET must be defined')

export const SECRET = process.env.SECRET
