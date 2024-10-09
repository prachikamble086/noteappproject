import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import pocketnotes from "./images/pocketnotes-main.png";
import dot from "./images/dot.png";
import firstpage from "./images/firstpage.png";
import arrow from "./images/arrow.png";

import { useMediaQuery, useMediaQueries } from "@react-hook/media-query";

import { IoSendSharp } from "react-icons/io5";

function App() {
  const [selectedGroupIndex, _setSelectedGroupIndex] = useState(null);

  const [newGroupName, _setNewGroupName] = useState("");
  const [newGroupColor, _setNewGroupColor] = useState("");

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

  const groupHeading = (a) => {
    const word = a.split(" ");
    const titleName = word.map((word) => word[0]);
    return titleName;
  };

  const isSmallScreen = useMediaQuery("max-width:767px");

  const handlekeydown = (event) => {
    if (event.key === "Enter" && newNoteContent !== "") {
      newNoteContent();
    }
  };

  return (
    <>
      <div className="main">
        <div className="notes-list">
          <p id="pocket-notes-heading">Pocket Notes</p>
          <div id="add-note">
            <div className="notes-added">
              {groups.map((group, index) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroupIndex(index)}
                >
                  <div className="group-initial-title">
                    <div
                      className="title-circle"
                      style={{
                        backgroundColor: group.color,
                      }}
                    >
                      {groupHeading(group.title)}
                    </div>
                    {group.title}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={toggleNote}
              id="add-button"
              style={{
                backgroundColor: "#001F8B",
              }}
            >
              +
            </button>

            {isNewGroupDialougeOpen && (
              <div className="overlay">
                <div className="create-new-group">
                  <h2 className="create-new-group-header">Create New Group</h2>
                  <div className="group-input-name">
                    <label htmlFor="group-name">Group Name</label>
                    <input
                      id="group-name"
                      type="text"
                      value={newGroupName}
                      onChange={setNewGroupName}
                    />
                  </div>

                  <div className="group-color-button">
                    <label htmlFor="group-color">Group Color</label>
                    <div name="group-color" className="group-color">
                      <button
                        className="choose-color"
                        onClick={() => setNewGroupColor("#B38BFA")}
                        style={{ backgroundColor: "#B38BFA" }}
                      ></button>
                      <button
                        className="choose-color"
                        onClick={() => setNewGroupColor("#FF79F2")}
                        style={{ backgroundColor: "#FF79F2" }}
                      ></button>
                      <button
                        className="choose-color"
                        onClick={() => setNewGroupColor("#43E6FC")}
                        style={{ backgroundColor: "#43E6FC" }}
                      ></button>
                      <button
                        className="choose-color"
                        onClick={() => setNewGroupColor("#F19576")}
                        style={{ backgroundColor: "#F19576" }}
                      ></button>
                      <button
                        className="choose-color"
                        onClick={() => setNewGroupColor("#0047FF")}
                        style={{ backgroundColor: "#0047FF" }}
                      ></button>
                      <button
                        className="choose-color"
                        onClick={() => setNewGroupColor("#6691FF")}
                        style={{ backgroundColor: "#6691FF" }}
                      ></button>
                    </div>
                  </div>

                  {/* <input
                    name="group-name"
                    type="text"
                    value={newGroupColor}
                    onChange={setNewGroupColor}
                  /> */}

                  <button
                    onClick={addNewGroup}
                    disabled={!newGroupName || newGroupColor === ""}
                    className="create-button"
                  >
                    Create
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {selectedGroupIndex == null && (
          <div className="pocket-notes">
            <div className="pocketnotes-img-para">
              <img
                src={pocketnotes}
                alt="pocketnotes-main-image"
                className="pocket-notes-img"
              />
              <h1 className="pocket-notes-header">Pocket Notes</h1>
              <p className="pocket-notes-para">
                Send and receive messages without keeping your phone online. Use
                Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
            <p className="pocket-notes-encryption">
              {" "}
              <img src={firstpage} alt="firstPage" />
              {"  "}end-to-end encrypted
            </p>
          </div>
        )}

        {selectedGroupIndex !== null && (
          <div className="note-card-details">
            <div id="note-title" style={{ backgroundColor: "#001F8B" }}>
              <button
                className="title-button"
                onClick={() => setSelectedGroupIndex(null)}
              >
                <img
                  src={arrow}
                  alt="arrow
                "
                />
              </button>
              <div
                className="group-color-title"
                style={{
                  backgroundColor: groups[selectedGroupIndex].color,
                }}
              >
                <div
                  className="note-color-title"
                  style={{
                    backgroundColor: groups[selectedGroupIndex].color,
                  }}
                >
                  {" "}
                  {groupHeading(groups[selectedGroupIndex].title).join("")}
                </div>
              </div>
              <p id="title">{groups[selectedGroupIndex].title}</p>
            </div>

            <ol className="notes-group">
              {groups[selectedGroupIndex].notes
                .slice()
                .reverse()
                .map((note) => (
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
            <div className="note-card" style={{ backgroundColor: "#001F8B" }}>
              <div className="note-card-button">
                <div className="input-note-and-button">
                  <input
                    type="text"
                    id="new-note"
                    placeholder="Here’s the sample text for sample work"
                    value={newNoteContent}
                    onChange={setnewNote}
                    onKeyDown={handlekeydown}
                  />
                  <button
                    id="input-button"
                    onClick={addNewNote}
                    disabled={!newNoteContent}
                    style={{ color: "#001F8B" }}
                  >
                    <IoSendSharp />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
