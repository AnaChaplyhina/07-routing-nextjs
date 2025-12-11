import { getNotes } from '@/lib/api/notes';
import Link from 'next/link';
import css from './NoteList.module.css';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NoteListPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || 'all';
  const notes = await getNotes(tag);

  return (
    <section>
      <h1 style={{ marginBottom: '20px' }}>
        {tag === 'all' ? 'All Notes' : `Notes: ${tag}`}
      </h1>
      
      {notes.length === 0 ? (
        <p className={css.emptyState}>No notes found. Create one in the sidebar!</p>
      ) : (
        <div className={css.listContainer}>
          {notes.map((note) => (
            <article key={note.id} className={css.card}>
              <div>
                <h3 className={css.cardTitle}>{note.title}</h3>
                <span className={css.cardDate}>{new Date(note.date).toLocaleDateString()}</span>
              </div>
              <Link href={`/notes/${note.id}`} className={css.cardLink}>
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}