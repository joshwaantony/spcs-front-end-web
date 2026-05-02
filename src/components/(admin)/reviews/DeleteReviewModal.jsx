"use client";

export default function DeleteReviewModal({
  isOpen = false,
  review = null,
  deleting = false,
  error = "",
  onClose = () => {},
  onConfirm = () => {},
}) {
  if (!isOpen || !review) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[96] flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <span className="material-symbols-outlined text-3xl">delete</span>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-black text-zinc-900">Delete Review?</h3>
          <p className="mt-2 text-sm text-zinc-500">
            This will permanently remove the selected review from moderation.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
            Selected Review
          </p>
          <p className="mt-2 truncate text-sm font-semibold text-zinc-900">
            {review.title || "Untitled Review"}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {review.author || "Anonymous"}
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="w-full rounded-full border border-zinc-200 bg-white px-6 py-3 font-bold text-zinc-900 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="w-full rounded-full bg-red-500 px-6 py-3 font-black text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {deleting ? "Deleting..." : "Delete Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
