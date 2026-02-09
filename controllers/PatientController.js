const db = require('../models/db');

class PatientController {
    
    listar(req, res) {
        let listaPacientes = [...db.pacientes];

        if (req.query.orden === 'recientes') {
            listaPacientes.sort((a, b) => b.fechaIngreso - a.fechaIngreso);
            listaPacientes = listaPacientes.slice(0, 5);
        }

        res.json({
            titulo: "Listado de Pacientes",
            datos: listaPacientes
        });
    }

    verPorId(req, res) {
        const idBuscado = parseInt(req.params.id);
        const paciente = db.pacientes.find(p => p.id === idBuscado);

        if (paciente) {
            res.json(paciente);
        } else {
            res.status(404).json({ mensaje: "Paciente no encontrado" });
        }
    }
}

module.exports = new PatientController();