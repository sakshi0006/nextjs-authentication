import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId} : any) => {
    try{
           //create hashed token
           const hashedToken = await bcryptjs.hash(userId.toString(), 10);


           if(emailType === "VERIFY"){
                
                await User.findByIdAndUpdate(userId,{
                    verifyToken: hashedToken,
                    verifyTokenExpiry : Date.now() + 3600000
                });
           } else if(emailType === "RESET"){
            
                await User.findByIdAndUpdate(userId,{
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry : Date.now() + 3600000
                });
           }

           var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.USER_EMAIL,
              pass: process.env.USER_PASSWORD
            }
          });
          
          const mailOptions = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: emailType === "VERIFY" ?
             "Verify your email" : "Reset your password please",
            html: `<p>
               Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to
               ${emailType === "VERIFY" ?
               "Verify your email" : "Reset your password"}
               or copy and paste the below link in your browser <br/>
               ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`        
        }

           const mailResponse = await transport.sendMail(mailOptions);

           return mailResponse;
    }catch(error: any){
        throw new Error(error.message);
    }
}