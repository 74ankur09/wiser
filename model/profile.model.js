const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { relative } = require("path");

const Schema = mongoose.Schema;


const profileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    halfDays:{
        type: Number,
        required: true,
        default:0
    },
    previouMonthPresent:{
        type: Number,
        required: true,
    },
    previouMonthAbsent:{
        type: Number,
        required: true,
    },
    numberOfPresents:{
        type: Number,
        required: true,
    },
    numberOfleaves:{
        type: Number,
        required: true,
    },
    attendance:{
        type: String,
        required: true
    },
    
}, {
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema);


const presentToday = () => {
    return new Promise((resolve, reject) => {
        console.log('ppppppppppp')
        Profile.find({ attendance: 'present'}, function (err, result) {
            if (err){
                console.log('oooooooooooooooooo')
                console.log(err);
                reject(err);
            }
            else{
                console.log('ankur jain')
                console.log("First function call : ", result);
                resolve(result);
            }
        });     
    });
};


// {
//         "name": "Ankur JAin",
//     "halfDays":"6",
//     "previouMonthPresent":"20",
//     "previouMonthAbsent":"8",
//     "numberOfPresents":"19",
//     "numberOfleaves":"1",
//     "attendance":"present"
// }

// {
    // "name":"ANkurj Jain",
    // "username":"7mfsdmmscnnkpwjr09",
    // "password":"ankur wjain",
    // "email":"74akdmjjss9c@gmail.com"
    // }
    

const absentToday = () => {
    return new Promise((resolve, reject) => {
        Profile.find({ attendance: 'absent'}, function (err, result) {
            if (err){
                console.log(err);
                reject(err);
            }
            else{
                console.log("First function call : ", result);
                resolve(result);
            }
        });     
    });
};


const halfDayToday = () => {
    return new Promise((resolve, reject) => {
        Profile.find({ attendance: 'half day'}, function (err, result) {
            if (err){
                console.log(err);
                reject(err);
            }
            else{
                console.log("First function call : ", result);
                resolve(result);
            }
        });     
    });
};


const previousMonthData = (id) => {
    return new Promise((resolve, reject) => {
        Profile.find({ id: id}, function (err, result) {
            if (err){
                console.log(err);
                reject(err);
            }
            else{
                console.log("First function call : ", result);
                resolve(result);
            }
        });     
    });
};

const salary = (id) => {
    return new Promise((resolve, reject) => {

        Profile.find({ _id: id}, function (err, result) {
            if (err){
                console.log(err);
                reject(err);
            }
            else{
                console.log("First function call : ", result);
                var totalDays = result[0].halfDays/2+result[0].numberOfPresents;
                if(result[0].numberOfleaves>3){
                    totalDays = totalDays- result[0].numberOfleaves - 3
                }
                const salary = totalDays*500;
                resolve(salary);
            }
        });     
    });
};



const redFlag = () => {
    return new Promise((resolve, reject) => {
        Profile.find({numberOfleaves: { $gte: 7} }, function (err, result) {
            if (err){
                console.log(err);
                reject(err);
            }
            else{
                resolve(result);
            }
        });     
    });
};




module.exports = {
    Profile,
    presentToday,
    halfDayToday,
    absentToday,
    previousMonthData,
    salary,
    redFlag
 }



