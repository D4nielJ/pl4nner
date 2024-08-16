import Container from "~/components/Container";

export default function NotFound() {
  return (
    <Container className="flex-grow flex flex-col items-center justify-center">
      <div class="text-7xl text-white mb-4">404</div>
      <a class="text-lg underline mb-20" href="/">
        Back to home
      </a>
    </Container>
  );
}
