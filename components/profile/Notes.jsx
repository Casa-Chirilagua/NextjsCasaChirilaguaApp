'use client'

// React
import { useState } from 'react';

//Icons
import { GrAdd } from 'react-icons/gr';
import { TfiSave } from 'react-icons/tfi';

//Functions
import ConvertDate from '@/functions/ConvertDate';

//Next Auth
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const user = session?.user;

  //Get the username of current user
  const username = user?.name;

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
        {object?.notes?.length > 0 ? (<div className="notes-list">
          {object?.notes?.map((note, index) => {
            return (
              <div key={index} className="note-list-item">
                <div className="note-list-item-header">
                  <div className="note-list-item-title">
                    {note.original_author}
                  </div>
                  <div className="note-list-item-date">
                    {ConvertDate(note.date_created)}
                  </div>
                </div>
                <div className="note-list-item-body">
                  <p className="note-body-paragraph">{note.description}</p>
                </div>
              </div>
            );
          })}
        </div>) : <div className="no-notes">No notes</div>}
      </div>
    </div>
  );
}

export default Notes;
