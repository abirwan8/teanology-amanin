import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Tokos from "./TokoModel.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Bevs = db.define('bev', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    ings: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
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
    highlight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tsp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tspg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    water: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    temp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Bevs.belongsTo(Tokos, { foreignKey: 'tokoId' });

Users.hasMany(Bevs);
Bevs.belongsTo(Users, { foreignKey: 'userId' });

export default Bevs;