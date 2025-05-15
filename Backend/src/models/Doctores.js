/**
 *  Campos:
 *    
 */

import {Schema, model} from "mongoose";

const doctoresShema = new Schema({

    nombre: {
        type: String
    },
    especialidad: {
        type: String
    },
    correo: {
        type: String
    },
    contra: {
        type: String
    }
},{
    timestamps: true,
    strict: false
})


export default model("Doctores", doctoresShema)