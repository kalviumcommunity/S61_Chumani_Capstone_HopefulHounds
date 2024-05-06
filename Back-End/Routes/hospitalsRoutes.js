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
        res.status(201).json({message: "hospital data created successfully", newHospitalData});
    }catch(error){
        if(error.name === 'ValidationError'){
            res.status(400).json({error: "Invalid data provided", details: error.errors});
        }else{
            console.error("Error creating dog data", error);
            res.status(500).json({error: "Internal server error"});
        }
    }
})

hospitalsRoute.put('/update/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const hospital = await HospitalsModel.findByIdAndUpdate(id, req.body);
        if(!hospital){
            return res.status(404).json({message: "Hospital not found"});
        }
        const updatedHospital = await HospitalsModel.findByIdAndUpdate(id);
        res.status(200).json(updatedHospital);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})
module.exports = hospitalsRoute;