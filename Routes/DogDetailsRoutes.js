const express = require('express');
const {DogModel} = require('../Schema/dogDetailsSchema')
const {Router} = require('express');
const dogRoute = express.Router();
dogRoute.use(express.json());
dogRoute.get('/read', async(req, res) => {
    try{
        const data = await DogModel.find();
        res.status(200).send({msg: "Data received", data});
    }catch(error){
        console.error("Error fetching dog data", error);
        res.status(500).json({errMsg: "Invalid get request", error})
    }
})

dogRoute.post('/create', async (req, res) => {
    try{
        const newDogData = await DogModel.create(req.body);
        res.status(201).json({message: "Dog data created successfully", newDogData});
    }catch(error){
        if(error.name === 'ValidationError'){
            res.status(400).json({error: "Invalid data provided", details: error.errors});
        }else{
            console.error("Error creating dog data", error);
            res.status(500).json({error: "Internal server error"});
        }
    }
})

dogRoute.put('/update/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const dogDetail = await DogModel.findByIdAndUpdate(id, req.body);
        if(!dogDetail){
            return res.status(404).json({message: "Dog detail not found"});
        }
        const updatedDogData = await DogModel.findByIdAndUpdate(id);
        res.status(200).json(updatedDogData);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = dogRoute;