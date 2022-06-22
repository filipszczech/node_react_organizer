import React from 'react';
import Note from './Note/Note';
import Modal from 'react-modal';
import './Notes.css';
import NewNote from './NewNote/NewNote';
import EditNote from './EditNote/EditNote';

class Notes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notes: [
                {
                    id: '11',
                    title: 'misja1',
                    body: 'wykonać misje'
                },
            ],
            editNote: {},
            showEditModal: false
        };
    }

    deleteNote(id){
        const notes = [...this.state.notes]
            .filter(note => note.id !== id)
        this.setState({ notes });
    }

    addNote(note){
        const notes = [...this.state.notes];
        notes.push(note);
        this.setState({ notes });
    }

    editNote(note){
        const notes = [...this.state.notes];
        const index = notes.findIndex(n => n.id === note.id)
        if(index >= 0){
            notes[index] = note;
            this.setState({ notes });
        }
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
          showEditModal: !this.state.showEditModal
        });
      }
    
    editNoteHandler(note){
        this.toggleModal();
        this.setState({ editNote: note });
    }

    render(){
        return(
        <div>
            <p>Zadania do wykonania:</p>

            <NewNote
                onAdd={(note) => this.addNote(note)} />

            <Modal
                isOpen = {this.state.showEditModal}
                contentLabel= "Edytuj notatkę" >
                <EditNote
                    title={this.state.editNote.title}
                    body={this.state.editNote.body}
                    id={this.state.editNote.id}
                    onEdit={note => this.editNote(note)} />
                <button className="delete" onClick = {() => this.toggleModal()}>Anuluj</button>
            </Modal>

            {this.state.notes.map(note => (
                <Note 
                    title = {note.title} 
                    body = {note.body}
                    id = {note.id}
                    onEdit={(note) => this.editNoteHandler(note)}
                    onDelete = {() => this.deleteNote(note.id)}
                />
            ))}
        
        </div>
        );
    }
}

export default Notes;