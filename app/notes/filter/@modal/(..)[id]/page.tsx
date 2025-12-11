
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { getNoteById } from '@/lib/api/notes';

export default async function InterceptedNote({ params }: { params: { id: string } }) {
  const note = await getNoteById(params.id);
  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}