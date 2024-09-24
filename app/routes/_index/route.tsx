import type { MetaFunction } from "@netlify/remix-runtime";
import { Hero } from "./hero";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Hero
     title="Welcome to Troop 466"
     lead="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis lectus ut nibh laoreet pretium. Aliquam condimentum eget leo vitae mattis. Nam facilisis sem ut neque dapibus ultricies. Curabitur vel auctor magna, id elementum erat. "
    />
  );
}
