"use client";

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { BlockNoteEditor, type EditorSubmitProps } from "~/app/_components/block-note-editor";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import BlurFade from "~/components/ui/blur-fade";
import { type PartialBlock } from "@blocknote/core";
import { useMounted } from "~/hooks/use-mounted";

export default function EditBlog() {
  const mounted = useMounted();
  const { id } = useParams();
  const utils = api.useUtils();
  const [validatedData, setValidatedData] = useState<PartialBlock[] | undefined>(undefined);
  const createOrUpdate = api.blogPost.createOrUpdate.useMutation({
    async onSuccess() {
      await utils.blogPost.invalidate();
      window.location.href = "/blog"; // for some reason redirect from next/navigation doesn't work
    }
  });
  const getBlogPostById = api.blogPost.getDetail.useQuery({ id: id as string });
  const save = async (data: EditorSubmitProps) => {
    if (createOrUpdate.isPending) return;
    createOrUpdate.mutate({
      id: id as string,
      title: data.title,
      synopsis: data.synopsis,
      content: JSON.stringify(data.content)
    });
  };
  const { status, data: session } = useSession();
  const isAuthorized = status === "authenticated" && session.user.email === "hackr@hackr.sh";

  useEffect(() => {
    if (!getBlogPostById.data) return;
    const blocks = JSON.parse(getBlogPostById?.data?.content ?? "") as PartialBlock[];
    setValidatedData(blocks);
  }, [getBlogPostById.data]);

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

  if (!mounted) return <></>;

  return <>
    <main className="min-w-[80vw] flex flex-col gap-8">
      {isAuthorized && !getBlogPostById.isLoading && <>
        <BlurFade>
          <h1 className="text-3xl font-mono">Edit Blog Post</h1>
        </BlurFade>
        <BlurFade className="flex-1 flex flex-col w-full">
          <BlockNoteEditor
            inititalContent={validatedData}
            onSubmit={save}
            className="w-full flex-1 flex flex-col [&>div]:flex-1"
          />
        </BlurFade>
      </>}
      {isAuthorized && getBlogPostById.isLoading && <>
        <BlurFade>
          <Loader2 className="animate-spin w-8 h-8" />
        </BlurFade>
      </>}
    </main>
  </>
}