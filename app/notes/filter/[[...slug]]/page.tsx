
import { getNotes } from '@/lib/api/notes';
import Link from 'next/link';

export default async function FilteredNotesPage({ params }: { params: { slug?: string[] } }) {
  const tag = params.slug?.[0] || 'all';
  const notes = await getNotes(tag);

  return (
    <div className="notes-list"> 
     
      {notes.map((note) => (
        <div key={note.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
          <h3>{note.title}</h3>
          <p>{note.date}</p>
        
          <Link href={`/notes/${note.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}