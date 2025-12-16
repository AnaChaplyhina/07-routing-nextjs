"use client";

import { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";

interface Props {
  notes: Note[];
}

export default function NotesClient({ notes }: Props) {
  return <NoteList notes={notes} />;
}