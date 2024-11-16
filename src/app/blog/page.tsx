"use client";

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import BlurFade from "~/components/ui/blur-fade";
import { redirect } from "next/navigation";

export default function Blog() {
  const listAll = api.blogPost.listAll.useQuery();
  const utils = api.useUtils();
  const deleteSingle = api.blogPost.delete.useMutation();
  const debugDeleteAll = api.blogPost.debugDeletaAll.useMutation({
    onSuccess: async () => {
      await utils.blogPost.invalidate();
    }
  });
  const { status, data: session } = useSession();
  const isAuthorized = status === "authenticated" && session.user.email === "hackr@hackr.sh";

  return <>
    <main className="min-w-[80vw] h-screen flex flex-col justify-start items-center gap-4">
      <BlurFade>
        <h1 className="text-2xl font-mono">hackr.sh | blog</h1>
      </BlurFade>
      <BlurFade delay={0.3} className="flex-1 flex flex-col w-full">
        <Card className="min-w-full h-full flex flex-col bg-cyan-900/20 p-8">
          <CardHeader>
            {isAuthorized &&
              <Link className="w-full" href="/blog/new"><Button className="w-full text-xl p-8" variant="ghost">New Blog Post</Button></Link>
            }
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-1">
            <>
              <div className="flex-1 gap-20 flex flex-col">
                {listAll.data?.map((blogPost, i) => (
                  <Link href={`/blog/${blogPost.id}`} key={blogPost.id} className="flex flex-col gap-2 w-full hover:scale-[1.02] transition-all duration-300">
                    <BlurFade delay={0.1 + i * 0.15}>
                      <h2 className="text-xl font-mono">{blogPost.title}</h2>
                    </BlurFade>
                    <BlurFade delay={0.2 + i * 0.15}>
                      <div className="relative">
                        <span className="text-slate-400">{blogPost.synopsis}</span>
                        <div className="absolute bottom-0 right-0 flex gap-2 items-center z-10">
                          {isAuthorized && <Button onClick={(e) => { e.preventDefault(); redirect(`/blog/${blogPost.id}/edit`) }} variant="ghost">Edit</Button>}
                          {isAuthorized && <Button onClick={async (e) => { e.preventDefault(); deleteSingle.mutate({ id: blogPost.id }); await utils.blogPost.invalidate() }} variant="destructive">Delete</Button>}
                        </div>
                      </div>
                    </BlurFade>
                  </Link>
                ))}
              </div>
            </>
          </CardContent>

          <CardFooter>
            {isAuthorized &&
              <Button className="w-full text-xl p-8" variant="destructive" onClick={() => debugDeleteAll.mutate()}>Delete All</Button>
            }
          </CardFooter>
        </Card>
      </BlurFade>
    </main>
  </>
}