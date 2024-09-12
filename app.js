import express from 'express'
import axios from 'axios'
import cheero from 'cheero'

const app = express()
const port = 3000

app.listen(port, ()=>{
    console.log('Serveur démarré !!');
})