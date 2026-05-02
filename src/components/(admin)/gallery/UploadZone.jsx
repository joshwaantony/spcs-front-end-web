export default function UploadZone() {
  return (
    <div className="mb-8 sm:mb-12">
      <div
        className="
          relative
          flex flex-col
          items-center justify-center
          text-center
          px-6 py-10
          sm:px-10 sm:py-14
          lg:px-12 lg:py-16
          border-2 border-dashed border-gray-300
          rounded-xl
          bg-gray-50/60
          hover:bg-gray-50
          transition
        "
      >
        {/* Icon */}
        <div
          className="
            w-14 h-14
            sm:w-16 sm:h-16
            bg-white
            rounded-2xl
            flex items-center justify-center
            mb-5 sm:mb-6
            shadow-sm
          "
        >
          <span className="material-symbols-outlined text-3xl sm:text-4xl text-gray-700">
            cloud_upload
          </span>
        </div>

        {/* Title */}
        <h3
          className="
            text-base
            sm:text-lg
            lg:text-xl
            font-bold
            mb-2
          "
        >
          Drag photos here or Browse Files
        </h3>

        {/* Subtitle */}
        <p
          className="
            text-xs
            sm:text-sm
            text-gray-400
            font-medium
            max-w-xs sm:max-w-none
          "
        >
          Uploading to:{" "}
          <span className="underline decoration-[#A6F20D] underline-offset-4">
            [Selected Album Name]
          </span>
        </p>

        {/* Input */}
        <input
          type="file"
          multiple
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
