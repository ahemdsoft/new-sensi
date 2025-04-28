'use client';
import Image from 'next/image';
import Link from 'next/link';
import FadeInScroll from './animation/fadeinscrool';

export default function CaseCard({ image, name, href }: { image: string; name: string; href: string }) {
  return (
    <FadeInScroll delay={0.2}>
    <div className="w-[285px] h-[420px] overflow-hidden rounded-lg shadow-xl relative">
      <div className="w-full h-full group relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-130"
        />
        <div className="absolute inset-0 flex flex-col justify-end items-center p-4">
          <h3 className="text-white text-lg font-semibold mb-3 z-10 ">
            {name}
          </h3>
          <Link
            href={href}
            className="px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition duration-300 "
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </div></FadeInScroll>
  );
}
