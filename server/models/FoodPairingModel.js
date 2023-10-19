import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Foods from "./FoodModel.js";
import Bevs from "./BevModel.js";

const {DataTypes} = Sequelize;

const FoodPairings = db.define('foodpairing',{
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    foodId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    bevId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(FoodPairings);
FoodPairings.belongsTo(Users, {foreignKey: 'userId'});

Foods.hasMany(FoodPairings);
FoodPairings.belongsTo(Foods, {foreignKey: 'foodId'});

Bevs.hasMany(FoodPairings);
FoodPairings.belongsTo(Bevs, {foreignKey: 'bevId'});

export default FoodPairings;