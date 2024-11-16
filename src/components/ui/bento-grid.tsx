import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import BlurFade from "./blur-fade";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  delay = 0,
}: {
  name: string;
  className?: string;
  background?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any
  description?: string;
  href?: string;
  cta?: string;
  delay?: number;
}) => (
  <div className={cn(
    "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl hover:scale-105 transition-all duration-300 h-[352px]",
    // light styles
    "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
    // dark styles
    "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
    className,
  )}>
    <BlurFade
      delay={delay}
      key={name}
      className="flex flex-col justify-between h-[352px]"
    >
      <div className="absolute w-full h-[352px] filter brightness-50 saturate-50 blur-sm transition-all hover:blur-0 scale-150">{background}</div>
      <span></span>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        {Icon && <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-200 transition-all duration-300 ease-in-out group-hover:scale-75" />}
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-400">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </BlurFade>
  </div >
);

export { BentoCard, BentoGrid };
