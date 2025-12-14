"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes"; 
import Link from "next/link";
import css from "./NoteList.module.css";


interface NoteListProps {
  tag?: string; 
}

export default function NoteList({ tag }: NoteListProps) {
  const page = 1;
  const perPage = 9;

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", page, tag],
    queryFn: () => fetchNotes({ page, perPage, tag }),
  });

  if (isLoading) {
    return <p className={css.loading}>Loading notes...</p>;
  }

  if (isError) {
    return <p className={css.error}>Error loading notes. Please try again.</p>;
  }

  const notes = data?.notes || [];

  if (notes.length === 0) {
    return <p className={css.empty}>No notes found for this category.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            <h3 className={css.noteTitle}>{note.title}</h3>
            <span className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}