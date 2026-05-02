"use client";

import { useEffect, useState } from "react";
import { useFeedbackStore } from "@/store/admin/feedback/feedback.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function ReplyFeedbackModal({ feedback, open, onClose }) {
  const { replyFeedback, replying, replyError, replySuccess, resetReplyState } =
    useFeedbackStore();
  const [message, setMessage] = useState("");
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!open) {
      setMessage("");
      resetReplyState();
    }
  }, [open, resetReplyState]);

  useEffect(() => {
    if (replySuccess && open) {
      onClose();
    }
  }, [replySuccess, open, onClose]);

  useEffect(() => {
    if (!replySuccess) {
      return;
    }

    showToast({ type: "success", message: replySuccess });
    resetReplyState();
  }, [replySuccess, resetReplyState, showToast]);

  useEffect(() => {
    if (!replyError) {
      return;
    }

    showToast({ type: "error", message: replyError });
  }, [replyError, showToast]);

  if (!open || !feedback) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    try {
      await replyFeedback(feedback.id, { message: trimmedMessage });
    } catch {
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#161811]">Reply Feedback</h2>
            <p className="mt-1 text-sm text-[#4C5563]">
              {feedback.subject || feedback.title || "Feedback"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-gray-50 p-4">
          <p className="text-sm font-semibold text-[#161811]">
            {feedback.name || feedback.user_name || "Anonymous"}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {feedback.email || feedback.user_email || "No email"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#161811]">
              Reply Message
            </label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={6}
              placeholder="Type your reply here..."
              className="w-full rounded-3xl border border-gray-200 px-4 py-3 text-sm text-[#161811] outline-none transition focus:border-[#A6F20D]"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold text-[#161811] transition hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={replying || !message.trim()}
              className="rounded-full bg-[#A6F20D] px-5 py-3 text-sm font-semibold text-[#161811] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {replying ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
