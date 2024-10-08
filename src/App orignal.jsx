import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
  const [selectedGroupIndex, _setSelectedGroupIndex] = useState(null);
  const [newGroupName, _setNewGroupName] = useState("");
  const [newGroupColor, _setNewGroupColor] = useState("");

  const [newNoteContent, _setNewNoteContent] = useState("");

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
    _setNewGroupColor("");
  };

  const addNewNote = () => {
    const newNote = {
      id: uuid(),
      content: newNoteContent,
      createdAt: new Date(),
    };

    const updatedNoteGroup = [...groups.notes];
    updatedNoteGroup.push(newNote);
    setGroups(updatedNoteGroup);
    _setNewNoteContent("");
  };

  const setNewGroupName = (event) => {
    _setNewGroupName(event.target.value);
  };

  const setNewGroupColor = (event) => {
    _setNewGroupColor(event.target.value);
  };

  const setSelectedGroupIndex = (index) => {
    _setSelectedGroupIndex(index);
  };

  const setnewNote = (event) => {
    _setNewNoteContent(event.target.value);
  };

  return (
    <>
      <div className="main">
        <div id="add-note">
          {groups.map((group, index) => (
            <button key={group.id} onClick={() => setSelectedGroupIndex(index)}>
              {group.title}
            </button>
          ))}
        </div>
        {selectedGroupIndex !== null && (
          <div>
            <p>{groups[selectedGroupIndex].title}</p>
            <p>{groups[selectedGroupIndex].color}</p>
            <ol>
              {groups[selectedGroupIndex].notes.map((note) => (
                <li key={note.id}>
                  <span>{note.content}</span>
                  <span>{note.createdAt.toString()}</span>
                </li>
              ))}
            </ol>

            <input
              type="text"
              id="new-note"
              value={newNoteContent}
              onChange={setnewNote}
            />
            <button onClick={addNewNote}>Add note</button>
          </div>
        )}

        <h2>Add group</h2>
        <label htmlFor="group-name">Group Name</label>
        <input
          id="group-name"
          type="text"
          value={newGroupName}
          onChange={setNewGroupName}
        />
        <label htmlFor="group-color">Group Color</label>
        <input
          name="group-name"
          type="text"
          value={newGroupColor}
          onChange={setNewGroupColor}
        />
        <button onClick={addNewGroup}>Add group</button>
      </div>
    </>
  );
}

export default App;
