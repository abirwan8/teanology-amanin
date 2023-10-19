import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Moods = db.define('mood',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
});

// db.sync()
//   .then(async () => {
//     await Moods.bulkCreate([
//       { type: "Angry" },
//       { type: "Disgust" },
//       { type: "Fear" },
//       { type: "Happy" },
//       { type: "Neutral" },
//       { type: "Sad" },
//       { type: "Surprise" }
//     ]);
//     console.log("Database synced and Moods data added");
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });

export default Moods;