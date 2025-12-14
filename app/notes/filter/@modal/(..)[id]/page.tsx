
"use client";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { useRouter } from "next/navigation";

export default function InterceptedNotePage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <NotePreview noteId={params.id} />
    </Modal>
  );
}