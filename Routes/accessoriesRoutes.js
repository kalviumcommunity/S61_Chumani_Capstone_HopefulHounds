const express = require('express');
const {AccessoriesModel} = require('../Schema/accessoriesSchema')
const {Router} = require('express');
const accessoriesRoute = express.Router();
accessoriesRoute.use(express.json());
accessoriesRoute.get('/read', async(req, res) => {
    try{
        const data = await AccessoriesModel.find();
        res.status(200).send({msg: "Data received", data});
    }catch(error){
        console.error("Error fetching dog data", error);
        res.status(500).json({errMsg: "Invalid get request", error})
    }
})
module.exports = accessoriesRoute;