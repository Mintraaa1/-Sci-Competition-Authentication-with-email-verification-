import sequelize from "./db.js";
import Sequelize from "sequelize"; //Sequelize คือ class  , sequelize คือ instance(lybrary)

import User from "./user.model.js";
import Activity from "./activity.model.js";
import Teacher from "./teacher.model.js";
import Jude from "./jude.model.js";
import Admin from "./admin.model.js";
import VerificationToken from "./verificationToken.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;  //model Uer  เป็น class  อาจารย์เลยตั้งเป็นพิมพ์ใหญ่
db.Activity = Activity;
db.Teacher = Teacher;
db.Jude = Jude;
db.Admin = Admin;
db.VerificationToken = VerificationToken;
//Association
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId" });
db.User.belongsTo(db.Activity, { through: "UserActivities" });


export default db;