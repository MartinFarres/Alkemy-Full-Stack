var db = require("../database/models");
var userServices = require("../services/userServices");
var { validationResult } = require("express-validator");
var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();

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
        const foundUser = await userServices.findByUser(req.body.user);
        if (!foundUser) return res.sendStatus(401); //Unauthorized
        // evaluate password
        const match = bcryptjs.compareSync(
            req.body.password,
            foundUser.password
        );
        if (match) {
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        id: foundUser.id,
                        user: foundUser.user,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );
            const refreshToken = jwt.sign(
                { user: foundUser.user },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            foundUser.refresh_token = refreshToken;
            const result = await foundUser.save();
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 24 * 60 * 60 * 1000,
            });

            return res.json({ accessToken, id: foundUser.id });
        } else {
            res.sendStatus(401);
        }
    },
    logout: async (req, res) => {
        //On react delete the accesToken

        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(204); //no cookie
        }

        const refreshToken = cookies.jwt;
        const userFound = await db.Users.findOne({
            where: {
                refresh_token: refreshToken,
            },
        }).exec();
        if (!refreshToken) {
            res.clearCookie("jwt", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.sendStatus(204); //cookie but no user
        }

        //delete refreshToken in Db
        await db.Users.update(
            { refresh_token: null },
            {
                where: { id: userFound },
            }
        );
        res.clearCookie("jwt", {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.sendStatus(204); //cookie and user
    },
};

module.exports = controller;
