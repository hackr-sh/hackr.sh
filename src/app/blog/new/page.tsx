"use client";

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor } from "~/app/_components/block-note-editor";
import { useEffect } from "react";
import { type PartialBlock } from "@blocknote/core";

export default function NewBlog() {
  const editor = useCreateBlockNote();
  const utils = api.useUtils();
  const createOrUpdate = api.blogPost.createOrUpdate.useMutation({
    async onSuccess(data, variables, context) {
      console.log(data, variables, context);
      await utils.blogPost.invalidate();
      window.location.href = "/blog"; // for some reason redirect from next/navigation doesn't work
    }
  });
  const save = async (data: PartialBlock[]) => {
    if (createOrUpdate.isPending) return;
    createOrUpdate.mutate({
      title: await extractedTitle(data),
      synopsis: await extractedBodySynopsis(data),
      content: JSON.stringify(data)
    });
  };

  const extractedTitle = async (data: PartialBlock[]) => {
    if (document === undefined) return "";
    const span = document.createElement("span");
    span.innerHTML = await editor.blocksToFullHTML(data.slice(0, 1));
    return span.textContent ?? span.innerText;
  };

  const extractedBodySynopsis = async (data: PartialBlock[]) => {
    if (document === undefined) return "";
    const span = document.createElement("span");
    span.innerHTML = await editor.blocksToFullHTML(data.slice(1, 2));
    return (span.textContent ?? span.innerText).substring(0, 200) + "...";
  };

  const { status, data: session } = useSession();
  const isAuthorized = status === "authenticated" && session.user.email === "hackr@hackr.sh";

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

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