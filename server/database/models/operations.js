module.exports = (sequelize, dataTypes) => {
  let alias = "Operations";
  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    concept: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    date: {
      allowNull: true,
      type: dataTypes.DATEONLY,
    },
    sum: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    type: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    category_id: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "operations",
    timestamps: false,
  };
  let Operations = sequelize.define(alias, cols, config);

  Operations.associate = (models) => {
    Operations.hasMany(models.Lists, {
      as: "list",
      foreignKey: "id",
    });
    Operations.belongsTo(models.Categories, {
      as: "categories",
      foreignKey: "category_id",
    });
  };
  return Operations
};
