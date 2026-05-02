export default function BookCard({
  image,
  title,
  author,
  price,
  progress,
  badge,
  timeLeft,
}) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-xl p-4 shadow-[0_10px_30px_rgba(140,43,238,0.05)] hover:border-primary/20 transition-all group">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url("${image}")` }}
        />

        <div className="absolute top-4 left-4 bg-[#8C33EE] text-white text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-4">
          <span className="text-xs text-white font-mono">{timeLeft}</span>
        </div>
      </div>

      <h3 className="font-bold text-black hover:text-[#8C33EE] text-xl">{title}</h3>
      <p className="text-sm text-[#838184] font-medium opacity-60 mb-4">by {author}</p>

      <div className="mb-4">
        <div className="flex justify-between text-xs ">
          <span className="text-[#141118]">{progress}% Reserved</span>
          <span className="text-[#8C33EE] font-bold">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2">
          <div
            className="h-full bg-[#8C33EE] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button className="w-full py-3 rounded-lg font-bold bg-[#FFD700] text-black">
        Pre-Order for ₹{price}
      </button>
    </div>
  );
}
