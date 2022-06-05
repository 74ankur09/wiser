const express = require("express")
const User = require("../model/user.model")
const profileModel = require("../model/profile.model")
const {presentToday }= require("../model/profile.model")
const auth = require('../middleware/auth')
const profileRouter = express.Router();

const Profile = require("../model/profile.model")
profileRouter.get('/', (req, res) => {

    return new Promise(async(resolve, reject) => {
        try {

        var result = await Promise.all[(profileModel.presentToday())];
        
        console.log(result);
        res.status(200).send();
        
        
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });

})


profileRouter.get('/present', auth, (req, res) => {

    return new Promise(async(resolve, reject) => {
        try {
        var result = await profileModel.presentToday();
        console.log('------------------')
        console.log(result)
        res.status(200).send({ present:result });
        
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });

})

profileRouter.get('/absent', auth, (req, res) => {
    console.log('llllllllllllllllll')
    return new Promise(async(resolve, reject) => {
        try {
            var result = await profileModel.absentToday();
        res.status(200).send({ absent:result });
        
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });

})


profileRouter.get('/halfDay', auth, (req, res) => {
    return new Promise(async(resolve, reject) => {
        try {
        var result = await profileModel.halfDayToday();
        res.status(200).send({ halfDay:result });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });

})


profileRouter.get('/previousMonth/:id', auth, async (req, res) => {

    return new Promise(async(resolve, reject) => {
        try {
            const {id} = req.params;
            if(id){
            var result = await profileModel.previousMonthData(id);
        res.status(200).send({ previousMonthData: result });
            }
            else{
                res.status(404).send({ previousMonthData: result });
            }
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
})


profileRouter.get('/salary/:id', auth, async (req, res) => {

    return new Promise(async(resolve, reject) => {
        try {
            const {id} = req.params;
        var result = await profileModel.salary(id);
        
        console.log(result)
        res.status(200).send({ salary: result });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
})


profileRouter.get('/redFlags', auth, async (req, res) => {

    return new Promise(async(resolve, reject) => {
        try {
        var result = await profileModel.redFlag();
        console.log(result)
        res.status(200).send({  });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
})




profileRouter.post('/addUserInfo', auth, async (req, res) => {

    return new Promise(async(resolve, reject) => {
        var user = new Profile.Profile(req.body);

        user.save().then( async () => {
            
            return res.status(201).send({msg:"saved successfully"});
        }).catch( (e) => {
            console.log('wwwwwwwwwwwwww')
            //console.log(e)
            return res.status(400).send(e);
        }) 
    });
})





module.exports = profileRouter;