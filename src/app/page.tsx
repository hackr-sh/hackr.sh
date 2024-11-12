import BlurFade from "~/components/ui/blur-fade";
import BlurIn from "~/components/ui/blur-in";
import HyperText from "~/components/ui/hyper-text";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { ProfilePicture } from "./_components/pfp";
import GridPattern from "~/components/ui/grid-pattern";
import { cn } from "~/lib/utils";
import { BentoCard, BentoGrid } from "~/components/ui/bento-grid";
import { DashboardSquare03Icon, GameController03Icon, KeyboardIcon } from "hugeicons-react"
import { StackIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.blogPost.getLatest.prefetch();
  }

  const bentoLinks = [
    {
      Icon: DashboardSquare03Icon,
      name: "HyprMac",
      href: "https://github.com/hackrmomo/hyprmac",
      cta: "GitHub",
      background: <>
        <Image src={"/bento/hyprmac.png"} alt="HyprMac" fill objectFit="cover" />
      </>,
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-3",
    },
    {
      Icon: KeyboardIcon,
      name: "Clackr",
      href: "https://github.com/hackrmomo/clackr",
      cta: "GitHub",
      background: <>
        <Image src={"/bento/clackr.png"} alt="Clackr" fill objectFit="cover" />
      </>,
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4",
    },
    {
      Icon: GameController03Icon,
      name: "ReEarth",
      href: "/blog/reearth",
      cta: "Read Blog Post",
      background: <>
        <Image src={"/bento/reearth.png"} alt="ReEarth" fill objectFit="cover" />
      </>,
      className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-4",
    },
    {
      Icon: StackIcon,
      name: "StackyBar",
      href: "https://github.com/hackrmomo/stackybar",
      cta: "GitHub",
      background: <>
        <GridPattern />
      </>,
      className: "lg:row-start-2 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    },
  ];

  return (
    <HydrateClient>
      <main>
        <GridPattern
          strokeDasharray="4 2"
          className={cn("[mask-image:radial-gradient(60vw_circle_at_center,white,transparent)]") + " fixed"}
        />
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
                  text-slate-200
                  text-xs md:text-sm lg:text-base
                "
                text={`I'm a software engineer with ${Math.floor((Date.now() - 1514764800000) / 1000 / 60 / 60 / 24 / 365.25)} years of experience, primarily in the fields of web and mobile development.`}
              />
            </BlurFade>
            <BlurFade delay={0.6}>
              <HyperText
                className="
                  text-slate-200
                  text-xs md:text-sm lg:text-base
                "
                text="Here's a couple of things I'm currently working on:"
              />
            </BlurFade>
          </div>
        </div>
        <BentoGrid className="mt-8">
          {bentoLinks.map((bento, i) => (
            <BentoCard
              key={bento.name}
              href={bento.href}
              Icon={bento.Icon}
              name={bento.name}
              background={bento.background}
              cta={bento.cta}
              className={bento.className}
              delay={0.9 + i * 0.15}
            />
          ))}
        </BentoGrid>
        {/* Construction Sign */}
        <BlurIn className="flex flex-row items-center gap-2 fixed bottom-0 left-0 p-4 w-screen justify-center" delay={3} duration={0.3}>
          <span className="text-xs">🚧</span>
          <span className="text-base font-mono">please mind the scaffolding, the website is still under construction</span>
          <span className="text-xs">🚧</span>
        </BlurIn>
      </main>
    </HydrateClient>
  );
}
