const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

router.get('/nuevo', PatientController.formularioCrear);

router.post('/guardar', PatientController.guardar);

router.get('/', PatientController.listar);

router.get('/:id', PatientController.verPorId);

module.exports = router;