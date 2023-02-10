const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const pinRoute = require('./routes/pins')
const usersRoute = require('./routes/users')

app.use(express.json());

async function main() {
    await mongoose.connect('mongodb+srv://rafaelgh:46986414Zx@cluster0.omsiz.mongodb.net/travelMap');
    console.log('mongodb connected');
}
app.use(cors({
    origin: 'http://127.0.0.1:5173'
}));
app.use('/api/pins', pinRoute);
app.use('/api/users', usersRoute);

app.listen(8800, () => {
    console.log('server is running');
    main().catch(err => console.log(err));
});