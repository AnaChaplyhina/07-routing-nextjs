
import NotePreview from '@/components/NotePreview/NotePreview';
import { getNoteById } from '@/lib/api/notes';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: string } }) {
  const note = await getNoteById(params.id);
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Link href="/notes/filter/all">← Back to list</Link>
      <div style={{ marginTop: '20px' }}>
        <NotePreview note={note} />
      </div>
    </div>
  );
}