import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import { handelRegister } from './Controllers/handelRegister.js';
import { handelProfile } from './Controllers/handelProfile.js';
import { handelImage, handleApiCall } from './Controllers/handelImage.js';
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

app.get('/', (req, res) => { res.json(database.users) });
app.post('/signin', (req, res) => { handelSignin(req, res, bcrypt, postgres) });
app.post('/register', (req, res) => { handelRegister(req, res, bcrypt, postgres) });
app.get('/profile/:id', (req, res) => { handelProfile(req, res, postgres) });
app.put('/image', (req, res) => { handelImage(req, res, postgres) });
app.post('/imageurl', (req, res) => { handleApiCall(req, res) });

app.listen(3001, () => {
    console.log('App is working on port 3001.');
});