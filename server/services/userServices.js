var db = require("../database/models");
var bcryptjs = require("bcryptjs");

module.exports = {
    async findByEmail(email) {
        try {
            let user = await db.Users.findOne({
                where: { email: email },
            });
            return user;
        } catch (err) {
            console.log(err);
        }
    },
    async findByUser(userbody) {
        try {
            let user = await db.Users.findOne({
                where: { user: userbody },
            });
            return user;
        } catch (err) {
            console.log(err);
        }
    },
    async createUser(body) {
        await db.Users.create({
            user: body.user,
            email: body.email,
            password: bcryptjs.hashSync(body.password, 10),
        });
    },
};
