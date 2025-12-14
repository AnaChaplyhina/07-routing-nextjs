
import NoteList from '@/components/NoteList/NoteList'; 
interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NoteListPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0]; 

  return (
    <section>
      <h1 style={{ marginBottom: '20px' }}>
        {!tag || tag === 'all' ? 'All Notes' : `Notes: ${tag}`}
      </h1>
      
      <NoteList tag={tag === 'all' ? undefined : tag} />
    </section>
  );
}