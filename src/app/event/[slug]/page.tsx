import PrimaryHeading from "@/components/primary-heading";
import { EventoEvent } from "@prisma/client";
import { getEvent } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEvent(params.slug);
  return {
    title: `Evento - ${event.name}`,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = params;
  let event: EventoEvent | null = null;
  try {
    const res = await fetch(
      `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
    );

    if (!res.ok) throw new Error(`Server response status: ${res.status}`);

    event = await res.json();
  } catch (error) {
    console.error(error);
  }
  return (
    <main>
      {event == null ? (
        "Event not found"
      ) : (
        <>
          <section className="relative overflow-hidden flex justify-center items-center">
            <Image
              src={event.imageUrl}
              className="object-cover blur-3xl z-0"
              alt="Event background image"
              fill
              priority
              quality={50}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="z-1 relative flex flex-col lg:flex-row gap-y-6 lg:gap-x-16 py-14 md:py-20">
              <Image
                src={event.imageUrl}
                alt={event.name}
                width={300}
                height={201}
                className="rounded-xl border-2 border-white/50 object-cover"
              />
              <div className="flex flex-col">
                <p className="text-base text-white/75">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <PrimaryHeading className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
                  {event.name}
                </PrimaryHeading>
                <p className="whitespace-nowrap text-xl text-white/75">
                  Organized by{" "}
                  <span className="italic">{event.organizerName}</span>
                </p>
                <button
                  className="bg-white/20 text-lg capitalize w-[95vw] sm:w-full py-2 
                  rounded-md border-white/10 border-2 bg-blur mt-5 lg:mt-auto state-effects"
                >
                  Get tickets
                </button>
              </div>
            </div>
          </section>
          <div className="text-center px-5 py-16 min-h-[75vh]">
            <section className="mb-12">
              <h2 className="text-2xl mb-8">About this event</h2>
              <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
                {event.description}
              </p>
            </section>
            <section>
              <h2 className="text-2xl mb-8">Location</h2>
              <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
                {event.location}
              </p>
            </section>
          </div>
        </>
      )}
    </main>
  );
}
