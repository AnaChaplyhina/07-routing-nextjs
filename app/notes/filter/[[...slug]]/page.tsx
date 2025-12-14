import NoteList from '@/components/NoteList/NoteList';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NoteListPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tagParam = resolvedParams.slug?.[0];
  const activeTag = tagParam === 'all' ? undefined : tagParam;

  return (
    <section>
      <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }}>
        {!activeTag ? 'All Notes' : `Notes: ${activeTag}`}
      </h1>
      
      <NoteList tag={activeTag} />
    </section>
  );
}