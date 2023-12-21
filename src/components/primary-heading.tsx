type PrimaryHeadingProps = {
  children: React.ReactNode;
}

export default function PrimaryHeading({ children }: PrimaryHeadingProps) {
  return (
    <h1 className="text-3xl lg:text-6xl font-bold tracking-tight">{children}</h1>
  )
}