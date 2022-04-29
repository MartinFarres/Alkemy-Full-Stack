const { body } = require("express-validator");
const { edit, getAll } = require("../controllers/operationsController");
var db = require("../database/models");

module.exports = {
    async createOperation(req) {
        let body = req.body;

        let category = await this.findCategory(body);
        console.log(category);
        let operation = await db.Operations.create({
            concept: body.concept,
            date: body.date,
            sum: body.sum,
            type: body.type,
            category_id: category.id,
        });
        await db.Lists.create({
            user_id: body.userId,
            operation_id: operation.id,
        });
    },
    async edit(body, id) {
        let category = await this.findCategory(body);
        try {
            await db.Operations.update(
                {
                    concept: body.concept,
                    date: body.date,
                    sum: body.sum,
                    type: body.type,
                    category_id: category.id,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
        } catch (err) {
            res.send(err);
        }
    },
    async findCategory(body) {
        return await db.Categories.findOne({
            where: {
                category: body.category,
            },
        });
    },
    async findOne(id) {
        return await db.Operations.findByPk(id);
    },
    async deleteOne(id) {
        try {
            await db.Operations.destroy({
                where: {
                    id,
                },
                force: true,
            });
        } catch (err) {
            return err;
        }
    },
    async getAll() {
        return db.Operations.findAll();
    },
    async netIncome(operationsId) {
        let incomeOp = await db.Operations.findAll({
            where: { id: operationsId, type: "income" },
        });
        let sum = 0;
        for (let i = 0; i < incomeOp.length; i++) {
            sum += incomeOp[i].sum;
        }
        return sum;
    },
    async netOutflows(operationsId) {
        let outflowsOp = await db.Operations.findAll({
            where: { id: operationsId, type: "outflows" },
        });
        let sum = 0;
        for (let i = 0; i < outflowsOp.length; i++) {
            sum += outflowsOp[i].sum;
        }
        return sum;
    },
};
