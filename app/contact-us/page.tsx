import FadeIn from "../components/animation/fadein";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/contactinfo";

export default function ContactUsPage() {

 

  return (
    <FadeIn delay={0.1}>
    <div className="h-full flex flex-col gap-6 items-center flex-wrap  bg-gray-50  py-12">
      <h1 className='text-3xl font-extrabold text-center font-poppins text-black'>Contact Us</h1>
      <p className='text-center font-poppins font-500 text-black'>Any question or remarks? Just write us a message!</p>
      <div className="flex flex-col md:flex-row w-full md:w-[55%] gap-1.5 border-2 border-gray-400 rounded-bl-xl rounded-tl-xl bg-white ">
  <div className="w-full md:w-[40%] min-h-[290px]  "><ContactInfo /></div>
  <div className="w-full md:w-[60%]">
    <ContactForm />
  </div>
</div>
   </div></FadeIn>
  );
} 