

const isAuth = (req, res, next) => {
    if (req.session?.token?.userName) {
        next()
    } else {
        res.redirect('/login')
    }
}
module.exports = isAuth
