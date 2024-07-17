import express from 'express'
import connectDB from '~/config/connectDB'
import { env } from '~/config/environment'
import { APIs } from '~/routes'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const app = express()

// --------------------CONNECT MYSQL----------------------
connectDB()
// --------------------CONFIG APP----------------------
app.use(express.json({ limit: '10kb' }))

app.use('/api', APIs)

app.use(errorHandlingMiddleware)
// --------------------START SERVER----------------------
app.listen(env.LOCAL_DEV_APP_PORT, () => {
  console.log(`Hello, I am running at PORT:${env.LOCAL_DEV_APP_PORT}`)
})
