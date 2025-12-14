import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { getNoteById } from '@/lib/api/notes';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InterceptedNotePage({ params }: PageProps) {
  const resolvedParams = await params;
  const note = await getNoteById(resolvedParams.id);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}