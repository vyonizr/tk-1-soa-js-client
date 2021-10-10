import { BASE_URL } from 'src/utils/constants'
import cors from 'src/utils/cors'
import runMiddleware from 'src/utils/runMiddleware'


export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, cors)
    const response = await fetch(`${BASE_URL}/users/topup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
    const responseJSON = await response.json()
    res.json(responseJSON)
  } catch (error) {
    res.json({ status: 'error', message: error })
  }
}