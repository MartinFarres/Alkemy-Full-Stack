var db = require("../database/models");
var userServices = require("../services/userServices");
var { validationResult } = require("express-validator");
var bcryptjs = require("bcryptjs");

const controller = {
    getAll: async (req, res) => {
        let users = await db.Users.findAll({
            include: [
                {
                    association: "list",
                },
            ],
        });
        let respuesta = {
            meta: {
                status: 200,
                total: users.length,
                url: "/users",
            },
            data: {
                users: users,
                session: req.session.userLogged,
            },
        };
        res.json(respuesta);
    },
    detail: async (req, res) => {
        let user = await db.Users.findByPk(req.params.id);
        let respuesta = {
            meta: {
                status: 200,
                url: "/users/:id",
            },
            data: user,
        };
        res.json(respuesta);
    },
    create: async (req, res) => {
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if (resultValidation.errors.length > 0) {
            return res.send({
                meta: {
                    status: 400,
                    url: "/users/create",
                },
                errors: resultValidation.mapped(),
            });
        }

        let emailInDb = await userServices.findByEmail(req.body.email);
        let userInDb = await userServices.findByUser(req.body.user);
        console.log(userInDb);
        if (emailInDb) {
            return res.status(409).json({ errMessage: "Email already taken" });
        } else if (userInDb) {
            return res.status(409).json({ errMessage: "User already taken" });
        }

        await userServices.createUser(req.body);
        res.send({
            meta: {
                status: 201,
                url: "/users/register",
            },
        });
    },
    login: async (req, res) => {
        let userToLogin = await userServices.findByEmail(req.body.email);
        if (userToLogin) {
            let comparePassword = bcryptjs.compareSync(
                req.body.password,
                userToLogin.password
            );
            if (comparePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                res.send({
                    meta: {
                        status: 201,
                        url: "/users/login",
                    },
                    data: userToLogin,
                    session: req.session.userLogged,
                });
            }
            return res.send({
                meta: {
                    status: 404,
                    url: "/users/login",
                },
                data: {
                    errors: "The email / password combination is incorrect",
                },
            });
        }

        return res.send({
            meta: {
                status: 404,
                url: "/users/login",
            },
            data: {
                errors: "The email is not register",
            },
        });
    },
};

module.exports = controller;
