// const { response } = require('express');
const { request } = require('express');
const express = require('express');
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModel')

router.post('/signup', (request,response)=>{
    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        username:request.body.username,
        email:request.body.email,
        password:request.body.password
    })
    signedUpUser.save()
    .then(data=>{
        response.json(data)
    })
    .catch(err=>{
        response.json(err)
    })
})

module.exports = router