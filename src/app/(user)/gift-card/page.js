import {
  Header,
  Hero,
  PreviewCard,
  ThemeSelector,
  AmountSelector,
  PersonalizationForm,
  StickyCTA,
  Footer,
} from "@/components/(user)/GiftCard";

export default function GiftCardPage() {
  return (
    <main className="relative overflow-hidden  bg-gradient-to-b from-[#F4FBF6] to-[#F9FDFB] text-text-main dark:text-white">

      {/* Background Decorations */}
      <div className="absolute -top-24 -right-24 size-[600px] bg-primary/10 blur-3xl rounded-full -z-10" />
      <div className="absolute top-1/2 -left-32 size-[400px] bg-primary/5 blur-3xl rounded-full -z-10" />

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <Hero />

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <PreviewCard />

          <div className="w-full lg:w-7/12 space-y-12">
            <ThemeSelector />
            <AmountSelector />
            <PersonalizationForm />
            <StickyCTA />
          </div>
        </div>
      </div>

    </main>
  );
}
