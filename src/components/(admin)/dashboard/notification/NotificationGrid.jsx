"use client";

import { useEffect, useState } from "react";
import { useNotificationStore } from "@/store/admin/dashboard/notification.store";
import { useToastStore } from "@/store/ui/toast.store";
import NotificationDeleteModal from "@/components/(admin)/dashboard/notification/NotificationDeleteModal";
import NotificationEditModal from "@/components/(admin)/dashboard/notification/NotificationEditModal";

const formatDate = (value) => {
  if (!value) {
    return "Just now";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function NotificationGrid() {
  const {
    notifications,
    loading,
    error,
    updating,
    updateError,
    deleting,
    deleteError,
    fetchNotifications,
    deleteNotification,
    updateNotification,
    resetDeleteNotificationState,
    resetUpdateNotificationState,
  } = useNotificationStore();
  const showToast = useToastStore((state) => state.showToast);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingNotification, setDeletingNotification] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    notification_url: "",
    notification_image: null,
    notification_img_preview_url: "",
  });

  useEffect(() => {
    fetchNotifications(1);
  }, [fetchNotifications]);

  const openEditModal = (notification) => {
    setEditingNotification(notification);
    setEditForm({
      title: notification.title || "",
      description: notification.description || "",
      notification_url: notification.notification_url || "",
      notification_image: null,
      notification_img_preview_url: notification.notification_image_url || "",
    });
    resetUpdateNotificationState();
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    if (updating) {
      return;
    }

    setIsEditOpen(false);
    setEditingNotification(null);
    resetUpdateNotificationState();
  };

  const openDeleteModal = (notification) => {
    setDeletingNotification(notification);
    resetDeleteNotificationState();
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setIsDeleteOpen(false);
    setDeletingNotification(null);
    resetDeleteNotificationState();
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEditImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setEditForm((current) => ({
        ...current,
        notification_image: file,
        notification_img_preview_url:
          typeof reader.result === "string"
            ? reader.result
            : current.notification_img_preview_url,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editingNotification?.id) {
      return;
    }

    const title = editForm.title.trim();
    const description = editForm.description.trim();
    const notificationUrl = editForm.notification_url.trim();

    if (!title || !notificationUrl) {
      return;
    }

    try {
      const payload = editForm.notification_image
        ? (() => {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("notification_url", notificationUrl);

            if (description) {
              formData.append("description", description);
            }

            formData.append("notification_image", editForm.notification_image);
            return formData;
          })()
        : {
            title,
            notification_url: notificationUrl,
            ...(description ? { description } : {}),
          };

      await updateNotification(editingNotification.id, payload);
      await fetchNotifications(1);
      showToast({
        type: "success",
        message: "Notification updated successfully.",
      });
      closeEditModal();
    } catch (updateActionError) {
      showToast({
        type: "error",
        message:
          updateActionError?.message || "Update notification failed.",
      });
      console.error("Update notification failed:", updateActionError);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingNotification?.id) {
      return;
    }

    try {
      await deleteNotification(deletingNotification.id);
      await fetchNotifications(1);
      showToast({
        type: "success",
        message: "Notification deleted successfully.",
      });
      closeDeleteModal();
    } catch (deleteActionError) {
      showToast({
        type: "error",
        message:
          deleteActionError?.message || "Delete notification failed.",
      });
      console.error("Delete notification failed:", deleteActionError);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-[28px] border border-[#e5ebdc] bg-white"
          >
            <div className="h-52 bg-slate-200" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-24 rounded bg-slate-100" />
              <div className="h-5 w-2/3 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-5/6 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[24px] border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
        {error}
      </div>
    );
  }

  if (!notifications?.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#d7e3c8] bg-[#fbfdf7] px-6 py-12 text-center shadow-[0_24px_70px_-32px_rgba(20,24,16,0.18)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
          Notifications
        </p>
        <h3 className="mt-3 text-2xl font-black text-[#141810]">
          No notifications yet
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-[#6B7280]">
          Create the first dashboard notification to show campaigns, offers,
          and announcements here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {notifications.map((item) => (
        <article
          key={item.id}
          className="group overflow-hidden rounded-[30px] border border-[#e5ebdc] bg-white shadow-[0_24px_70px_-32px_rgba(20,24,16,0.22)] transition hover:-translate-y-1"
        >
          <div className="relative h-56 overflow-hidden bg-[#eef3e8]">
            {item.notification_image_url ? (
              <img
                src={item.notification_image_url}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-semibold text-[#7b8a63]">
                No image
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(20,24,16,0)_0%,rgba(20,24,16,0.86)_100%)] px-5 pb-5 pt-14 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                {formatDate(item.created_at)}
              </p>
              <h3 className="mt-2 text-xl font-black leading-tight">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <p className="min-h-12 text-sm leading-6 text-[#4B5563]">
              {item.description}
            </p>

            <div className="rounded-[22px] border border-[#e8ede0] bg-[#fbfdf7] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                Redirect URL
              </p>
              <a
                href={item.notification_url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block break-all text-sm font-semibold text-[#141810] underline decoration-[#b9d98a] underline-offset-4"
              >
                {item.notification_url}
              </a>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280]">
              <span>ID: {item.id}</span>
              <span>Updated {formatDate(item.updated_at)}</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => openEditModal(item)}
                className="rounded-full border-2 border-[#46EC12] px-5 py-2 text-xs font-bold text-[#141810] transition hover:bg-[#46EC12]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => openDeleteModal(item)}
                className="rounded-full bg-red-50 px-5 py-2 text-xs font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}

      <NotificationEditModal
        isOpen={isEditOpen}
        notification={editingNotification}
        form={editForm}
        updating={updating}
        updateError={updateError}
        onClose={closeEditModal}
        onChange={handleEditChange}
        onImageUpload={handleEditImageUpload}
        onSubmit={handleEditSubmit}
      />

      <NotificationDeleteModal
        isOpen={isDeleteOpen}
        notification={deletingNotification}
        deleting={deleting}
        deleteError={deleteError}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
