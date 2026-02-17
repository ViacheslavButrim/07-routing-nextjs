"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface Props {
  tag: string;
}

export default function Notes({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 10,
        search: debouncedSearch || undefined,
        tag: tag !== "all" ? tag : undefined,
      }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading notes</p>;

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Create note</button>

      <SearchBox onSearch={setSearch} />

      {data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

     <Pagination
  currentPage={page}
  totalPages={data.totalPages}
  onPageChange={setPage}
/>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}