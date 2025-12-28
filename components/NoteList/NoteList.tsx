"use client";

import Link from "next/link";
import { Note } from "@/types/note"; 
import css from "./NoteList.module.css"; 

interface NoteListProps {
  notes?: Note[]; 
}

export default function NoteList({ notes = [] }: NoteListProps) {
  if (!notes || notes.length === 0) {
    return <p className={css.empty}>No notes found.</p>;
  }

  return (
    <div className={css.listContainer}>
      {notes.map((note) => (
        <article key={note.id} className={css.card}>
          <div className={css.content}>
            <h3 className={css.cardTitle}>{note.title}</h3>
            <span className={css.date}>
              {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'No date'}
            </span>
          </div>
          <Link href={`/notes/${note.id}`} className={css.cardLink}>
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
}