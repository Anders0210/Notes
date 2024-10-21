import { useState, useEffect } from "react";
import { db } from "./components/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState<
    { id: string; title: string; note: string }[]
  >([]);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [edit, setEdit] = useState("");

  // Henter alle noter fra Firestore, og sætter dem i state
  const fetchNotes = async () => {
    const querySnapshot = await getDocs(collection(db, "notes")); // Fortæller Firestore at vi vil have alle noter fra collection "notes"
    // Map over alle noter, og sæt dem i state
    const notesArray = querySnapshot.docs.map((doc) => {
      const data = doc.data() as { title: string; note: string };
      return { id: doc.id, ...data };
    });
    setNotes(notesArray);
  };

  // Hent alle noter fra Firestore, når komponenten mounter
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const title = (event.target as any).title.value;
    const note = (event.target as any).note.value;
    try {
      // Hvis der mangler en titel eller tekst i tekstfeltet, skal den ikke uploade til Firestore
      if (title === "" || note === "") {
        alert("Du skal udfylde både titel og noget du har noteteret.");
        return;
      }
      // Tjek om noten er ved at blive opdateret, hvis ja så erstart notens indhold, og sæt edit til tom string
      if (edit !== "") {
        setDoc(doc(db, "notes", edit), {
          title,
          note,
        });
        setEdit("");
        return;
      } else {
        addDoc(collection(db, "notes"), {
          title,
          note,
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      fetchNotes();
      // Reset form
      (event.target as any).reset();
      setTitle("");
      setNote("");
    }
  };

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
    fetchNotes();
  };

  const updateNote = async (id: string) => {
    // Opdater en note i Firestore
    const docRef = doc(db, "notes", id);
    const docSnap = await getDoc(docRef);
    // Hvis noten findes, så indsæt både titel og note i felterne, så brugeren kan redigere dem
    if (docSnap.exists()) {
      setTitle(docSnap.data().title);
      setNote(docSnap.data().note);
      // Sæt edit til id på noten i firebase, så vi kan opdatere den
      setEdit(id);
    } else {
      console.log("No such document!");
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-row justify-between gap-6 p-12 bg-darkGray rounded shadow-md shadow-black m-16">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-medium">Mine Noter</h2>
          <hr className="border-gray-500 border-2 rounded-xl" />
          <ul className="flex flex-col gap-4">
            {notes.map((note) => (
              <li
                className="flex flex-col gap-2 bg-gray-800 p-2 rounded-md"
                key={note.id}
              >
                <div className="flex justify-between">
                  <h3 className="text-xl text-white">{note.title}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => deleteNote(note.id)}>
                      <img src="/trash.svg" />
                    </button>
                    <button onClick={() => updateNote(note.id)}>
                      <img src="/edit.svg" />
                    </button>
                  </div>
                </div>
                <p className="text-white/80">{note.note}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-3xl font-medium">Tilføj ny Note</h2>
          <hr className="border-gray-500 border-2 rounded-xl" />
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <input
                className="p-2 bg-gray-700 text-white"
                type="text"
                name="title"
                id="title"
                placeholder="Titel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="p-2 bg-gray-700 text-white"
                name="note"
                id="note"
                rows={4}
                placeholder="Skriv din note her..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <button className="bg-blue-500 text-white p-2 rounded">
                {edit !== "" ? "Opdater Note" : "Tilføj Note"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
