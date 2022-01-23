const express = require('express');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const prompts = require('./utils/prompts');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());