import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {
    getVerificationEmailTemplate
} from './emailTemplates.js';
dotenv.config();
const  transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.STMP_USER,
        pass: process.env.STMP_PASS,
    },
});
 //Verification Email Conection Configuration
 transporter.verify(function (error, success) {
    if (error) {
        console.error("SMTP Connection Error", error);
    } else {
        console.log("SMTP Server is ready to send mail");
    }
});

//send Verification Email
export const sendVerificationEmail = async (email,token,userName) => {
    const VerificationURL = `${process.env.BASE_URL}/api/v1/auth/verity/${token}`;

    const mailOptions = {
        from:{ 
        name: "ระบบการแข่งขันวันวิทยาศาสตร์",
        email: process.env.EMAIL_FROM,
    },
    to: email,
    subject: 'กรุณายืนยันอีเมลของคุณ',
    html: getVerificationEmailTemplate(userName,VerificationURL),
    text: `ยินดีต้อนรับสู่วันวิทยาศาสตร์!\n\nเรียน คุณ${userName},
    \n\nขอขอบคุณที่ลงทะเบียนเข้าร่วมการแข่งขันทางวิทยาศาสตร์
};\n\nกรุณายืนยันอีเมลของคุณโดยคลิกที่ลิงก์ด้านล่าง:\n\n${VerificationURL}\n\nหากคุณไม่ได้ลงทะเบียน กรุณาเพิกเฉยต่ออีเมลนี้\n\nขอแสดงความนับถือ,\nทีมงานวันวิทยาศาสตร์`,
  };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully!");
            return info;
    } catch (error) {
     console.error("Error sending verification email:", error);
     throw error;
}
}