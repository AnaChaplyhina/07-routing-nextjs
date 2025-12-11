
import { Note } from '@/types/note';
import css from './NotePreview.module.css';

export default function NotePreview({ note }: { note: Note }) {
  return (
    <article className={css.container}>
      <header className={css.header}>
        <h2 className={css.title}>{note.title}</h2>
        <span className={css.date}>{note.date}</span>
      </header>
      <p className={css.content}>{note.content}</p>
    </article>
  );
}