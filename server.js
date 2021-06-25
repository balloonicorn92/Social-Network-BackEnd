const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./routes'))

const connection = mongoose.connect('mongodb://localhost/social-network-backend', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true)

app.listen(PORT, () => console.log(`You are now listening on port ${PORT}`))
