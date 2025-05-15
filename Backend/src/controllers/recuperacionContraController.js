import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";


import doctoresModel from "../models/Doctores.js";

import { config } from "../config.js";
import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";

const recuperacionContraController = {};

recuperacionContraController.requestCode = async (req, res) => {
    const {correo} = req.body;

    try {
        let userFound;
        let userType; 

        userFound = await  doctoresModel.findOne({correo}); 
        if(userFound) {
            userType = "Doctor";
        }

        if(!userFound){
            return res.json({message: "Usuario no encontrado"});
        }

        const code = Math.floor(100000 + Math.random() * 60000).toString(); // Generate a 6-digit code


        //Token

        const token = jsonwebtoken.sign(
           {correo, code, userType, verified: false},
           config.JWT.secret,
              {expiresIn: "25m"}
        )
        
        res.cookie("tokenRecoveryCode", token, {maxAge: 25 * 60 * 1000})

        await sendEmail(
            correo,
            "Password Recovery",
            `your verification code is ${code}`,
            HTMLRecoveryEmail(code)
        )

        res.json({message: "Código de verificación enviado"})

    } catch (error) {
        console.log("error" + error);
    }
}

recuperacionContraController.verifyCode = async (req, res) => {
    
    const  {code} = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (decoded.code !== code) {
            return res.json({message: "Invalid code"});
        }

        const newToken = jsonwebtoken.sign(
            {correo: decoded.correo, code: decoded.code, userType: decoded.userType, verified: true},
            config.JWT.secret,
            {expiresIn: "25m"}
        )

        res.cookie("tokenRecoveryCode", newToken, {maxAge: 25 * 60 * 1000})
        res.json({message: "Código verificado"})
    } catch (error) {
        console.log("error" + error);
    }
}


recuperacionContraController.newPassword = async (req, res) => {

    const {newPassword} = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (!decoded.verified) {
            return res.json({message: "Código no verificado"});
        }

        let user; 

        const {correo} = decoded;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        if(decoded.userType === "Doctor"){
            user = await doctoresModel.findOneAndUpdate(
                {correo},
                {contra: hashedPassword},
                {new: true}
            )
        } 

        res.clearCookie("tokenRecoveryCode");

        res.json({message: "Su contraseña se ha actualizado satisfactoriamente!"})

       

    } catch (error) {
        console.log("error" + error);
    }

}

export default recuperacionContraController;