const db = require('../models/db');

class PatientController {
    
    listar(req, res) {
    let listaPacientes = [...db.pacientes];

    if (req.query.orden === 'recientes') {
        listaPacientes.sort((a, b) => b.fechaIngreso - a.fechaIngreso);
        listaPacientes = listaPacientes.slice(0, 5);
    }

    res.render('patients', { 
        titulo: "Panel de Gestión de Pacientes", 
        pacientes: listaPacientes 
    });
    }

    verPorId(req, res) {
    const idBuscado = parseInt(req.params.id);
    const paciente = db.pacientes.find(p => p.id === idBuscado);

    if (paciente) {
        const examenesDelPaciente = db.examenes.filter(e => e.pacienteId === idBuscado);
        
        res.render('patient-detail', { 
            paciente: paciente, 
            examenes: examenesDelPaciente 
        });
    } else {
        res.status(404).render('error', { message: 'Paciente no encontrado', error: {status: 404} });
    }
    }
}

module.exports = new PatientController();