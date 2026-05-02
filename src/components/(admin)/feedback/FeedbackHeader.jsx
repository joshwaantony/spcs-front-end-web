export default function FeedbackHeader() {
  return (
    <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-7 md:pt-8 pb-4 sm:pb-5 md:pb-6 border-b border-gray-100">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1
          className="
            text-black font-bold tracking-tight leading-tight
            text-xl
            sm:text-2xl
            md:text-3xl
          "
        >
          User Feedback &amp; Inquiries
        </h1>

        <p
          className="
            text-[#4C5563] font-normal
            text-sm
            sm:text-base
            max-w-3xl
          "
        >
          Manage customer messages, book requests, and support tickets.
        </p>
      </div>
    </div>
  );
}
