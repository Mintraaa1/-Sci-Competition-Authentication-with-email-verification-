import { DataTypes } from "sequelize";
import sequelize from "./db.js";
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async(user) => {
      if (user.password) {
        const salt = await becrypt.genSalt(10);
        user.password = await becrypt.hash(user.password, salt);
    }
  },
    beforeUpdate: async(user) => {
      if (user.changed("password")) { //ถ้าเปลี่ยนรหัสผ่าน ต้องเอาด้านบนไปเข้ารหัสใหม่
        const salt = await becrypt.genSalt(10);
        user.password = await becrypt.hash(user.password, salt);
    }
  }
  }
});
User.prototype.comparePassword = async function(password) {  //ดึงตัวรหัสผ่านที่ต้องการใช้ มาเทียบ
  return await becrypt.compare(candidatePassword, this.password); //this.password คือรหัสผ่านที่เข้ารหัสแล้วในฐานข้อมูล  candidatePassword คือรหัสผ่านที่ดึงมาเทียบ
  };
export default User;