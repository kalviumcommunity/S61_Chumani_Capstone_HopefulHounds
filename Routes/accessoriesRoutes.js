const express = require('express');
const {AccessoriesModel} = require('../Schema/accessoriesSchema')
const {Router} = require('express');
const accessoriesRoute = express.Router();
accessoriesRoute.use(express.json());

const validateAccessoryData = (req, res, next) => {
    const {image_links} = req.body;
    if(!image_links || !Array.isArray(image_links) || image_links.length === 0){
        return res.status(400).json({error: "Invalid accessory data. 'image_links' field is required and should be a non-empty array."})
    }
    next();
}

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
        console.log("Accessory data created:", newAccessoryData);
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

accessoriesRoute.put("/update/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const accessory = await AccessoriesModel.findByIdAndUpdate(id, req.body);
        if(!accessory){
            return res.status(404).json({message: "Accessory not found"});
        }
        res.status(200).json(updatedAccessory);
    }catch(error){
        res.status(500).json({message : error.message});
    }
})

module.exports = accessoriesRoute;