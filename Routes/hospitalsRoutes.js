const express = require('express');
const {HospitalsModel} = require('../Schema/hospitalsSchema')
const {Router} = require('express');
const hospitalsRoute = express.Router();
hospitalsRoute.use(express.json());
hospitalsRoute.get('/read', async(req, res) => {
    try{
        const data = await HospitalsModel.find();
        res.status(200).send({msg: "Data received", data});
    }catch(error){
        console.error("Error fetching dog data", error);
        res.status(500).json({errMsg: "Invalid get request", error})
    }
})
hospitalsRoute.post('/create', async (req, res) => {
    try{
        const newHospitalData = await HospitalsModel.create(req.body);
        console.log("Hospital data created:", newHospitalData);
        res.status(201).json({message: "Dog data created successfully", newHospitalData});
    }catch(error){
        if(error.name === 'ValidationError'){
            res.status(400).json({error: "Invalid data provided", details: error.errors});
        }else{
            console.error("Error creating dog data", error);
            res.status(500).json({error: "Internal server error"});
        }
    }
})
module.exports = hospitalsRoute;