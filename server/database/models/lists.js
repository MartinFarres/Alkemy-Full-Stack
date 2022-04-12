module.exports = (sequelize, dataTypes) => {
    let alias = "Lists";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        user_id: {
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        operation_id: {
            allowNull: false,
            type: dataTypes.INTEGER,
        },
    };
    let config = {
        tableName: "lists",
        timestamps: false,
    };
    let List = sequelize.define(alias, cols, config);

    List.associate = (models) => {
        List.belongsTo(models.Users, {
            as: "users",
            foreignKey: "user_id",
        });
        List.belongsTo(models.Operations, {
            as: "operations",
            foreignKey: "operation_id",
            onDelete: "cascade",
        });
    };

    return List;
};
