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

    formularioCrear(req, res) {
        res.render('create-patient');
    }

    guardar(req, res) {
        const { nombre, cedula, edad } = req.body;

        const nuevoPaciente = {
            id: Date.now(),
            nombre: nombre,
            cedula: cedula,
            edad: parseInt(edad),
            fechaIngreso: new Date()
        };

        db.pacientes.push(nuevoPaciente);
        
        res.redirect('/pacientes');
    }

    eliminar(req, res) {
        const id = parseInt(req.params.id);

        const indicePaciente = db.pacientes.findIndex(p => p.id === id);
        
        if (indicePaciente !== -1) {
            db.pacientes.splice(indicePaciente, 1);

            db.examenes = db.examenes.filter(examen => examen.pacienteId !== id);

            res.json({ success: true, message: "Paciente y sus exámenes eliminados correctamente" });
        } else {
            res.status(404).json({ success: false, message: "Paciente no encontrado" });
        }
    }

    actualizar(req, res) {
        const id = parseInt(req.params.id);
        const { edad } = req.body;
        
        const paciente = db.pacientes.find(p => p.id === id);
        if (paciente) {
            paciente.edad = parseInt(edad);
            res.json({ success: true, message: "Edad actualizada correctamente" });
        } else {
            res.status(404).json({ success: false, message: "Paciente no encontrado" });
        }
    }
}

module.exports = new PatientController();