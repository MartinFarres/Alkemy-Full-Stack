const userService = require("../services/userServices");
async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailCookie = req.cookies.userEmail;
    if (emailCookie) {
        let userCookie = await userService.findByField(emailCookie);
        req.session.userLogged = userCookie;
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.isLogged = req.session.userLogged;
    }

    next();
}
module.exports = userLoggedMiddleware;
