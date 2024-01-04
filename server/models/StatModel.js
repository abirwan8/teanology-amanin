import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Stats = db.define('stat', {
    // uuid: {
    //     type: DataTypes.STRING,
    //     defaultValue: DataTypes.UUIDV4,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    clickHappy:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    clickAngry:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    clickFear:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    clickSad:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    clickDisgust:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    clickSurprise:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    clickNeutral:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    scanHappy:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    scanAngry:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    scanFear:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    scanSad:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    scanDisgust:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    scanSurprise:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
    scanNeutral:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true
});

export default Stats;