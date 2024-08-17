export default function SearchBar(props: {
  className?: string;
  children?: any;
}) {
  return (
    <input
      type="text"
      class={`px-3 py-1.5 rounded-md mr-6 text-zinc-800 placeholder:text-zinc-500 ${props.className}`}
      placeholder="Search"
    >
      {props.children}
    </input>
  );
}
