const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '12345678',
    database : 'ridego'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res)=> {
  res.send('it is working');
})



app.post('/schoolform', (req,res) => {
   const { poc, phoneno, address, schoolname } = req.body;
    db('school')
         .returning('*')
         .insert({
            personofcontact: poc,
            phoneno: phoneno,
            address: address,
            schoolname: schoolname
          })
          .then(user => {
            res.json(user[0]);
          })
    })
app.post('/intern', (req,res) => {
   const { position, phoneno, year, collegename, name, exp } = req.body;
    db('intern')
         .returning('*')
         .insert({
            position: position,
            phoneno: phoneno,
            year: year,
            collegename: collegename,
            name: name,
            exp: exp
          })
          .then(user => {
            res.json(user[0]);
          })
    })
    


app.listen(3000, () => {
	console.log('i am listening');
})

