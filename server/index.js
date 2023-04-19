const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const{getWarrants, createWarrant, deleteWarrant,updateWarrant} = require('./controller')

app.get('/api/mostwanted', getWarrants)
app.post('/api/mostwanted', createWarrant)
app.delete('/api/mostwanted/:id', deleteWarrant)
app.put('/api/mostwanted/:id', updateWarrant)

app.listen(5000, () => console.log('Hope it works'))