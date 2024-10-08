import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import pocketnotes from "./images/pocketnotes-main.png";
import dot from "./images/dot.png";
import { IoSendSharp } from "react-icons/io5";

function App() {
  const [selectedGroupIndex, _setSelectedGroupIndex] = useState(null);

  const [newGroupName, _setNewGroupName] = useState("");
  const [newGroupColor, _setNewGroupColor] = useState("#B38BFA");

  const [newNoteContent, _setNewNoteContent] = useState("");

  const [isNewGroupDialougeOpen, setisNewGroupDialougeOpen] = useState(false);

  const [groups, setGroups] = useState([
    {
      title: "note1",
      id: uuid(),
      color: "#FFC0CB",
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: [
        { content: "abc", createdAt: new Date(), id: uuid() },
        { content: "efg", createdAt: new Date(), id: uuid() },
      ],
    },
    {
      title: "note2",
      id: uuid(),
      color: "#FFC0CB",
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: [
        { content: "hij", createdAt: new Date(), id: uuid() },
        { content: "klm", createdAt: new Date(), id: uuid() },
      ],
    },
  ]);

  const addNewGroup = () => {
    const newGroup = {
      title: newGroupName,
      id: uuid(),
      color: newGroupColor,
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: [],
    };

    const newGroups = [newGroup, ...groups];
    setGroups(newGroups);
    _setNewGroupName("");
    _setNewGroupColor("#B38BFA");
    setisNewGroupDialougeOpen(false);
  };

  const addNewNote = () => {
    const newNote = {
      id: uuid(),
      content: newNoteContent,
      createdAt: new Date(),
    };

    const updatedGroups = [...groups];
    updatedGroups[selectedGroupIndex].notes.push(newNote);
    updatedGroups[selectedGroupIndex].updatedAt = new Date();

    setGroups(updatedGroups);
    _setNewNoteContent("");
  };

  const setNewGroupName = (event) => {
    _setNewGroupName(event.target.value);
  };

  const setNewGroupColor = (color) => {
    _setNewGroupColor(color);
  };

  const setSelectedGroupIndex = (index) => {
    _setSelectedGroupIndex(index);
  };

  const setnewNote = (event) => {
    _setNewNoteContent(event.target.value);
  };

  const toggleNote = () => {
    setisNewGroupDialougeOpen(!isNewGroupDialougeOpen);
  };

  return (
    <>
      <div className="main">
        <div className="notes-list">
          <p id="pockere-notes-heading">Pocket Notes</p>
          <div id="add-note">
            <div className="notes-added">
              {groups.map((group, index) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroupIndex(index)}
                >
                  {group.title}
                </button>
              ))}
            </div>
            <button onClick={toggleNote} id="add-button">
              +
            </button>
            {isNewGroupDialougeOpen && (
              <div className="overlay">
                <div className="create-new-group">
                  <h2>Create New Group</h2>
                  <label htmlFor="group-name">Group Name</label>
                  <input
                    id="group-name"
                    type="text"
                    value={newGroupName}
                    onChange={setNewGroupName}
                  />
                  <label htmlFor="group-color">Group Color</label>
                  <div name="group-color">
                    <button onClick={() => setNewGroupColor("#B38BFA")}>
                      purple
                    </button>
                    <button onClick={() => setNewGroupColor("#FF79F2")}>
                      pink
                    </button>
                    <button onClick={() => setNewGroupColor("#43E6FC")}>
                      green
                    </button>
                    <button onClick={() => setNewGroupColor("#F19576")}>
                      orange
                    </button>
                    <button onClick={() => setNewGroupColor("#0047FF")}>
                      blue
                    </button>
                    <button onClick={() => setNewGroupColor("#6691FF")}>
                      violet
                    </button>
                  </div>
                  {/* <input
                  name="group-name"
                  type="text"
                  value={newGroupColor}
                  onChange={setNewGroupColor}
                /> */}
                  <button onClick={addNewGroup}>Create</button>
                </div>
              </div>
            )}
          </div>
        </div>
        {selectedGroupIndex == null && (
          <div className="pocket-notes">
            <img src={pocketnotes} alt="pocketnotes-main-image" />
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <p>end-to-end encrypted</p>
          </div>
        )}
        {selectedGroupIndex !== null && (
          <div className="note-card-details">
            <div
              id="note-title"
              style={{ backgroundColor: groups[selectedGroupIndex].color }}
            >
              {/* <p>{groups[selectedGroupIndex].title[i] !=' ' ? <h2>{groups[selectedGroupIndex].title[0]}</h2> : <h2>groups[selectedGroupIndex].title[0]</h2> } </p> */}
              <p style={{ color: "white" }}>
                {" "}
                {groups[selectedGroupIndex].title[0]}
              </p>
              <p id="title">{groups[selectedGroupIndex].title}</p>
            </div>
            {/* <p>{groups[selectedGroupIndex].color}</p> */}
            <ol className="notes-group">
              {groups[selectedGroupIndex].notes.map((note) => (
                <li className="add-new-note" key={note.id}>
                  <div className="note-content">
                    <div>
                      <span>{note.content}</span>
                    </div>
                    <div>
                      <span>{note.createdAt.toDateString()}</span>
                      <span>
                        {" "}
                        <img
                          className="date-time"
                          src={dot}
                          alt="dot.png"
                        />{" "}
                      </span>
                      <span>
                        {note.createdAt.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="note-card-inputbox"></div>
            <div
              className="note-card"
              style={{ backgroundColor: groups[selectedGroupIndex].color }}
            >
              <div className="input-note-button">
                <input
                  type="text"
                  id="new-note"
                  value={newNoteContent}
                  onChange={setnewNote}
                />
                <button
                  onClick={addNewNote}
                  disabled={!newNoteContent}
                  style={{ color: groups[selectedGroupIndex].color }}
                >
                  <IoSendSharp />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
