export default function AboutUs() {


  const Conditions =[
   {
     title: "Terms and Conditions",
     description: "Your use of the Onlinestaff.net platform is governed by the following terms and conditions (Terms of Use), as well as the Onlinestaff Privacy Policy, along with any other operating rules, guidelines, and minimum qualifications posted throughout the website or presented to you individually during your use of the website (collectively referred to as the Terms). These Terms govern your use of the platform and Onlinestaff reserves the right to update or modify these Terms at any time without notice. You are advised to review the Terms regularly whenever you visit the website, even if you have not received a direct notification of changes. You are bound by the Terms, even if you have not reviewed them. Your continued use of the website after any changes are made constitutes your acceptance of the updated Terms. If at any time you do not wish to be bound by these Terms, you should log out, exit, and cease using the platform immediately.",
   },
  ]
  const Conditions2 =[
   {
     title: "Intended Use of Website",
     description: "Onlinestaff.net is an online platform that facilitates the connection between employers (businesses or individuals seeking professional services) and professionals (individuals offering services or seeking employment opportunities). Onlinestaff does not act as a broker, agent, or financial advisor. At no time does Onlinestaff offer, broker, advise, purchase, sell, or otherwise facilitate transactions in securities, investments, or financial products.Important Clarifications.Onlinestaff does not guarantee that any company, individual, or professional will achieve a particular level of success or meet specific expectations.The Platform does not engage in any form of financial transaction such as accepting, holding, or transferring cash or securities.Onlinestaff does not provide any form of personal financial, tax, or legal services, and is not a substitute for consulting with licensed professionals for these matters.Onlinestaff is not responsible for any outcomes related to the engagements made through the Platform",
   },
   {
     title: "User Registation",
     description: "By accepting these Terms on behalf of an organization or entity, you represent and warrant that you are authorized to bind the organization or entity to these Terms. Only individuals who are 18 years or older may register for an account on the platform. Registering for an account does not create any obligation to engage in business or hire services, and no financial commitment is required at the time of registration.You are responsible for ensuring that the information you provide during registration is truthful, accurate, and complete. Our registration process may involve third-party validation, including integration with social media platforms, to confirm your eligibility to use the platform. Onlinestaff reserves the right to reject or remove any account if it fails validation or if you do not meet the platform’s registration criteria.",
   },{
     title: "Registered Account Obligations",
     description: "The registered account is personal to the user and cannot be transferred to anyone else. You are solely responsible for maintaining the confidentiality of your username and password and for ensuring the security of your account. You should periodically change your password and take steps to prevent unauthorized access. If you suspect that your account has been compromised, you must immediately contact Onlinestaff through a secure method, which may not be through your website account.",
   },{
     title: "Content Use Limitations",
     description: "You agree to use the platform’s content, including but not limited to videos, webinars, text, images, infographics, articles, assessments, ratings, and software (Content), solely for lawful purposes authorized by Onlinestaff. If you are accessing the platform from outside the United States, you are responsible for ensuring compliance with the laws of your jurisdiction and adhering to any restrictions imposed by U.S. government agencies. Any misuse or unauthorized use of the platform’s Content, including violation of the Terms, may result in termination of your account and access to the platform, and may subject you to legal action.",
   },{
     title: "Prospective Investor Accounts",
     description: "f you are considering hiring a professional or offering services through Onlinestaff, you do so at your own risk. While Onlinestaff facilitates the connection between employers and professionals, it does not guarantee the quality of work or success of any job or service engagement. You are responsible for conducting due diligence and making informed decisions regarding the professionals you engage with or the opportunities you pursue.Onlinestaff is not responsible for verifying the accuracy of the information provided by users. It is the responsibility of each user, whether an employer or professional, to ensure that the information shared is accurate, and to seek legal, financial, or tax advice when necessary. Onlinestaff cannot be held accountable for the outcomes of any engagement, transaction, or interaction that occurs through the platform.",
   },
  ]
   return (
     <div className="min-h-screen w-full flex text-inter justify-center  items-center py-12">
       {Conditions.map((item, index)=>(<div key={index} className="max-w-7xl w-[80%]  flex gap-6 flex-wrap    sm:px-6 lg:px-8">
           <h1  className="text-3xl font-inter text-[#009C9A] font-bold p-6">{item.title}</h1>
           <div className='border-2  w-[100%] h-full border-gray-100 p-6'>
           <p className="text-sm font-inter">{item.description} </p>




           {Conditions2.map((item, index)=>(<div key={index} className='w-[100%] h-full  gap-6 flex flex-col flex-wrap overflow-hidden border-gray-500'>
          <h1 className="text-xl mt-6 font-bold">{item.title}</h1>
          <p className="text-sm font-inter">{item.description}</p>



           </div> ))}
       </div></div>))}
     </div>
   );
 } 