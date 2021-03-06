const router = require('express').Router()
const mongoose = require('mongoose')

const aruModel = mongoose.model('aru')
const userModel = mongoose.model('user')

const passport = require('passport')

router.route('/arukereso/:id?').get((req, res) => {
    if (!req.params.id) {
        aruModel.find((err, aruk) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            return res.status(200).send(aruk)
        })
    } else {
        aruModel.findOne({ nev: req.params.id }, (err, aru) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (!aru) return res.status(400).send('Nincs ilyen aru!')
            return res.status(200).send(aru)
        })
    }
}).post((req, res) => {
    if(req.user){
        if(req.user.accessLevel=="Admin"){
            if (!req.params.id || !req.body.ar) {
                return res.status(400).send("Hiányos input!")
            } else {
                aruModel.findOne({ nev: req.params.id }, (err, aru) => {
                    if (err) return res.status(500).send('DB hiba ' + err)
                    if (aru) return res.status(400).send('mar van ilyen')
                    const nAru = new aruModel({
                        nev: req.params.id,
                        ar: req.body.ar
                    })
                    nAru.save((error) => {
                        if (error) return res.status(500).send('DB hiba a betöltés során ' + error)
                        return res.status(200).send(req.body)
                    })
                })
            }
        }else{
            return res.status(400).send('nincs jogosultságod')
        }
    }else{
        return res.status(400).send('nem vagy belépve')
    }
}).put((req, res) => {
    if(req.user){
        if(req.user.accessLevel=="Admin"){
            if (!req.params.id || (!req.body.ar)) {
                return res.status(400).send("Hiányos input!")
            } else {
                aruModel.findOne({ nev: req.params.id }, (err, aru) => {
                    if (err) return res.status(500).send('DB hiba ' + err)
                    if (!aru) return res.status(400).send('Még nincs ilyen áru')
                    if (req.body.ar) aru.ar = req.body.ar
                    aru.save((error) => {
                        if (error) return res.status(500).send('DB hiba a betöltés során ' + error)
                        return res.status(200).send(aru)
                    })
                })
            }
        }else{
            return res.status(400).send('nincs jogosultságod')
        }
    }else{
        return res.status(400).send('nem vagy belépve')
    }
}).delete((req, res) => {
    if(req.user){
        if(req.user.accessLevel=="Admin"){
            if (!req.params.id) {
                aruModel.deleteMany((err) => {
                    if (err) return res.status(500).send('DB hiba ' + err)
                    return res.status(200).send('Törölve minden')
                })
            } else {
                aruModel.deleteOne({ nev: req.params.id }, (err) => {
                    if (err) return res.status(500).send('DB hiba ' + err)
                    return res.status(200).send('Aru torolve (feltéve ha volt)')
                })
            }
        }else{
            return res.status(400).send('nincs jogosultságod')
        }
    }else{
    return res.status(400).send('nem vagy belépve')
    }
})
router.route('/userscart/:id?').post((req, res) => {
    if (!req.params.id || !req.body.item) {
        return res.status(400).send("Hiányos input!")
    } else {
            userModel.updateOne(
            {username: req.params.id}, 
            {$push: {cart: req.body.item}}).exec();
            return res.status(200).send("hopely it worked")
    }
})
router.route('/users/:id?').get((req, res) => {
    if (!req.params.id) {
        userModel.find((err, users) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            return res.status(200).send(users)
        })
    } else {
        userModel.findOne({ username: req.params.id }, (err, user) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (!user) return res.status(400).send('Nincs ilyen user!')
            return res.status(200).send(user)
        })
    }
}).post((req, res) => {
    if (!req.params.id || !req.body.password) {
        return res.status(400).send("Hiányos input!")
    } else {
        userModel.findOne({ username: req.params.id }, (err, user) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (user) return res.status(400).send('mar van ilyen')
            const nUser = new userModel({
                username: req.params.id,
                password: req.body.password
            })
            nUser.save((error) => {
                if (error) return res.status(500).send('DB hiba a betöltés során ' + error)
                return res.status(200).send(req.body)
            })
        })
    }
}).put((req, res) => {
    if (!req.params.id || (!req.body.username && !req.body.password)) {
        return res.status(400).send("Hiányos input!")
    } else {
        userModel.findOne({ username: req.params.id }, (err, user) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (!user) return res.status(400).send('Még nincs ilyen user')
            if (req.body.password) user.password = req.body.password
            user.save((error) => {
                if (error) return res.status(500).send('DB hiba a betöltés során ' + error)
                return res.status(200).send(user)
            })
        })
    }
}).delete((req, res) => {
    if (req.params.id) {
        userModel.deleteOne({ username: req.params.id }, (err) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            return res.status(200).send('Törölve az adott user')
        })
    } else {
        return res.status(403).send('Tilos minden felhasználót törölni egyszerre!')
    }
})

router.route('/helloworld').get((req, res) => {
    return res.status(200).send("Hello World!")
}).post((req, res) => {
    if (req.body.username) {
        return res.status(200).send("Hello " + req.body.username + "!")
    }
    return res.status(400).send("Köszönni ki fog?")
})

router.route('/login').post((req, res, next) => {
    if (req.body.username, req.body.password) {
        //meghívom a passport local stratégiáját és paraméterként átadom neki a req,res objektumokat
        passport.authenticate('local', function (error, user) {
            console.log('login eredménye:',user)
            if (error) return res.status(500).send(error);
            // ezzel léptetem bele a sessionbe a felhasználót, a user objektumot utána mindig el tudom majd érni
            // req.user néven
            req.logIn(user, function (error) {
                if (error) return res.status(500).send(error);
                return res.status(200).send('Bejelentkezes sikeres');
            })
        })(req, res, next);
    } else { return res.status(400).send('Hibas keres, username es password kell'); }
});

router.route('/logout').post((req, res, next) => {
    console.log('user:', req.user)
    // ha volt sikeres login és sikerült sessionbe léptetni a usert, akkor a session megszüntetéséig
    // vagyis logoutig ez az isAuthenticated() mindig true lesz majd
    if (req.isAuthenticated()) {
        
        req.logout(); // megszünteti a sessiont
        return res.status(200).send('Kijelentkezes sikeres');
    } else {
        return res.status(403).send('Nem is volt bejelentkezve');
    }
})

module.exports = router
//arukereso/idegrendszerem part 1