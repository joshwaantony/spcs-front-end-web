"use client";

import { useEffect, useState } from "react";
import FeedbackRow from "./FeedbackRow";
import DeleteFeedbackModal from "./DeleteFeedbackModal";
import ReplyFeedbackModal from "./ReplyFeedbackModal";
import { useFeedbackStore } from "@/store/admin/feedback/feedback.store";

const getInitials = (name) => {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return "FB";
  }

  return parts.map((part) => part[0]?.toUpperCase() || "").join("");
};

const formatTime = (value) => {
  if (!value) {
    return "Recently";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function FeedbackList() {
  const { feedback, loading, error, fetchFeedback, page, replying, deleting } =
    useFeedbackStore();
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

  useEffect(() => {
    fetchFeedback(page);
  }, [fetchFeedback, page]);

  if (loading) {
    return <p className="py-10 text-center text-sm text-zinc-500">Loading feedback...</p>;
  }

  if (error) {
    return <p className="py-10 text-center text-sm text-red-500">{error}</p>;
  }

  if (!feedback || feedback.length === 0) {
    return <p className="py-10 text-center text-sm text-zinc-500">No feedback found.</p>;
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {feedback.map((item) => (
          <FeedbackRow
            key={item.id}
            feedback={item}
            initials={getInitials(item.name || item.user_name || item.email)}
            name={item.name || item.user_name || "Anonymous"}
            email={item.email || item.user_email || "No email"}
            subject={item.subject || item.title || "Feedback"}
            preview={
              item.message ||
              item.description ||
              item.content ||
              "No message preview available."
            }
            time={formatTime(item.created_at || item.createdAt || item.date)}
            highlight={Boolean(item.is_highlighted || item.unread)}
            darkAvatar={Boolean(item.is_highlighted || item.unread)}
            onReply={setSelectedFeedback}
            replying={replying && selectedFeedback?.id === item.id}
            onDelete={setFeedbackToDelete}
            deleting={deleting && feedbackToDelete?.id === item.id}
          />
        ))}
      </div>

      <ReplyFeedbackModal
        feedback={selectedFeedback}
        open={Boolean(selectedFeedback)}
        onClose={() => setSelectedFeedback(null)}
      />

      <DeleteFeedbackModal
        feedback={feedbackToDelete}
        open={Boolean(feedbackToDelete)}
        onClose={() => setFeedbackToDelete(null)}
      />
    </>
  );
}
