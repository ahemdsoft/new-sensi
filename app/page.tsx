'use client';
import CaseCard from './components/Cart';
import Image from 'next/image';
import Link from 'next/link';
import Moreservise from './components/moreservise';
import ProductSlider from './components/productslider';
import SlideIn from './components/animation/slidein';
import FadeInOnScroll from './components/animation/fadeinscrool';
import Pop from './components/animation/pop';
import FadeIn from './components/animation/fadein';
const caseCategories = [
  {
    name: '2D MAX CASE',
    image: '/Component 6.png',
    href: '/phone-cases/2d-max',
  },
  {
    name: '2D CASE',
    image: '/Component 7.png',
    href: '/phone-cases/2d',
  },
  {
    name: 'SOFT CASE',
    image: '/Component 8.png',
    href: '/phone-cases/soft',
  },
  {
    name: '3D CASE',
    image: '/Component 13.png',
    href: '/phone-cases/3d',
  },


];
export default function Home() {
  const designCollections = [
    { name: 'ANIME DESIGN', slug: 'anime' },
    { name: 'MARVEL/DC DESIGN', slug: 'marvel-dc' },
    { name: 'CARS & BIKES DESIGN', slug: 'cars-bikes' },
    { name: 'COUPLE DESIGN', slug: 'couple' },
    { name: 'FOOTBALL DESIGN', slug: 'football' },
    { name: 'TYPOGRAPHY DESIGN', slug: 'typography' },
    { name: 'GAMING DESIGN', slug: 'gaming' },
    { name: 'ISLAMIC DESIGN', slug: 'islamic' },
    { name: 'LADIES DESIGN', slug: 'ladies' },
    { name: 'K-POP DESIGN', slug:'k-pop' },
  ];

  return (<FadeIn delay={0.1}>
    <main className='w'>
      {/* Background Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
  {/* Fullscreen Background Image */}
 
    
  <Image
  src="/image/bgh.png"
  alt="Background"
  layout="fill"
  className="absolute inset-0 object-cover z-0"
/>



  {/* Optional: black background fallback behind transparent areas */}
  <div className="absolute z-0"></div>

  {/* Overlay Content */}
  <div className="relative z- min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-end px-4 md:px-8 lg:px-12 py-8">
    <div className="w-full max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl space-y-3">
      {/* Design Collection Box */}
      <SlideIn delay={0.1}>
      <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6 py-3 px-4 rounded-lg bg-[#3C1630] border-2 border-white/20 hover:shadow-[0_4px_10px_#8400FF]">
            DESIGN COLLECTION
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 z-10 gap-3">
          {designCollections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/desgine-collection/${collection.slug}`}
              className="bg-[#3C1630] text-white text-sm md:text-base py-3 px-4 rounded-lg text-center hover:bg-[#4D1C3D] transition-colors duration-300 transform hover:scale-105"
            >
              {collection.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Customize Button */}
      <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl">
        <Link
          href="/customization"
          className="bg-[#3C1630] text-white text-lg md:text-xl h-[106px] w-full rounded-xl flex items-center justify-center font-semibold hover:bg-[#4D1C3D] transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Customise with your design
        </Link>
      </div></SlideIn>
    </div>
  </div>
</section>
<section className="w-screen min-h-screen bg-white flex flex-wrap  justify-center items-center py-12">
  <div className="w-[85%] flex flex-col items-center gap-8">
    <h1 className="font-bold text-4xl text-center text-black">
      FIND YOUR DESIRED CASE BY CATEGORY
    </h1>

    {/* Grid Wrapper */}
    <div className="w-full flex flex-wrap gap-7 justify-center">

    {caseCategories.map((item, index) => (
          <CaseCard key={index} image={item.image} name={item.name} href={item.href} />
        ))}
    </div>
  </div>
</section>
<Pop delay={0.1}>
<section className="relative w-full">
      <Image
  src="/image/Group211.png"
  alt="Background"
  width={1920}
  height={1080}
  layout="responsive"
  priority
  className="w-full h-auto"
/>

        </section></Pop>
        <section className='w-full h-[100%] mb-12 flex flex-col bg-gray-50 pt-16 pb-12 justify-center items-center'>
          
          <div className='w-[85%] ml-3.5 h-[60%] flex flex-col gap-10 bg-gray-50'>
            <div className='text- text-2xl font-Montaga underline-offset-4 underline '><FadeInOnScroll>Latest <span className='text-[#008ECC]'>Product</span></FadeInOnScroll></div>
          <div className='w-full h-[100%] flex justify-center items-center'>
          <ProductSlider/>
          </div>
          </div>

        </section>
        <section className='w-full h-[100%] mb-12 flex justify-center items-center bg-white'>
          <Moreservise/>
        </section>

    </main></FadeIn>
  );
}
