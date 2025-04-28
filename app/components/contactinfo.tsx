// app/contact/page.tsx

import Image from "next/image";

export default function ContactInfo() {
  return (
    <div className="relative h-[100%] w-[100%] bg-black text-white px-6 py-12 gap-7 flex flex-col rounded-xl overflow-hidden">
      <h2 className="text-2xl  font-semibold">Contact Information</h2>
      <p className="text-gray-400  mt-1">Say something to start a live chat!</p>

      <div className="mt-8 space-y-6">
        <div className="flex items-center space-x-4">
          <a href="tel:+8801894053387" className="w-9 h-9  text-black rounded-full flex items-center justify-center">
            <Image src="/call.png" alt="phone" width={20} height={20} />
          </a>
          <span>+880 1894-053387</span>
        </div>

        <div className="flex items-center space-x-4">
          <a href="mailto:senshiphonecasings.com" className="w-9 h-9  text-black rounded-full flex items-center justify-center">
            <Image src="/ic_sharp-email.png" alt="email" width={20} height={20} />
          </a>
          <span>senshiphonecasings.com</span>
        </div>

        <div className="flex items-center space-x-4">
          <a href="#" className="w-9 h-9  text-black rounded-full flex items-center justify-center">
            <Image src="/Vector.png" alt="location" width={20} height={20} />
          </a>
          <span>Dhaka, Bangladesh</span>
        </div>
      </div>

      <div className="flex space-x-4 mt-10 ">
        <a href="https://www.facebook.com/profile.php" className="w-8 h-8 text-black rounded-full flex items-center justify-center">
          <Image src="/facebook.png" alt="email" width={30} height={30} />
        </a>
        <a href="https://www.instagram.com/senshi_phone_casings/" className="w-8 h-8  text-black rounded-full flex items-center justify-center">
        <Image src="/insta.png" alt="email" width={30} height={30} />
        </a>
        <a href="https://wwww.tiktok.com/" className="w-8 h-8 text-black rounded-full flex items-center justify-center">
          <Image src="/tiktok.png" alt="email" width={30} height={30} />
        </a>
      </div>

      {/* Background Circles */}
      <div className="absolute bottom-0 right-0 z-0">
        <div className="w-[250px] h-[250px] bg-white/40 rounded-full absolute bottom-[-80] right-[-60]"></div>
        <div className="w-[150px] h-[150px] bg-white/22 rounded-full absolute bottom-6 right-24"></div>
      </div>
    </div>
  );
}
