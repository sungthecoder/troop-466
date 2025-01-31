export interface HeroProps {
  title: string;
  lead: string;
}
export const Hero = ({ title, lead }: HeroProps) => (
  <div className="hero min-h-screen bg-[url('/assets/image/troop466-hero.png')]">
    <div className="hero-overlay bg-opacity-60 bg-gradient-to-b from-troop466-900/60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-lg">
        <h1 className="mb-5 text-5xl font-bold text-troop466-50">{title}</h1>
        <p className="mb-5 text-troop466-50">{lead}</p>
        {/* <button className="btn btn-primary">Get Started</button> */}
      </div>
    </div>
  </div>
);
