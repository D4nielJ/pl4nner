export default function H2(props: { className?: string; children: any }) {
  return (
    <h2 class={`mb-6 text-4xl font-bold ${props.className}`}>
      {props.children}
    </h2>
  );
}
