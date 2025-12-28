"use client";

import { useState, useEffect } from 'react';
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

export function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    setCurrentPage(1);
    setSearch('');
  }, [tag]);

  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, currentPage],
    queryFn: () => getNotes(tag, debouncedSearch, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notes!</div>;

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="notes-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button onClick={() => setIsModalOpen(true)}>Add Note</button>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}

      <NoteList notes={notes} />

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