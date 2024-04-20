import React, { useState} from 'react';
import { GrAdd } from 'react-icons/gr';
import { TfiSave } from 'react-icons/tfi';

//Functions
import convertDate from '../../functions/ConvertDate';

//Auth0
import { useAuth0 } from '@auth0/auth0-react';

//Components
import PopUpMenu from '../pop up menu/PopUpMenu';


//Function to display the notes
function Notes({
  object,
  handleSaveNoteClick,
  setOpenAddNoteMenu,
  openAddNoteMenu,
  setNotes,
}) {

  //Current user
  const { user } = useAuth0();

  //Get the username of current user
  const username = user?.name.split('@')[0];

  //State to store the note text
  const [noteText, setNoteText] = useState('');

  // Function to update the note text
  const handleTextChange = (event) => {
    const notes = [
      {
        description: event.target.value,
        original_author: username,
      },
    ];
    setNotes(notes);
    setNoteText(event.target.value);
  };

  /* The data should be in the following format 
   * Ex:  
             "notes": 
                    [
                      {
                        "description": "Emilio has been in Casa Chirilagua since the 4th grade",
                        "original_author": "emilio"
                      }
                    ],
            "history": 
                    [
                      {
                        "field_edited": "notes",
                        "old_value": "",
                        "edited_by": "emilio"
                      }
                    ]
  */
  return (
    <div className="notes-container">
      <div className="notes-top">
        <div>Notes</div>
        <PopUpMenu
          buttonIcon={<TfiSave />}
          buttonLabel="Save"
          open={openAddNoteMenu}
          setIsVisible={setOpenAddNoteMenu}
          handleClick={handleSaveNoteClick}
          component={
            <div className="textarea-container">
              <textarea
                className="notes-textarea"
                placeholder="Write a note..."
                value={noteText}
                onChange={handleTextChange}
              />
            </div>
          }
        >
          <div className="notes-button">
            <GrAdd />
            Add Note
          </div>
        </PopUpMenu>
      </div>
      <div className="notes-body">
        <div className="notes-list">
          {object?.notes.map((note) => {
            return (
              <div className="note-list-item">
                <div className="note-list-item-header">
                  <div className="note-list-item-title">
                    {note.original_author?.split('@')[0]}
                  </div>
                  <div className="note-list-item-date">
                    {convertDate(note.date_created)}
                  </div>
                </div>
                <div className="note-list-item-body">
                  <p className="note-body-paragraph">{note.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Notes;
