module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        user: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        refresh_token: {
            allowNull: true,
            type: dataTypes.STRING,
        },
    };
    let config = {
        tableName: "users",
        timestamps: false,
    };
    let User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.hasMany(models.Lists, {
            as: "list",
            foreignKey: "id",
            onDelete: "cascade",
        });
    };
    return User;
};
