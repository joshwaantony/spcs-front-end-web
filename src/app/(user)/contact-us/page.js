import ContactCards from "@/components/(user)/contact-us/ContactCards";
import ContactFormSection from "@/components/(user)/contact-us/ContactFormSection";
import ContactHero from "@/components/(user)/contact-us/ContactHero";
import ContactInfo from "@/components/(user)/contact-us/ContactInfo";


export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#111618] dark:text-white transition-colors duration-300">
      <ContactHero />
      <ContactCards />
      <ContactFormSection />
      <ContactInfo />
    </div>
  );
}
