"use client";

import { Note } from "@/types/note";
import NotePreview from "@/components/NotePreview/NotePreview";

interface Props {
  note: Note;
}

export default function NoteDetailsClient({ note }: Props) {
  return <NotePreview note={note} />;
}