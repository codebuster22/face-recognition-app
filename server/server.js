const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt-nodejs');
const db = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '2522',
        database : 'smart-brain'
    }
});

const saltRounds = 10;
let salt;
bcrypt.genSalt(saltRounds,(err,_salt)=>{
    salt = _salt;
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json("this is working");

});

app.post("/signin",(req,res)=> {
    const {email, password} = req.body;
    db('login').where('email','=',email).select('*').then(data=>{
        bcrypt.compare(password, data[0].hash, function(err, result) {
            if(result){
                db.select('*').from('users').where('email','=',email)
                    .then(user=>{
                        res.json({
                            "Status": "User Found",
                            "user": user[0],
                        })
                    })
                    .catch(err=>{
                        res.json({
                            "Status": "Error",
                            "Error": err,
                        })
                    })
            } else if(!result){
                res.status(400).json({
                    "Status": "Invalid Credentials",
                    "Error": "Wrong",
                })
            } else if(err){
                res.status(400).json({
                    "Status": "Error Occured",
                    "Error": err
                })
            }
        });
    }).catch(err=>{
        res.status(400).json({
            "Status": "User not found",
            "Error": err,
        })
    });
});

app.post("/register",(req,res)=> {
    const {name, email, password} = req.body;
    db.transaction(trx=>{
        bcrypt.hash(password, salt,()=>{},(err,_hash)=>{
            trx('login').returning('email').insert({
                email: email,
                hash: _hash
            }).then(loginEmail=>{
                db('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        datejoined: new Date()
                    })
                    .then(data=>{
                        res.json({
                            "Status": "User Added",
                            "user": data[0],
                        })
                    })
                    .catch(err=>{
                        res.status(400).json({
                            "Status": "Error While registering",
                            "Error": err,
                        })
                    })
            }).then(trx.commit)
                .catch(trx.rollback);
        });
    });
});

app.get("/profile/:id",(req, res)=> {
    const {id} = req.params;
    db('users').where({userid:id}).select('*')
        .then(user=> {
        if(user.length){
            res.json({
                "Status": "User Fetched",
                "user": user[0],
            })
        }else {
            res.status(400).json({
                "Status": "User Not Found",
                "user": {},
            })
        }})
        .catch(err=> {
            res.status(400).json({
                "Status": "Error",
                "Error": err,
            })
        });
});

app.put("/image",(req,res) => {
    const {id} = req.body;
    db('users').where('userid', '=', id).increment('nonce',1).returning('nonce')
        .then(nonce=> {
            if(nonce.length){
                res.json({
                    "Status": "Nonce Updated",
                    "nonce": nonce[0],
                })
            }else {
                res.json({
                    "Status": "User not found",
                    "nonce": [],
                })
            }
        })
        .catch(err=>{
            res.status(400).json({
                "Status": "Error",
                "Error": err,
            })
        });
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
});

