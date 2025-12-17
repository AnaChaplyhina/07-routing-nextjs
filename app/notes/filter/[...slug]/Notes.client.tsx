"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/notes";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import css from "./Notes.module.css"; 

interface Props {
  tag?: string;
}

export default function NotesClient({ tag }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search") || "";

  const {
    data: notes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", tag, searchTerm, currentPage],
    queryFn: () => getNotes(tag, searchTerm, currentPage),
  });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={css.container}>
      <div className={css.controls}>
        <SearchBox />
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      
      <NoteList notes={notes} />

      <div className={css.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={5} 
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}