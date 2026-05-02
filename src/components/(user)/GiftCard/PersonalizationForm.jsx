"use client";

export default function PersonalizationForm() {
  return (
    <section className="w-full mt-16">
      {/* Title */}
      <div className="mb-8">
        <h2 className="flex items-center gap-4 text-xl font-bold text-gray-900">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-white text-base font-bold">
            3
          </span>
          Personalize
        </h2>
      </div>

      {/* Form Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recipient Name */}
        <div>
          <label className="block mb-2 text-base font-medium text-[#618972]">
            Recipient Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full h-14 px-6 rounded-full bg-white border border-gray-300 text-base focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Recipient Email */}
        <div>
          <label className="block mb-2 text-base font-medium text-[#618972]">
            Recipient Email
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            className="w-full h-14 px-6 rounded-full bg-white border border-gray-300 text-base focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Sender Name */}
        <div>
          <label className="block mb-2 text-base font-medium text-[#618972]">
            Sender Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full h-14 px-6 rounded-full bg-white border border-gray-300 text-base focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Send Date */}
        <div>
          <label className="block mb-2 text-base font-medium text-[#618972]">
            Send Date (Optional)
          </label>
          <input
            type="date"
            className="w-full h-14 px-6 rounded-full bg-white border border-gray-300 text-base text-gray-500 focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-base font-medium text-[#618972]">
            Personal Message
          </label>
          <textarea
            rows="5"
            placeholder="Write a warm message..."
            className="w-full px-6 py-4 rounded-3xl bg-white border border-gray-300 text-base resize-none focus:outline-none focus:border-green-500"
          />
        </div>
      </div>
    </section>
  );
}
