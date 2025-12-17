"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/notes";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm"; 
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce"; 
import css from "./Notes.module.css";

interface Props {
  tag?: string;
}

export default function NotesClient({ tag }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const initialSearch = searchParams.get("search") || "";
  const initialPage = Number(searchParams.get("page")) || 1;
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    if (debouncedSearch !== initialSearch) {
      params.set("page", "1");
      setCurrentPage(1);
    } else {
      params.set("page", currentPage.toString());
    }

    replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, currentPage, replace, pathname]); 


  const {
    data: notes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", tag, debouncedSearch, currentPage],
    queryFn: () => getNotes(tag, debouncedSearch, currentPage),
    placeholderData: (previousData) => previousData, 
  });

  return (
    <div className={css.container}>
      <div className={css.controls}>

        <button 
          className={css.createButton} 
          onClick={() => setIsModalOpen(true)}
          style={{ marginRight: 'auto' }} 
        >
          + Create Note
        </button>

        <SearchBox 
          value={searchTerm} 
          onChange={(val) => setSearchTerm(val)} 
        />
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm /> 
        </Modal>
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      
      <NoteList notes={notes} />

      <div className={css.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={5} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}