'use client';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from './animation/fadein';

export default function CaseCard({ image, name, href }: { image: string; name: string; href: string }) {
  return ( 
    <FadeIn>
    <div className="w-[306px] h-[463px] rounded-[10.5px] coverflow-hidden border-2 border-gray-200 shadow-2xl bg-white flex flex-col">
      {/* Top white section */}
      <div className="bg-[#f7f7f7] p-4 flex flex-col items-center justify-start flex-grow">
        <h3 className="text-black font-bold text-center text-lg mb-4">{name}</h3>
        <div className="relative w-[200px] h-[300px]  rounded-2xl">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain  "
          />
        </div>
      </div>

      {/* Bottom color section */}
      <div className="bg-[#D0ECFE] w-full py-4 flex justify-center">
        <Link
          href={href}
          className="px-6 py-2 bg-[#3C1630] text-white rounded transition duration-300 shadow hover:shadow-[0_4px_20px_#BF00FFA3]"
        >
          SEE ALL
        </Link>
      </div>
    </div></FadeIn>
  );
}
