const express = require("express")
const User = require("../model/user.model")
const auth = require('../middleware/auth')

const userRouter = express.Router();


userRouter.get('/',async(req,res)=>{
    console.log('ffffffff')
    return res.status(201).send({});
})
userRouter.post('/signup', async (req,res) => {
    console.log(req.body)
    var user = new User(req.body);

    //console.log(user);

    const okSave = await user.qualifySave();

    //console.log(okSave)
    console.log(okSave)
    if (!okSave.ok) {
        return res.status(400).send({ error: okSave.error });
    }

    console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjj')
    user.save().then( async () => {
        console.log('llllllllllllll')
        const token = await user.generateAuthToken();
        //console.log(user)
        console.log('jjjjjjjjjj')
        console.log('ppppppppppppppppp')
        res.cookie('authToken', token, {
            sameSite: 'strict',
            maxAge: 14000000
        });
        return res.status(201).send({user, token});
    }).catch( (e) => {
        console.log('wwwwwwwwwwwwww')
        //console.log(e)
        return res.status(400).send(e);
    })

})

userRouter.post('/login', (req,res) => {
    console.log(req.body);

    User.findByCredentials(req.body.email, req.body.password).then(async (returnVal) => {
        console.log('findby');
        if (returnVal.user == null) {

            return res.status(400).send(returnVal);
        }
        console.log('findby');
        const user = returnVal.user;

        const token = await user.generateAuthToken();
        console.log(user)
        // console.log('error ankur')
        res.cookie('authToken', token, {
            sameSite: 'strict',
            maxAge: 14000000,
        });
        return res.status(200).send({user, token});
    }).catch((e) => {
        return res.status(400).send(e.toString());
    })

})


userRouter.get('/logout', auth, async (req,res) => {
    //console.log(req.user)
    try {

        await req.user.save();
        res.clearCookie('authToken', {path:'/user'});
        res.redirect("/user");
    } catch (e) {
        res.status(500).send(e.toString());
    }
})

module.exports = userRouter;
