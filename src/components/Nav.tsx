import { useLocation } from "@solidjs/router";
import Container from "./Container";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-zinc-400";
  return (
    <nav class="border-b-2 border-b-zinc-800">
      <Container>
        <ul class="container flex items-center px-12 py-3 text-gray-200">
          <li
            class={`border-b-2 border-b-zinc-400 ${active("/")} mr-3 sm:mr-12`}
          >
            <a href="/">Home</a>
          </li>
          <li class={`border-b-2 ${active("/about")} mr-3 sm:mr-12`}>
            <a href="/about">About</a>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
