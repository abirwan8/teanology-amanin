import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Tokos from "./TokoModel.js";
import Moods from "./MoodModel.js";
import Bevs from "./BevModel.js";

const {DataTypes} = Sequelize;

const MoodBevs = db.define('moodbev',{
    moodId:{
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

MoodBevs.belongsTo(Tokos, { foreignKey: 'tokoId' });

Moods.hasMany(MoodBevs);
MoodBevs.belongsTo(Moods, {foreignKey: 'moodId'});

Bevs.hasMany(MoodBevs);
MoodBevs.belongsTo(Bevs, {foreignKey: 'bevId'});

export default MoodBevs;