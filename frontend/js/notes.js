document.addEventListener("DOMContentLoaded", () => {
  const createNoteForm = document.getElementById("createNoteForm");
  const notesList = document.getElementById("notesList");

  createNoteForm.addEventListener("click", async (event) => {
    event.preventDefault();
    const noteTitle = document.getElementById("noteTitle").value.trim();
    const noteContent = document.getElementById("noteContent").value.trim();
    const noteColor = document.getElementById("noteColor").value.trim();
    const noteTags = document.getElementById("noteTag").value.trim();

    // Check if all fields are filled
    if (!noteTitle || !noteContent || !noteColor || !noteTags) {
      alert("All fields are required.");
      return;
    }
    const Token = localStorage.getItem("token");
    try {
      console.log(Token, noteTitle, noteContent, noteColor, noteTags);
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "66997a86bd8d63fa5d3850eb",
          title: noteTitle,
          content: noteContent,
          color: noteColor,
          tags: noteTags,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const data = await response.json();

      if (data._id) {
        // Display new note
        const noteCard = document.createElement("div");
        noteCard.className = "note-card";
        noteCard.style.backgroundColor = data.color;
        noteCard.innerHTML = `
          <h3>${data.title}</h3>
          <p>${data.content}</p>
          <p><strong>Tags:</strong> ${data.tags}</p>
        `;
        notesList.appendChild(noteCard);
        // Clear form fields
      } else {
        alert("Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Error creating note: " + error.message);
    }
  });

  // Function to load notes (if needed)
  async function loadNotes() {
    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load notes");
      }

      const notes = await response.json();
      displayNotes(notes);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }

  function displayNotes(notes) {
    notesList.innerHTML = "";

    notes.forEach((note) => {
      const noteCard = document.createElement("div");
      noteCard.className = "note-card";
      noteCard.style.backgroundColor = note.color;
      noteCard.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <p><strong>Tags:</strong> ${note.tags}</p>
      `;
      notesList.appendChild(noteCard);
    });
  }

  // Load notes on page load
  loadNotes();
});

logoutButton.addEventListener("click", function () {
  localStorage.removeItem("token");
  alert("Logout successful");
  window.location.href = "auth.html"; // Redirect to login/register page
});
