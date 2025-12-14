"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/notes"; 
import Link from "next/link";
import css from "./NoteList.module.css"; 

interface NoteListProps {
  tag?: string;
}

export default function NoteList({ tag }: NoteListProps) {
  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ["notes", tag], 

    queryFn: () => getNotes(tag),
  });

  if (isLoading) return <p className={css.loading}>Loading notes...</p>;
  if (isError) return <p className={css.error}>Error loading notes!</p>;
  
  if (!notes || notes.length === 0) {
    return <p className={css.empty}>No notes found.</p>;
  }

  return (
    <div className={css.listContainer}>
      {notes.map((note) => (
        <article key={note.id} className={css.card}>
          <div className={css.content}>
            <h3 className={css.cardTitle}>{note.title}</h3>
            <span className={css.date}>{new Date(note.date).toLocaleDateString()}</span>
          </div>
          <Link href={`/notes/${note.id}`} className={css.cardLink}>
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
}