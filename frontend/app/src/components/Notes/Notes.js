import React from 'react';
import Note from './Note/Note';
import Modal from 'react-modal';
import './Notes.css';
import NewNote from './NewNote/NewNote';
import EditNote from './EditNote/EditNote';
import axios from '../../axios';

class Notes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notes: [],
            editNote: {},
            showEditModal: false
        };
    }
    componentWillMount() {
        Modal.setAppElement('body');
    }

    componentDidMount(){
        this.fetchNotes();
    }

    async fetchNotes(){
        const res = await axios.get('/notes');
        console.log(res);
        const notes = res.data;
        this.setState({ notes });
    }

    async deleteNote(id){
        const notes = [...this.state.notes]
            .filter(note => note._id !== id)

        await axios.delete('/notes/' + id);
        this.setState({ notes });
    }

    async addNote(note){
        const notes = [...this.state.notes];

        const res = await axios.post('/notes', note);
        const newNote = res.data;

        notes.push(newNote);
        this.setState({ notes });
    }

    async editNote(note){
        await axios.put('/notes/' + note._id, note);
        console.log(note._id)
        const notes = [...this.state.notes];
        const index = notes.findIndex(n => n._id === note._id)
        console.log(note._id);
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
                contentLabel= "Edytuj notatkę"
                ariaHideApp={false} >
                <EditNote
                    title={this.state.editNote.title}
                    body={this.state.editNote.body}
                    _id={this.state.editNote._id}
                    onEdit={note => this.editNote(note)} />
                <button className="delete" onClick = {() => this.toggleModal()}>Anuluj</button>
            </Modal>

            {this.state.notes.map(note => (
                <Note 
                    key={note._id}
                    title = {note.title} 
                    body = {note.body}
                    _id = {note._id}
                    onEdit={(note) => this.editNoteHandler(note)}
                    onDelete = {() => this.deleteNote(note._id)}
                />
            ))}
        
        </div>
        );
    }
}

export default Notes;