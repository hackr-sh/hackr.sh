"use client";

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { BlockNoteEditor, type EditorSubmitProps } from "~/app/_components/block-note-editor";
import { useEffect } from "react";
import { useMounted } from "~/hooks/use-mounted";

export default function NewBlog() {
  const mounted = useMounted();
  const utils = api.useUtils();
  const createOrUpdate = api.blogPost.createOrUpdate.useMutation({
    async onSuccess(data, variables, context) {
      console.log(data, variables, context);
      await utils.blogPost.invalidate();
      window.location.href = "/blog"; // for some reason redirect from next/navigation doesn't work
    }
  });
  const save = async (data: EditorSubmitProps) => {
    if (createOrUpdate.isPending) return;
    createOrUpdate.mutate({
      title: data.title,
      synopsis: data.synopsis,
      content: JSON.stringify(data.content)
    });
  };
  
  const { status, data: session } = useSession();
  const isAuthorized = status === "authenticated" && session.user.email === "hackr@hackr.sh";
  
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

  if (!mounted) return <></>;

  return <>
    <main className="min-w-[80vw] flex flex-col gap-8">
      {isAuthorized && <>
        <h1 className="text-3xl font-mono">New Blog Post</h1>
        <BlockNoteEditor
          inititalContent={[
            { type: "heading", content: "New Blog Post Title" },
            { type: "paragraph", content: "New Blog Post Synopsis" },
            { type: "paragraph", content: "" },
            { type: "paragraph", content: "New Blog Post Content" },
          ]}
          onSubmit={save}
          className="w-full flex-1 flex flex-col [&>div]:flex-1"
        />
      </>}
    </main>
  </>
}