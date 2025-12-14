import NotePreview from '@/components/NotePreview/NotePreview';
import { getNoteById } from '@/lib/api/notes';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const note = await getNoteById(resolvedParams.id);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Link href="/notes/filter/all" style={{ marginBottom: '20px', display: 'inline-block' }}>
        ← Back to list
      </Link>
      
      <NotePreview note={note} />
    </div>
  );
}