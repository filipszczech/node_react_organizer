import React, { useState} from 'react';

function Note(props){

    const [desc, setDesc] = useState(true);

    const changeDesc = () =>{
        setDesc(!desc);
    }

    return(
        <div className = "note">
            <p onClick={() => changeDesc() }>{props.title}</p>
            {desc && (
                <div className="description">{props.body}</div>
                )}
            <button
                onClick = {() => props.onEdit({
                        title: props.title,
                        body: props.body,
                        id: props.id   
                    })}
            >edytuj</button>
            <button className="delete"
                onClick = {() => props.onDelete(props.id)}
            >usuń</button>
        </div>
    );
}

export default Note;