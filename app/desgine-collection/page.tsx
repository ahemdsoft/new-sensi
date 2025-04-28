'use client';
import { useParams } from 'next/navigation';
import CaseCard from '@/app/components/cart2';

export default function PhoneCaseTypePage() {
  const params = useParams();
  const id = params?.id; // this is your main category like "2d", "3d", etc.
 

  const caseCategories = [
    {
      name: 'ANIME DESIGN',
      slug: 'anime',
      image: '/Component 6.png',
    },
    {
      name: 'MARVEL/DC DESIGN',
      slug: 'marvel-dc',
      image: '/Component 6.png',
    },
    {
      name: 'CARS & BIKES DESIGN',
      slug: 'cars-bikes',
      image: '/images/design/cars-bikes.jpg',
    },
    {
      name: 'COUPLE DESIGN',
      slug: 'couple',
      image: '/images/design/couple.jpg',
    },
    {
      name: 'FOOTBALL DESIGN',
      slug: 'football',
      image: '/images/design/football.jpg',
    },
    {
      name: 'TYPOGRAPHY DESIGN',
      slug: 'typography',
      image: '/images/design/typography.jpg',
    },
    {
      name: 'GAMING DESIGN',
      slug: 'gaming',
      image: '/images/design/gaming.jpg',
    },
    {
      name: 'ISLAMIC DESIGN',
      slug: 'islamic',
      image: '/images/design/islamic.jpg',
    },
    {
      name: 'LADIES DESIGN',
      slug: 'ladies',
      image: '/images/design/ladies.jpg',
    },
    {
      name: 'K-POP DESIGN',
      slug: 'k-pop',
      image: '/images/design/k-pop.jpg',
    },
  ];

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-[#f7edf7]">
      <div className="w-[65%] flex flex-col gap-11 justify-center items-center mb-5 mt-5 h-[100%]">
        <h1 className="text-6xl hover:shadow-[0px_4px_6px_#BF00FF78] font-bold md:w-[848px] md:h-[110] rounded-[15px] bg-[#3C1630] text-white w-full flex justify-center items-center">
          {id} Cases
        </h1>
        <h2 className="sm:text-4xl hover:shadow-[0px_4px_6px_#00D6EE40] text-white font-semibold md:w-[1143px] md:h-[68px] bg-[#3C1630] flex justify-center items-center w-full top-[221.25px] rounded-[15.75px]">
          96% COLOUR ACCURACY, GRAPHENE METAL, RUBBER GRIP
        </h2>

        <div className="flex flex-wrap justify-center gap-24">
          {caseCategories.map((item, index) => (
            <CaseCard
              key={index}
              image={item.image}
              name={item.name}
              href={`/desgine-collection/${item.slug}`} // dynamic link like /2d/anime
            />
          ))}
        </div>
      </div>
    </div>
  );
}
