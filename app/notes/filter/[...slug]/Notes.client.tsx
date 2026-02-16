"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import type { Note } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export default function FilteredNotesClient() {
  const params = useParams();
  const slug = params.slug as string[];
  const tag = slug?.[0] === "all" ? undefined : slug?.[0];

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  const notes = data?.notes ?? [];

  return <>{notes.length ? <NoteList notes={notes} /> : <p>No notes found.</p>}</>;
}