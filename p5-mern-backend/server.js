import express from 'express'
import mongoose from 'mongoose'
import Messages from './models/Messages.js'
import Pusher from 'pusher'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8000


const pusher = new Pusher({
  appId: "1509693",
  key: "a68439674bd6a6dc8d52",
  secret: "8def2897bcd19ed95956",
  cluster: "ap1",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

app.use(express.json())
app.use(cors())


const connection_url = `mongodb+srv://levin:rMD4ctvowN1eXKvc@cluster0.kxieist.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(connection_url, {
    useNewUrlParser: true, useUnifiedTopology: true,
})

const db = mongoose.connection

db.once('open', () => {
    console.log('DB connected')
    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        console.log(change);
        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message, 
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else {
            console.log('Error Pusher')
        }

    })
});

app.get('/', (request, response) => response.status(200).send('Hello World'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }else {
            res.status(200).send(data)
        }
    })
})


app.post('/messages/new', (req, res) => {
    let dbMessage =  req.body
    
    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else {
            res.status(201).send(data)
        }
    })
})


app.listen(port, () => console.log(`Listening on localhost: ${port}`));