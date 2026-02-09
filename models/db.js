const db = {
    pacientes: [
        { 
            id: 1, 
            nombre: 'Juan Pérez', 
            cedula: '12345678', 
            edad: 30, 
            fechaIngreso: new Date('2024-01-10') 
        },
        { 
            id: 2, 
            nombre: 'Maria Gomez', 
            cedula: '87654321', 
            edad: 45, 
            fechaIngreso: new Date('2024-02-05') 
        }
    ],
    examenes: [
        { 
            id: 101, 
            pacienteId: 1,
            tipo: 'Hemoglobina', 
            resultado: '14.2 g/dL', 
            fecha: new Date('2024-01-11') 
        }
    ]
};

module.exports = db;