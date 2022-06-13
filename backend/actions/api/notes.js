const Note = require('../../db/models/note')

module.exports = {
    saveNote(req, res){
        const newNote = new Note({
            title: 'Druga notatka',
            body: 'Zawartość pierwszej notatki'
        });
        
        newNote.save().then(() => {
            console.log('Notatka została zapisana')
        });

        res.send('Strona główna');
    }
}
