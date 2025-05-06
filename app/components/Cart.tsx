'use client';
import Image from 'next/image';
import Link from 'next/link';
import FadeInScroll from './animation/fadeinscrool';

export default function CaseCard({ image, name, href }: { image: string; name: string; href: string }) {
  return (
    <FadeInScroll delay={0.2}>
      <div className="w-[285px] h-[480px] relative overflow-hidden rounded-lg shadow-xl group">
        {/* Image */}
        <div className="w-full h-full relative">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gray hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

        </div>

        {/* Text and Button */}
        <div className="absolute inset-0 flex flex-col justify-end items-center p-4 z-10">
          <h3 className="text-white text-lg font-semibold mb-3">{name}</h3>
          <Link
            href={href}
            className="px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition duration-300"
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </FadeInScroll>
  );
}
