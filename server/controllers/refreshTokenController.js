var db = require("../database/models");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshTokenController = {
    handleRefreshToken: async (req, res) => {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(401);
        }
        const refreshToken = cookies.jwt;

        const userFound = await db.Users.findOne({
            where: {
                refresh_token: refreshToken,
            },
        });
        if (!refreshToken) {
            return res.sendStatus(403); //forbiden
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || userFound.user !== decoded.user) {
                    return res.sendStatus(403);
                }
                const accessToken = jwt.sign(
                    { user: decoded.user },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "15m" }
                );
                res.json(accessToken);
            }
        );
    },
};

module.exports = refreshTokenController;
