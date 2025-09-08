import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Teacher = User.init ({
    school: {
        typeL: DataTypes.STRING,
        allowNull: false,
    },
    phone: { 
        type: DataTypes.STRING,  // STRING คือ ข้อความ ที่phoneใช้ string เพราะอาจมี - หรือ 0 นำหน้า ซึ่งถ้าใช้ INTEGER จะตัด 0 ทิ้ง เราต้องการเก็บ 0 ด้วยจึงใช้ STRING
        allowNull: false,
    },
    }, 
    {
        scopes: {
            defaultScope: {
                where: {
                   type: "teacher" , 
                } 
            },
        },
    },
    {
        beforeCreate: (teacher) => {
            teacher.type = "teacher";
        },
    }
);

export default Teacher;