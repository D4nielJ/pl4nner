export default function Button(props: {
  className?: string;
  children: any;
  onClick?: () => void;
}) {
  return (
    <button
      class={`px-3 py-1.5 rounded-md border border-zinc-600 hover:border-zinc-400 ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
