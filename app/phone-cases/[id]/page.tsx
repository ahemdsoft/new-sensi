'use client';
import { useParams } from 'next/navigation';
import CaseCardType2 from '@/app/components/cart2';
import Link from 'next/link';
import Image from 'next/image';

export default function PhoneCaseTypePage() {
  const params = useParams();
  const id = params?.id; // this is your main category like "2d", "3d", etc.
 
  const caseCategories = [
 
    {
      name: 'ANIME DESIGN',
      slug: 'anime',
      image: '/desgine/anime.png',
    },
    {
      name: 'MARVEL/DC DESIGN',
      slug: 'marvel-dc',
      image: '/desgine/marveldc.png',
    },
    {
      name: 'CARS & BIKES DESIGN',
      slug: 'cars-bikes',
      image: '/desgine/carsbikes.png',
    },
    {
      name: 'COUPLE DESIGN',
      slug: 'couple',
      image: '/desgine/couple.png',
    },
    {
      name: 'FOOTBALL DESIGN',
      slug: 'football',
      image: '/desgine/football.png',
    },
    {
      name: 'TYPOGRAPHY DESIGN',
      slug: 'typography',
      image: '/desgine/typo.png',
    },
    {
      name: 'GAMING DESIGN',
      slug: 'gaming',
      image: '/desgine/gaming.png',
    },
    {
      name: 'ISLAMIC DESIGN',
      slug: 'islamic',
      image: '/desgine/islamic.png',
    },
    {
      name: 'LADIES DESIGN',
      slug: 'ladies',
      image: '/desgine/ladis.png',
    },
    {
      name: 'K-POP DESIGN',
      slug: 'k-pop',
      image: '/desgine/kpop.png',
    },
  ];
  
  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-[#f7edf7]">
      <div className="w-[80%] flex flex-col gap-11 justify-center items-center mb-5 mt-5 h-[100%]">
      <h1 className="text-xl sm:text-3xl md:text-6xl hover:shadow-[0px_4px_6px_#BF00FF78] font-bold w-full max-w-[848px] rounded-[15px] bg-[#3C1630] text-white flex justify-center items-center px-4 py-2 text-center">
  {id} Cases
</h1>

<h2 className="text-sm sm:text-xl md:text-4xl hover:shadow-[0px_4px_6px_#00D6EE40] text-white font-semibold w-full max-w-[1143px] bg-[#3C1630] flex justify-center items-center px-4 py-2 rounded-[15.75px] text-center">
  96% COLOUR ACCURACY, GRAPHENE METAL, RUBBER GRIP
</h2>


        <div className="flex flex-wrap justify-center gap-24">


        <div className="md:w-[306px] md:h-[463px] w-[280px] overflow-hidden border-2 rounded-2xl border-gray-200 shadow-2xl bg-white flex flex-col group">
        {/* Top white section */}
        <div className="bg-[#FFDEDE] p-4 flex flex-col items-center justify-start flex-grow">
          <h3 className="text-black font-bold text-center text-lg mb-4">
            Customization
          </h3>
          <div className="relative w-[200px] h-[300px] rounded-2xl overflow-hidden">
          <Image
  src="/desgine/cus.png"
  alt="customization"
  width={500} // Arbitrary number, will be overridden by styling
  height={500}
  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-180"
/>
          </div>
        </div>

        {/* Bottom color section */}
        <div className="bg-[#D0ECFE] w-full bottom-0 py-4 flex justify-center">
          <Link
            href={'/customization'}
            className="px-6 py-2 bg-[#3C1630] text-white rounded transition duration-300 shadow hover:shadow-[0_4px_20px_#BF00FFA3]"
          >
            CUSTOMIZATION
          </Link>
        </div>
      </div>

          
          {caseCategories.map((item, index) => (
            <CaseCardType2
              key={index}
              image={item.image}
              name={item.name}
              
              href={`/phone-cases/${id}/${item.slug}`} // dynamic link like /2d/anime
            />
          ))}
        </div>
      </div>
    </div>
  );
}