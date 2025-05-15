import Doctores from "../models/Doctores.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registroDoctoresController = {};

registroDoctoresController.register = async (req,res) => {
    const {nombre, especialidad, correo, contra} = req.body;

    try {
        const existDoctor = await Doctores.findOne({correo});
        if(existDoctor){
            return res.json({message: "Este registro de doctor ya existe"});
        }

        //hashear o encriptar la contraseña 
        const passwordHash = await bcryptjs.hash(contra, 10);

        const newDoctor = new Doctores({nombre, especialidad, correo, contra: passwordHash});
        await newDoctor.save();

        //generar un token que valide que ya esta registrado
        //y se puede acceder a todas las paginas

        jsonwebtoken.sign(
            {id: newDoctor._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},

            (error, token) => {
                if(error)console.log(error);
                res.cookie("authToken", token);
                res.json({message:"Doctor Registrado"})
            }
        );
    } 
    catch (error) {
        console.log(error);
        res.json({message: "Error al registrar al Doctor"})
    }
}

export default registroDoctoresController;
