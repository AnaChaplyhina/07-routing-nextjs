import { getNoteById } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
// Імпортуємо наш новий клієнтський компонент (шлях через крапку)
import NotePreviewClient from './NotePreview.client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InterceptedNotePage({ params }: PageProps) {
  const resolvedParams = await params;
  const note = await getNoteById(resolvedParams.id);

  return (
    <Modal>
      <NotePreviewClient note={note} />
    </Modal>
  );
}