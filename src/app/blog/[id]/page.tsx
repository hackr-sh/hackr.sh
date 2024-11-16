"use client";

import { type PartialBlock } from '@blocknote/core';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlockNoteViewer } from '~/app/_components/block-note-viewer';
import { api } from '~/trpc/react';

export default function BlogPage() {
  const { id: blogPostId } = useParams();
  const getBlogPostById = api.blogPost.getDetail.useQuery({ id: blogPostId as string });
  const [validatedData, setValidatedData] = useState<PartialBlock[]>([]);

  useEffect(() => {
    if (!getBlogPostById.data) return;
    const blocks = JSON.parse(getBlogPostById.data.content) as PartialBlock[];
    setValidatedData(blocks);
  }, [getBlogPostById.data]);

  return <main className="min-w-[80vw] h-screen flex flex-col justify-start items-center gap-4">
    {
      getBlogPostById.isLoading ?
        <p>Loading...</p>
        :
        <>
          <BlockNoteViewer className="pb-16" blocks={validatedData} />
        </>
    }
  </main>;
}