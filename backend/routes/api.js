const express = require('express');
const router = express.Router();

const noteActions = require('../actions/api/noteActions');

//pobranie wszystkich notatek
router.get('/notes', noteActions.getNotes)
//pobranie konkretnej notatki
router.get('/notes/:id', noteActions.getNote)
//dodanie nowej notatki
router.post('/notes', noteActions.saveNote)
//edytowanie notatki
router.put('/notes/:id', noteActions.updateNote)
//usuwanie notatki
router.delete('/notes/:id', noteActions.deleteNote)

module.exports = router;