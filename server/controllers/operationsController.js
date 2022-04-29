var db = require("../database/models");
var operationsServices = require("../services/operationsServices");
var { validationResult } = require("express-validator");

const controller = {
    getAll: async (req, res) => {
        let operations = await db.Operations.findAll({
            include: [
                {
                    association: "list",
                },
                {
                    association: "categories",
                },
            ],
        });
        let respuesta = {
            meta: {
                status: 200,
                total: operations.length,
                url: "/operations",
            },
            data: operations,
        };
        res.json(respuesta);
    },
    getUserList: async (req, res) => {
        const userId = req.params.id;
        const userOperations = await db.Lists.findAll({
            where: { user_id: userId },
        });
        let operationsId = [];
        for (let i = 0; i < userOperations.length; i++) {
            operationsId.push(userOperations[i].operation_id);
        }

        const operations = await db.Operations.findAll({
            where: { id: operationsId },
            include: [{ association: "categories" }],
        });

        let netIncome = await operationsServices.netIncome(operationsId);
        let netOutflows = await operationsServices.netOutflows(operationsId);

        let response = {
            meta: {
                netTotal: netIncome - netOutflows,
                netIncome,
                netOutflows,
            },
            data: { operations },
        };

        return res.json(response);
    },
    detail: async (req, res) => {
        let operation = await db.Operations.findByPk(req.params.id, {
            include: [{ association: "categories" }],
        });

        res.json(operation);
    },
    create: async (req, res) => {
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if (resultValidation.errors.length > 0) {
            return res.send({
                meta: {
                    status: 404,
                    url: "/operations/create",
                },
                errors: resultValidation.mapped(),
            });
        }

        await operationsServices.createOperation(req);
        res.send({
            meta: {
                status: 201,
                url: "/operations/create",
            },
            data: {
                message: "Operation created succesfully",
                operation: await operationsServices.findOne(req.body.id),
            },
        });
    },
    edit: async (req, res) => {
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if (resultValidation.errors.length > 0) {
            return res.send({
                meta: {
                    status: 404,
                    url: `/operations/${id}`,
                    method: "PUT",
                },
                errors: resultValidation.mapped(),
            });
        }

        let id = req.params.id;
        await operationsServices.edit(req.body, id);
        res.sendStatus(200);
    },
    delete: async (req, res) => {
        let id = req.params.id;
        await operationsServices.deleteOne(id);
        res.sendStatus(200);
    },
};

module.exports = controller;
