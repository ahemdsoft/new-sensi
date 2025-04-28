'use client';
import { useState } from "react";
import CaseCard from "@/app/components/cart2";

const ITEMS_PER_PAGE = 4;

const caseCategories = [
  { name: 'ANIME DESIGN', slug: 'anime', image: '/images/design/anime.jpg' },
  { name: 'MARVEL/DC DESIGN', slug: 'marvel-dc', image: '/images/design/marvel-dc.jpg' },
  { name: 'CARS & BIKES DESIGN', slug: 'cars-bikes', image: '/images/design/cars-bikes.jpg' },
  { name: 'COUPLE DESIGN', slug: 'couple', image: '/images/design/couple.jpg' },
  { name: 'FOOTBALL DESIGN', slug: 'football', image: '/images/design/football.jpg' },
  { name: 'TYPOGRAPHY DESIGN', slug: 'typography', image: '/images/design/typography.jpg' },
  { name: 'GAMING DESIGN', slug: 'gaming', image: '/images/design/gaming.jpg' },
  { name: 'ISLAMIC DESIGN', slug: 'islamic', image: '/images/design/islamic.jpg' },
  { name: 'LADIES DESIGN', slug: 'ladies', image: '/images/design/ladies.jpg' },
  { name: 'K-POP DESIGN', slug: 'k-pop', image: '/images/design/k-pop.jpg' },
];

export default function Sameproduct() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(caseCategories.length / ITEMS_PER_PAGE);
  const start = page * ITEMS_PER_PAGE;
  const visibleItems = caseCategories.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className='w-full h-full flex flex-col gap-12 mb-8 justify-evenly items-center'>
      <h2 className="sm:text-3xl text-white font-semibold md:w-[843px] md:h-[68px] bg-[#3C1630] flex justify-center items-center rounded-[15.75px]">
        MORE RELATED PRODUCTS
      </h2>
      <div className="relative w-full overflow-hidden">
        <div className="flex justify-center flex-wrap gap-10 transition-transform duration-500 ease-in-out">
          {visibleItems.map((item, index) => (
            <CaseCard
              key={index}
              image={item.image}
              name={item.name}
              href={`/desgine-collection/${item.slug}`}
            />
          ))}
        </div>

        <button
          onClick={() => setPage((prev) => (prev - 1 + totalPages) % totalPages)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2"
        >
          ◀
        </button>
        <button
          onClick={() => setPage((prev) => (prev + 1) % totalPages)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
