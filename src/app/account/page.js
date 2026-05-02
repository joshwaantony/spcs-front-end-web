export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 md:px-10">
      <div className="mx-auto max-w-5xl rounded-[24px] border border-slate-100 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        <p className="text-[10px] font-bold tracking-widest text-[#007979] uppercase mb-2">
          ACCOUNT
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Your Account</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          This is the user landing route connected to the new auth flow.
        </p>
      </div>
    </div>
  );
}
