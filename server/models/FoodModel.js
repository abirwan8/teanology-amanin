import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Tokos from "./TokoModel.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Foods = db.define('food',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    ings:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    img1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    img2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    img3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    img4: {
        type: DataTypes.STRING,
        allowNull: true
    },
    img5: {
        type: DataTypes.STRING,
        allowNull: true
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    isHidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Foods.belongsTo(Tokos, { foreignKey: 'tokoId' });

Users.hasMany(Foods);
Foods.belongsTo(Users, {foreignKey: 'userId'});

export default Foods;