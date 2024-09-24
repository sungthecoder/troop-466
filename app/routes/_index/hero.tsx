export interface HeroProps {
  title: string;
  lead: string;
}
export const Hero = ({ title, lead }: HeroProps) => (
  <div className="relative min-h-screen w-full bg-[url('/assets/image/troop466-hero.png')] bg-cover bg-no-repeat">
    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-troop466-900/60" />
    <div className="grid min-h-screen px-8">
      <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
        <h1 className="text-4xl font-bold text-white sm:text-6xl">{title}</h1>
        <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mt-6 mb-10 w-full md:max-w-full lg:max-w-3xl">
          {lead}
        </p>
      </div>
    </div>
  </div>
)