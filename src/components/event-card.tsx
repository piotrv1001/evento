"use client";

import { EventoEvent } from "@prisma/client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type EventCardProps = {
  event: EventoEvent;
};

const MotionLink = motion(Link);

export default function EventCard({ event }: EventCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const date = new Date(event.date);
  const day = date.getDate();
  const padLeftDay = day < 10 ? `0${day}` : day;
  const monthName = date
    .toLocaleString("en-US", { month: "short" })
    .slice(0, 3);
  return (
    <MotionLink
      ref={ref}
      className="h-[380px] max-w-[500px] flex flex-col flex-1 basis-80"
      href={`/event/${event.slug}`}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress
      }}
      initial={{
        opacity: 0,
        scale: 0.8
      }}
    >
      <section className="w-full h-full bg-white/[3%] flex flex-col rounded-xl transition overflow-hidden relative state-effects">
        <Image
          src={event.imageUrl}
          alt={event.name}
          width={500}
          height={280}
          className="h-[60%] object-cover"
        />
        <div className="flex flex-col justify-center items-center flex-1">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/[75%]">By {event.organizerName}</p>
          <p className="text-sm text-white/[50%] mt-4">{event.location}</p>
        </div>
        <section className="absolute left-[12px] top-[12px] h-[45px] w-[45px] bg-black/30 rounded-md flex flex-col justify-center items-center">
          <p className="text-xl font-bold -mb-[5px]">{padLeftDay}</p>
          <p className="text-xs uppercase text-accent">{monthName}</p>
        </section>
      </section>
    </MotionLink>
  );
}
