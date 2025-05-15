import doctoresModel from "../models/Doctores.js";

const DoctoresController = {};


/********************* S E L E C T **************************/

DoctoresController.getDoctores = async (req, res) => {
    const doctores = await doctoresModel.find()
    res.json(doctores)
};


/********************* D E L E T E **************************/

DoctoresController.deleteDoctores = async (req, res) => {
    await doctoresModel.findByIdAndDelete(req.params.id);
    res.json({message: "Se ha elimnado un registro de doctores!"})
}; 


/********************* U P D A T E **************************/

DoctoresController.updateDoctores = async (req, res) => {
    const { nombre , especialidad , correo , contra } = req.body;
    const updateddoctores = await doctoresModel.findByIdAndUpdate(req.params.id, { nombre , especialidad , correo , contra } , {new: true} )

    res.json({message: "Se ha actualizado el registro del doctor!"})
};


export default DoctoresController;