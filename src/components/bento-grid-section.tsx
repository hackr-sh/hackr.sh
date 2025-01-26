import { StackIcon } from "@radix-ui/react-icons"
import { DashboardSquare03Icon, GameController03Icon } from "hugeicons-react"
import { KeyboardIcon } from "lucide-react"
import { BentoGrid, BentoCard } from "~/components/ui/bento-grid"
import GridPattern from "~/components/ui/grid-pattern"

export const BentoGridSection = () => {
  return <BentoGrid className="mt-8">
    <BentoCard
      Icon={DashboardSquare03Icon}
      href="https://github.com/m-ahdal/hyprmac"
      name="HyprMac"
      cta="GitHub"
      background={<>
        <img src={"/bento/hyprmac.png"} alt="HyprMac" />
      </>}
      className="lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-3"
      delay={0.9 + 0 * 0.15}
    />
    <BentoCard
      Icon={KeyboardIcon}
      href="https://github.com/m-ahdal/clackr"
      name="Clackr"
      cta="GitHub"
      background={<>
        <img src={"/bento/clackr.png"} alt="Clackr" />
      </>}
      className="lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4"
      delay={0.9 + 1 * 0.15}
    />
    <BentoCard
      Icon={GameController03Icon}
      href="/blog/reearth"
      name="ReEarth"
      cta="Read Blog Post"
      background={<>
        <img src={"/bento/reearth.png"} alt="ReEarth" />
      </>}
      className="lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-4"
      delay={0.9 + 2 * 0.15}
    />
    <BentoCard
      Icon={StackIcon}
      href="https://github.com/m-ahdal/stackybar"
      name="StackyBar"
      cta="GitHub"
      background={<>
        <GridPattern />
      </>}
      className="lg:row-start-2 lg:row-end-3 lg:col-start-1 lg:col-end-2"
      delay={0.9 + 3 * 0.15}
    />
  </BentoGrid>
}