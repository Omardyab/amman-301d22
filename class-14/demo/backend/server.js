'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json()); // to deal with req.body

const PORT = process.env.PORT;

//connect the express server with mongodb
mongoose.connect('mongodb://localhost:27017/cats', {useNewUrlParser: true, useUnifiedTopology: true});

//create a schema
const kittySchema = new mongoose.Schema({
    catName: String,
    breed: String
});

//create a schema
const ownerSchema = new mongoose.Schema({
    ownerName: String,
    cats: [kittySchema]
}); 

//create a model 
const myCatModel = mongoose.model('Kitten', kittySchema);

//create a model
const myOwnerModel = mongoose.model('owner', ownerSchema);

//data seeding (store data)
function seedKittenCollection (){
    const frankie = new myCatModel({
        catName : 'frankie',
        breed : 'British'
    })

    const sherry = new myCatModel({
        catName : 'sherry',
        breed : 'Baladi'
    })

    // console.log(frankie);
    // console.log(sherry);

    frankie.save();
    sherry.save();
}

// seedKittenCollection();

//data seeding
function seedOwnerCollection (){
    const roaa = new myOwnerModel({
        ownerName : 'roaa',
        cats: [
            {
                catName: 'fluffy',
                breed : 'American'
            },
            {
                catName: 'Mefleh',
                breed : 'Baladi'
            }
        ]

    })

    const ahmad = new myOwnerModel({
        ownerName : 'ahmad',
        cats: [
            {
                catName: 'Meshmesh',
                breed : 'American'
            }
        ]

    })

    roaa.save();
    ahmad.save();
}

// seedOwnerCollection();

app.get('/',homeHandler);
app.get('/cat', getCatsHandler);
app.post('/addCat',addCatHandler); //demo 13
app.delete('/deleteCat/:index',deltedCatHandler);
app.put('/updateCat/:index',updateCatHandler);


function homeHandler(req,res){
    res.send('Home Route');
}

function getCatsHandler(req,res){
    let requestedOwnerName = req.query.name;
    myOwnerModel.find({ownerName:requestedOwnerName},function(err,ownerData){
        if(err){
            console.log('something went wrong');
        }
        else
        {
            // console.log(ownerData[0].cats);
            res.send(ownerData[0].cats);
        }
    })
}
//demo 13
function addCatHandler(req,res) {
    console.log(req.body);
    const {catName,breed,ownerName} = req.body;
    myOwnerModel.find({ownerName:ownerName},(error,ownerData)=>{
        if(error)
        {
            res.send('something went wrong');
        }
        else
        {
            console.log(ownerData[0].cats);
            ownerData[0].cats.push({
                catName:catName,
                breed:breed
            })
            ownerData[0].save();
            res.send(ownerData[0].cats);

        }
    })
}

function deltedCatHandler(req,res){
    const {name} = req.query;
    const index = Number(req.params.index);
    console.log(typeof index);

    myOwnerModel.find({ownerName:name},(err,ownerData)=>{
        if(err)
        {
            console.log('something went wrong');
        }
        else
        {
            const newCatsArr = ownerData[0].cats.filter((cat,idx)=>{
                if(idx !== index)
                {
                    return cat;
                }
            })
            ownerData[0].cats = newCatsArr;
            ownerData[0].save();
            res.send(ownerData[0].cats);
            
        }
    })


}

function updateCatHandler(req,res){
    const {catName,catBreed,ownerName} = req.body;
    const index = Number(req.params.index);
    myOwnerModel.findOne({ownerName:ownerName},(err,ownerData)=>{
        console.log('before splice',ownerData);
        ownerData.cats.splice(index,1,{
            catName:catName,
            breed:catBreed
        })
        console.log('after splice',ownerData);

        ownerData.save();
        res.send(ownerData.cats);
    })

    

}

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})