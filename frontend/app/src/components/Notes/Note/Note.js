import React, { useState} from 'react';

function Note(props){

    const [desc, setDesc] = useState(true);

    const changeDesc = () =>{
        setDesc(!desc);
    }

    const editHandler = () => {
        props.onEdit({ 
          title: props.title, 
          body: props.body, 
          _id: props._id 
        });
      }

    return(
        <div className = "note">
            <p onClick={() => changeDesc() }>{props.title}</p>
            {desc && (
                <div className="description">{props.body}</div>
                )}
            <button onClick={editHandler} >edytuj</button>
            <button className="delete"
                onClick = {() => props.onDelete(props._id)}
            >usuń</button>
        </div>
    );
}

export default Note;