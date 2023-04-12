const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const{getAllwarrants, createWarrant, deleteWarrant,updateWarrant} = require('./controller')

app.get('/api/MostWanted', getAllwarrants)
app.post('/api/MostWanted', createWarrant)
app.put('/api/MostWanted:id', updateWarrant)
app.delete('/api/MostWanted/:id', deleteWarrant)

app.listen(5000, () => console.log('Hope it works'))

