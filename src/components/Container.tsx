export default function Container({
  className,
  children,
}: {
  className?: string;
  children: any;
}) {
  return (
    <div
      class={`container max-w-4xl mx-auto px-4 bg-zinc-950 text-white ${className}`}
    >
      {children}
    </div>
  );
}
