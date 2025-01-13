import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number
    DATABASE_URL: string
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),      //
})
.unknown(true)          // mas variables de entorno permitidas de la app


const { error, value } = envsSchema.validate( process.env )

if( error ) {
    throw new Error(`Config validation error: ${ error.message }`)
}

const envVars: EnvVars = value              // agregamos el tipado    envVars.PORT

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
}







