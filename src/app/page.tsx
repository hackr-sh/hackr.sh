import Image from "next/image";
import BlurFade from "~/components/ui/blur-fade";
import BlurIn from "~/components/ui/blur-in";
import HyperText from "~/components/ui/hyper-text";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { ProfilePicture } from "./_components/pfp";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.blogPost.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="
        min-h-screen 
        2xl:max-w-[1200px]
        xl:max-w-[800px] 
        lg:max-w-[800px] 
        md:max-w-[600px] 
        sm:max-w-[400px]
        max-w-full
        text-white 
        flex 
        flex-col 
        justify-center 
        items-center
        p-4
      ">
        <div className="flex flex-row items-center justify-center gap-4">
          <BlurFade>
            <ProfilePicture />
          </BlurFade>
          <div>
            <BlurFade>
              <HyperText
                className="text-xl md:text-2xl lg:text-4xl"
                text="Hey! I'm Mohammad Al-Ahdal"
              />
            </BlurFade>
            <BlurFade delay={0.3}>
              <HyperText
                className="
                  text-slate-400
                  text-xs md:text-sm lg:text-base
                "
                text={`I'm a software engineer with ${Math.floor((Date.now() - 1514764800000) / 1000 / 60 / 60 / 24 / 365.25)} years of experience in the field.`}
              />
            </BlurFade>
            {/* Construction Sign */}
            <BlurIn className="flex flex-row items-center gap-2 absolute bottom-0 left-0 p-4 w-screen justify-center" delay={3} duration={0.3}>
              <span className="text-xs">🚧</span>
              <span className="text-base font-mono">please mind the scaffolding, the website is still under construction</span>
              <span className="text-xs">🚧</span>
            </BlurIn>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
