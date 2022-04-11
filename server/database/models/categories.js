module.exports = (sequelize, dataTypes) => {
  let alias = "Categories";
  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    category: {
      type: dataTypes.TEXT,
    },
  };
  let config = {
    tableName: "categories",
    timestamps: false,
  };
  let Category = sequelize.define(alias, cols, config);

  return Category
};
