

const isAuth = (req, res, next) => {
    if (req.session?.token?.userName) {
        console.log('estoy en AUTH')
        next()
    } else {
        res.redirect('/login')
    }
}
module.exports = isAuth
