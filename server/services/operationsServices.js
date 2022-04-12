const { body } = require("express-validator");
const { edit, getAll } = require("../controllers/operationsController");
var db = require("../database/models");

module.exports = {
    async createOperation(req) {
        body = req.body;
        let category = this.findCategory(body);
        let operation = await db.Operations.create({
            concept: body.concept,
            date: body.date,
            sum: body.sum,
            type: body.type,
            category_id: category.id,
        });
        await db.Lists.create({
            user_id: req.session.userLogged.id,
            operation_id: operation.id,
        });
    },
    async edit(body, id) {
        let category = this.findCategory(body);
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
        try{
            await db.Operations.destroy({
                where: {
                    id,
                },
                force: true
            }); 
        }catch(err){
            return err
        }
    },
    async getAll(){
        return db.Operations.findAll()
    }
};
