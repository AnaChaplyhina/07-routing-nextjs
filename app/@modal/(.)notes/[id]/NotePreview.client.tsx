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

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteById(noteId),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <Modal>Loading...</Modal>;
  if (!note) return null;

  return (

    <Modal> 
      <NotePreview note={note} />
    </Modal>
  );
}