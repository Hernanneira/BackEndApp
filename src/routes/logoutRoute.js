const {Router} = require('express');
const router = Router();
const sessionDBConnection = require('../db/sessionMongoAtlasDBConnection')

router.use(sessionDBConnection)

router.get('/',(req,res)=>{
    const nombre = req.session.token?.userName.username
    if (nombre) {
        req.session.destroy(err => {
            if (!err) { 
                res.render('logout.ejs', { nombre })
            } else {
                res.redirect('/productos')
            }
        })
    } else {
        res.redirect('/productos')
    }
})

module.exports = router;