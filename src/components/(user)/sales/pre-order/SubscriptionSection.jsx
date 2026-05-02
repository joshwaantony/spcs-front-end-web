export default function SubscriptionSection() {
  return (
    <section className="max-w-3xl mx-auto py-20 px-8 text-center bg-white  rounded-3xl border-2 border-dashed border-[#EAD7FC]">
      
      {/* Illustration */}
      <div
        className="size-48 mx-auto bg-cover bg-center mb-8 drop-shadow-xl"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0IsiV5ItjcpYeirIyYyHgD8o3ztB5Yaw4ma4dKENxZZ4wziHS8kwjgTwb8rHHVnTPUj72z-gv_AwQX8iPq-U-K1N4PGnldBqOXAFF1K5XTMA6M8AxSILpGvwHcfHGhPQyi4k1zkIEOfvDLCIfGpN8jl8eJulY47Odk0VUqdb2EcBuaIhuZuLDampbNFnzV06V110Bqz45ThMtb1FfOXtYuQftqJbaruWjRlKk1_3ytKiLE7cLhUG2zYUoJukzoQq-qInkaJyAlO8")',
        }}
      />

      {/* Title */}
      <h2 className="text-3xl text-black font-extrabold mb-4">
        Something big is in the works!
      </h2>

      {/* Description */}
      <p className="text-[#6B7280] dark:text-[#6B7280] mb-10 text-lg">
        We're currently selecting the next set of Malayalam classics for early
        access. Get notified as soon as the next bestseller is announced.
      </p>

      {/* Email Form */}
      <div className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          className=" placeholder:text-[#6B7280] text-black flex-1 w-full bg-[#F9FAFB]  border border-[#E5E7EB]  rounded-[20px] px-6 py-4  "
        />

        <button className="w-full sm:w-auto bg-[#8C33EE] text-white font-bold px-8 py-4 rounded-[20px] shadow-lg shadow-primary/20 hover:scale-[1.05] transition-transform">
          Notify Me
        </button>
      </div>

    </section>
  );
}
