import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag ?? "all", "", 1],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 10,
        tag: tag !== "all" ? tag : undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag ?? "all"} />
    </HydrationBoundary>
  );
}