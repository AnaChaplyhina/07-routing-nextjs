"use client";

import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "@/lib/api/notes";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { useRouter } from "next/navigation";

interface Props {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: Props) {
  const router = useRouter();

  const { 
    data: note, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteById(noteId),
    refetchOnMount: false, 
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div style={{ padding: 20 }}>Loading note...</div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <div style={{ padding: 20, color: 'red' }}>
          <h2>Error</h2>
          <p>Failed to load note details.</p>
          <button onClick={handleClose}>Close</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={note} />
    </Modal>
  );
}