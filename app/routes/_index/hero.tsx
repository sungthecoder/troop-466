import { HeroContent } from "~/lib/get-hero";

interface HeroProp extends HeroContent {
  html: string;
}

export const Hero = ({ greeting, html }: HeroProp) => (
  <div className="hero min-h-screen bg-[url('/assets/image/troop466-hero.png')]">
    <div className="hero-overlay bg-opacity-60 bg-gradient-to-b from-troop466-900/60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-lg text-troop466-50">
        <h1 className="mb-5 text-5xl font-bold font-serif">{greeting}</h1>
        <div className="mb-5" dangerouslySetInnerHTML={{ __html: html }} />
        {/* <button className="btn btn-primary">Get Started</button> */}
      </div>
    </div>
  </div>
);
