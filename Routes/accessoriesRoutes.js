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
accessoriesRoute.post('/create', async (req, res) => {
    try{
        const newAccessoryData = await AccessoriesModel.create(req.body);
        res.status(201).json({message: "Dog data created successfully", newAccessoryData});
    }catch(error){
        if(error.name === 'ValidationError'){
            res.status(400).json({error: "Invalid data provided", details: error.errors});
        }else{
            console.error("Error creating dog data", error);
            res.status(500).json({error: "Internal server error"});
        }
    }
})
module.exports = accessoriesRoute;