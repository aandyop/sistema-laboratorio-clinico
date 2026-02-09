const db = require('../models/db');

class ExamController {
    formularioCrear(req, res) {
        const pacienteId = req.params.pacienteId;
        res.render('create-exam', { pacienteId: pacienteId });
    }

    guardar(req, res) {
        const { pacienteId, tipo, resultado } = req.body;

        const nuevoExamen = {
            id: Date.now(),
            pacienteId: parseInt(pacienteId),
            tipo: tipo,
            resultado: resultado,
            fecha: new Date()
        };

        db.examenes.push(nuevoExamen);

        res.redirect('/pacientes/' + pacienteId);
    }
}

module.exports = new ExamController();