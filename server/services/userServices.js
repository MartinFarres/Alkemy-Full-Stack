var db = require("../database/models");
var bcryptjs = require("bcryptjs");

module.exports = {
    async findByEmail(text) {
        try {
            let user = await db.Users.findOne({
                where: { email: text },
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
