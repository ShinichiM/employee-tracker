const express = require('express');
// const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const Prompts = require('./utils/prompts');

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.listen(PORT, () => {
//     console.log('Server is Running');
// });

const prompts = new Prompts;

prompts.initiateQuestion();