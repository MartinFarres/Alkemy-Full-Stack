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
    detail: async (req, res) => {
        let operation = await db.Operations.findByPk(req.params.id);
        let respuesta = {
            meta: {
                status: 200,
                url: "/operations/:id",
            },
            data: operation,
        };
        res.json(respuesta);
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
        res.send({
            meta: {
                status: 200,
                url: `/operations/${id}`,
                method: "PUT",
            },
            data: {
                message: `Operation ${id} edit succesfully`,
                operation: await operationsServices.findOne(id),
            },
        });
    },
    delete: async (req, res) => {
        let id = req.params.id;
        await operationsServices.deleteOne(id);
        res.send({
            meta: {
                status: 200,
                url: `/operations/${id}`,
                method: "DELETE",
            },
            data: {
                message: `Operation ${id} deleted succesfully`,
                operations: await operationsServices.getAll(),
            },
        });
    },
};

module.exports = controller;
