const express = require('express');
const {hospitalsModel} = require('../Schema/accessoriesSchema')
const {Router} = require('express');
const hospitalsRoute = express.Router();
hospitalsRoute.use(express.json());
hospitalsRoute.get('/read', async(req, res) => {
    try{
        const data = await hospitalsModel.find();
        res.status(200).send({msg: "Data received", data});
    }catch(error){
        console.error("Error fetching dog data", error);
        res.status(500).json({errMsg: "Invalid get request", error})
    }
})
module.exports = hospitalsModel;