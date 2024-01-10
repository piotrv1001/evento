import SkeletonCard from "@/components/skeleton-card";

export default function Loading() {
  return (
    <section className="flex flex-wrap max-w-[1100px] mx-auto px-[20px] py-24 gap-20 justify-center">
      {
        Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))
      }
    </section>
  )
}