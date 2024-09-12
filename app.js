import express from 'express'
import axios from 'axios'
import * as cheerio from 'cheerio'

const app = express()
const port = 3000

// Rest of your code...


let processedUrls = []

//Endpoint pour récupérer les images

app.get('/images', async (req, res)=>{
    const siteUrl = req.query.url

    if(!siteUrl){
        return res.status(400).json({error:'Veuillez donner une URL'})
    }

    try{
        const {data} = await axios.get(siteUrl)

        const $ = cheerio.load(data)

        const images = []

        $('img').each((index, element)=>{
            const src = $(element).attr('src')

            if(src){
                images.push(src)
            }
        })

        if(!processedUrls.includes(siteUrl)){
            processedUrls.push(siteUrl)
        }

        return res.json({images})
    }
    catch(err){
        return res.status(500).json({err : 'Impossible de rcupérer les images'})
    }
})

//Endpoint pour récupérer les urls des images traitées

app.get('/urls', (req, res)=>{
    return res.json({processedUrls})
})

app.listen(port, ()=>{
    console.log('Serveur démarré !!');
})