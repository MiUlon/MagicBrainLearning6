import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import { handelRegister } from './Controllers/handelRegister.js';
import { handelProfile } from './Controllers/handelProfile.js';
import { handelImage } from './Controllers/handelImage.js';
import { handelSignin } from './Controllers/handelSignin.js'; 

const postgres = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'test',
        database : 'MagicBrainLearning6'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: "1",
            name: "Mindaugas",
            email: "Mindaugas@gmail.com",
            password: "Mindaugas",
            entries: 0,
            joined: new Date()
        },
        {
            id: "2",
            name: "Mindaugas2",
            email: "Mindaugas2@gmail.com",
            password: "Mindaugas2",
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '01',
            hash: '',
            email: "Mindaugas@gmail.com"
        } 
    ]
};

app.get('/', (req, res) => { res.json(database.users) });
app.post('/signin', (req, res) => { handelSignin(req, res, bcrypt, postgres) });
app.post('/register', (req, res) => { handelRegister(req, res, bcrypt, postgres) });
app.get('/profile/:id', (req, res) => { handelProfile(req, res, postgres) });
app.put('/image', (req, res) => { handelImage(req, res, postgres) });

app.listen(3001, () => {
    console.log('App is working on port 3001.');
});