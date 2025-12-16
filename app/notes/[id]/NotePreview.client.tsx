"use client";

import { Note } from "@/types/note";
import NotePreview from "@/components/NotePreview/NotePreview";

interface Props {
  note: Note;
}

export default function NotePreviewClient({ note }: Props) {
  return <NotePreview note={note} />;
}