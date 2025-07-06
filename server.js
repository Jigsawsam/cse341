const express = require('express')
const mongodb = require(`./data/database`)
const app = express();

const  port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDB((err) => {
    if(err){
        console.log(err);
    }
    else{
        app.listen (port, '0.0.0.0', () => {
            console.log(`Database is listening and node running on port ${port} | http://localhost:${port}/`);
        });
    }
});


