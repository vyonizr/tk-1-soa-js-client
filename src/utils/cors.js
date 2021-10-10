import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'POST', 'PUT'],
})

export default cors