"use client";

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getNotes } from '../../../../lib/api/notes';
import { Note } from '../../../../types/note';

import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import NoteList from '../../../../components/NoteList/NoteList';

interface NotesClientProps {
  tag: string;
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, currentPage],
    queryFn: () => getNotes(tag, debouncedSearch, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notes!</div>;

  const notes: Note[] = Array.isArray(data) ? data : [];
  const totalPages = 1;

  return (
    <div className="notes-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <SearchBox value={search} onChange={setSearch} />
        <button onClick={() => setIsModalOpen(true)}>Add Note</button>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <div>No notes found</div>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}