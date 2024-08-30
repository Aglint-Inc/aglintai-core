// components/Component.js
"use client";

import CompanyImage from "@/src/components/CandiatePortal/components/CompanyImage";
import CompanyTabs from "@/src/components/CandiatePortal/components/CompanyTabs";
import GreetingCandidate from "@/src/components/CandiatePortal/components/GreetingCandidate";
import RequestedAvailability from "@/src/components/CandiatePortal/components/RequestedAvailability";
import SelfScheduling from "@/src/components/CandiatePortal/components/SelfScheduling";
import UpcomingInterview from "@/src/components/CandiatePortal/components/UpcomingInterview";


export default function Component() {
 const companyCover = "/images/discord-cover.webp";

const logoImage = "/images/user-4.jpg";

  const greetingMessage =
    "Welcome to our portal! We’re here to keep you connected every step of the way, whether you’re preparing for interviews or exploring new opportunities. Dive into detailed company profiles, discover comprehensive job descriptions, and don't hesitate to reach out with any questions you may have. We're committed to helping you find the right fit and making your job search experience as smooth as possible.";

  const companyImages = [
    "/images/annie-spratt-g9KFpAfQ5bc-unsplash.jpg",
    "/images/austin-distel-wD1LRb9OeEo-unsplash.jpg",
    "/images/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg",
  ];
  const aboutContent = `
    <p>We deliver a great experience</p>
    <p className="text-gray-600 mb-4">
      We prioritize a great candidate experience, providing clear communication, feedback, and support for a positive process.
    </p>
    <p className="text-gray-600 mb-4">
      From start to finish, we provide clear communication, timely feedback, and support, creating a positive and inclusive process that aligns with our commitment to finding the right fit for both our organization and candidates.
    </p>
    <p className="text-gray-600 mb-4">
      Our dedicated team ensures that each step of the process is handled with the utmost professionalism and care, making sure that every interaction is smooth and respectful.
    </p>
    <p className="text-gray-600 mb-4">
      We continuously strive to improve our processes based on feedback and industry best practices, aiming to exceed expectations and foster long-term relationships.
    </p>
    <p className="text-gray-600 mb-4">
      Our commitment extends beyond just recruitment; we believe in creating a welcoming and supportive environment that contributes to the overall success and satisfaction of our candidates.
    </p>
    <p className="text-gray-600 mb-4">
      We take pride in our personalized approach, tailoring our services to meet the unique needs of each candidate and organization, ensuring a customized experience that aligns with your goals.
    </p>
    <p className="text-gray-600 mb-4">
      Our experienced team is always available to provide guidance and answer any questions you may have, making sure you feel supported and informed throughout the entire process.
    </p>
    <p className="text-gray-600 mb-4">
      We actively seek to build lasting partnerships by maintaining open lines of communication and providing ongoing support, both during and after the recruitment process.
    </p>
    <p className="text-gray-600 mb-4">
      Our goal is to create a seamless experience that not only meets but exceeds your expectations, ensuring that every candidate and client feels valued and respected.
    </p>
    <p className="text-gray-600 mb-4">
      For more information about our services, visit our <a href="https://www.example.com/services" className="text-blue-500 hover:underline">Services Page</a>.
    </p>
    <p className="text-gray-600 mb-4">
      If you have any questions or need assistance, feel free to reach out to us via our <a href="https://www.example.com/contact" className="text-blue-500 hover:underline">Contact Page</a>.
    </p>
    <p className="text-gray-600 mb-4">
      Visit us at: <br />
      Example Company<br />
      1234 Elm Street<br />
      Springfield, IL 62704<br />
      USA
    </p>
  `;


  const jobDescriptionContent = `
  <p className="text-gray-600 mb-4">
    Acme is seeking a talented and motivated Software Engineer to join our dynamic team. As a Software Engineer at Acme, you will play a crucial role in developing and maintaining cutting-edge software solutions that drive our business forward.
  </p>
  <p className="text-gray-600 mb-4">
    You will be working in a collaborative and innovative environment where your contributions will directly impact our product offerings and overall company success. This position offers the opportunity to work on challenging projects with a team of skilled professionals who are passionate about technology and problem-solving.
  </p>
  <ul className="list-disc list-inside pl-5 space-y-3 text-gray-600 mb-4">
    <li className="text-gray-700">Design, develop, and maintain high-quality software applications</li>
    <li className="text-gray-700">Collaborate with cross-functional teams to define and implement new features</li>
    <li className="text-gray-700">Write clean, scalable, and efficient code while adhering to best practices</li>
    <li className="text-gray-700">Participate in code reviews and contribute to continuous improvement initiatives</li>
    <li className="text-gray-700">Troubleshoot and debug issues, ensuring the software meets the highest standards of performance and reliability</li>
    <li className="text-gray-700">Stay up-to-date with the latest industry trends and technologies to bring innovative solutions to the team</li>
  </ul>
  <p className="text-gray-600 mb-4">
    To be successful in this role, you should have a strong understanding of software engineering principles, excellent problem-solving skills, and the ability to work effectively in a team environment. Experience with modern software development practices and technologies is highly desirable.
  </p>
  <p className="text-gray-600 mb-4">
    We offer a competitive salary, comprehensive benefits package, and opportunities for professional growth and development. If you are passionate about technology and eager to make an impact, we encourage you to apply and join our team at Acme.
  </p>
  <p className="text-gray-600 mb-4">
    For more details about the role and to apply, please visit our <a href="https://www.example.com/careers" className="text-blue-500 hover:underline">Careers Page</a>.
  </p>
  <p className="text-gray-600 mb-4">
    Application Deadline: <strong>September 30, 2024</strong>
  </p>
  <p className="text-gray-600 mb-4">
    Location: <strong>1234 Elm Street, Springfield, IL 62704, USA</strong>
  </p>
  <p className="text-gray-600 mb-4">
    If you have any questions about the position or the application process, please do not hesitate to contact us at <a href="mailto:hr@example.com" className="text-blue-500 hover:underline">hr@example.com</a>.
  </p>
`;



  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <CompanyImage imageSrc={logoImage} coverSrc={companyCover} />
              <div className="p-8 pt-20 pb-0">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-gray-600">for Software Engineer at Acme</p>
                <GreetingCandidate sentence={greetingMessage} />
              </div>
              <CompanyTabs
                companyImages={companyImages}
                aboutContent={aboutContent}
                jobDescriptionContent={jobDescriptionContent}
              />
            </div>
          </div>
          <div className="space-y-8">
          <UpcomingInterview/>
          <RequestedAvailability/>
           <SelfScheduling/> 
          </div>
        </div>
      </main>
    </div>
  );
}
