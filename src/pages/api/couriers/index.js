import cors from 'src/utils/cors'
import { BASE_URL } from 'src/utils/constants'
import runMiddleware from 'src/utils/runMiddleware'

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, cors)
    const response = await fetch(`${BASE_URL}/couriers`)
    const responseJSON = await response.json()
    res.json(responseJSON)
  } catch (error) {
    res.json({ status: 'error', message: error })
  }
}
