import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import db from "../models/index.js";

const User = db.User;

//Register
const signup = async (req, res) => {
  const { email, password, type,name } = req.body;
  try {
    if(!email || !password || !type || !name) {  //!= not 
      return res
      .status(400)
      .send({ message: "Email, password,type and name are require ! " });
    }

    //Validate user type
    const allowedTypes = ["admin", "teacher", "jude"];
    if (!allowedTypes.includes(type)) {
      return res
      .status(400)
      .send({ 
        message: "Invalid user type. Must be admin,teacher or jude",
       });
    }
    //Additional fields for teacher
    if (type === "teacher" && (!school || !phone)) {
      return res
      .status(400)
      .send({ message: "School and phone are required for teacher" });
    }
    //Check if user already exists
    const existingUser = await User.findOne({ //ถ้าเขียน await แปลว่าจะหยุด รอ ให้บรรทัดนี้ทำงานเสร็จก่อน แล้วค่อยไปทำบรรทัดถัดไป
      where: { 
        email 
      } 
    });
    if (existingUser) { // ใช้ if สังเกตุจาก await ด้านบน
      return res.status(400).send({ message: "Email is already in use!" });
    }
    //Create user object
    const userData = {
      name: name,
      email: email,
      password: password,
      type: type,
    };
    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    //Create new user
    const newUser = await User.create(userData);


    //IF user is a teacher, create and send verification email
    if (type === "teacher") {
      try {
        //Create a verification token
        const token = crypto.randomBytes(32).toString("hex");
        const verificationToken = await db.VerificationToken.create({
          token,
          userId: user.id,
          expiredAt: New Date(DataTypes) + 24 * 60 * 60 * 1000, //1 day  24 ชั่วโมง 60 นาที 60 วินาที 1000 มิลลิวินาที
    });
  } catch (err) {}
}

    res.status(201).send({ 
      message: 
        user.type === "teacher"
        ? "Registration successful! Please check  your email to verify your  account"
        : "User registered successfully!" ,
      user: {
        id : user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isVerified: user.isVerified }),
      },
      });
  
  } catch (err) {
    return res.status(500).send({
       message: 
          err.message || "Some error occurred while creating the user." });
      });
  }
};

export default signup;