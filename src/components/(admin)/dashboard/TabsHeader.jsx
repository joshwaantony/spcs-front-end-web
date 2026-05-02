"use client";

import { useState } from "react";
import BranchCreateModal from "@/components/(admin)/dashboard/branch/BranchCreateModal";
import { useSliderStore } from "@/store/admin/dashboard/slider.store";
import { useBranchStore } from "@/store/admin/dashboard/branch.store";
import { useNotificationStore } from "@/store/admin/dashboard/notification.store";
import { useToastStore } from "@/store/ui/toast.store";
import SliderCreateModal from "@/components/(admin)/dashboard/slider/SliderCreateModal";
import NotificationCreateModal from "@/components/(admin)/dashboard/notification/NotificationCreateModal";

export const DASHBOARD_TABS = [
  "Slider",
  "Notifications",
  "Bestseller",
  "Branches",
];

const initialForm = {
  title: "",
  slider_url: "",
  slider_image: null,
  slider_img_preview_url: "",
};

const initialNotificationForm = {
  title: "",
  description: "",
  notification_image: null,
  notification_img_preview_url: "",
  notification_url: "",
};

const initialBranchForm = {
  branch_name: "",
  branch_address: "",
  phone: "",
  map_url: "",
};

export default function TabsHeader({
  activeTab = "Slider",
  onTabChange = () => {},
}) {
  const {
    page,
    creating,
    createError,
    createSlider,
    fetchSliders,
    resetCreateSliderState,
  } = useSliderStore();
  const {
    creating: creatingBranch,
    createError: branchCreateError,
    createBranch,
    fetchBranches,
    resetCreateBranchState,
  } = useBranchStore();
  const {
    creating: creatingNotification,
    createError: notificationCreateError,
    createNotification,
    fetchNotifications,
    resetCreateNotificationState,
  } = useNotificationStore();
  const showToast = useToastStore((state) => state.showToast);

  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState(initialForm);
  const [notificationForm, setNotificationForm] = useState(
    initialNotificationForm
  );
  const [branchForm, setBranchForm] = useState(initialBranchForm);
  const [notificationValidationError, setNotificationValidationError] =
    useState("");
  const [notificationSuccessMessage, setNotificationSuccessMessage] =
    useState("");
  const [branchValidationError, setBranchValidationError] = useState("");
  const [branchSuccessMessage, setBranchSuccessMessage] = useState("");

  const canCreate =
    activeTab === "Slider" ||
    activeTab === "Notifications" ||
    activeTab === "Branches";

  const openModal = () => {
    if (activeTab === "Slider") {
      setForm(initialForm);
      setSuccessMessage("");
      resetCreateSliderState();
    }

    if (activeTab === "Notifications") {
      setNotificationForm(initialNotificationForm);
      setNotificationValidationError("");
      setNotificationSuccessMessage("");
      resetCreateNotificationState();
    }

    if (activeTab === "Branches") {
      setBranchForm(initialBranchForm);
      setBranchValidationError("");
      setBranchSuccessMessage("");
      resetCreateBranchState();
    }

    setIsOpen(true);
  };

  const closeModal = () => {
    if (
      (activeTab === "Slider" && creating) ||
      creatingNotification ||
      creatingBranch
    ) {
      return;
    }

    setIsOpen(false);
    setSuccessMessage("");
    setBranchValidationError("");
    setBranchSuccessMessage("");
    setNotificationValidationError("");
    setNotificationSuccessMessage("");
    resetCreateBranchState();
    resetCreateSliderState();
    resetCreateNotificationState();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        slider_image: file,
        slider_img_preview_url:
          typeof reader.result === "string"
            ? reader.result
            : current.slider_img_preview_url,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleNotificationChange = (event) => {
    const { name, value } = event.target;
    setNotificationForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleBranchChange = (event) => {
    const { name, value } = event.target;
    setBranchForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleNotificationImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setNotificationForm((current) => ({
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");

    if (!form.title.trim() || !form.slider_url.trim() || !form.slider_image) {
      showToast({
        type: "error",
        message: "Fill all slider fields before submit.",
      });
      return;
    }

    try {
      const payload = new FormData();
      payload.append("title", form.title.trim());
      payload.append("slider_url", form.slider_url.trim());
      payload.append("slider_image", form.slider_image);

      const res = await createSlider(payload);
      const createdItem = res?.data?.item;
      const successText = res?.message || res?.data?.msg || "Slider created successfully.";

      if (!createdItem?.id) {
        throw new Error("Slider was created but no item was returned.");
      }

      await fetchSliders(page || 1);
      setSuccessMessage(successText);
      showToast({ type: "success", message: successText });

      window.setTimeout(() => {
        setIsOpen(false);
        setSuccessMessage("");
        resetCreateSliderState();
      }, 1000);
    } catch (error) {
      showToast({
        type: "error",
        message: error?.message || "Create slider failed.",
      });
      console.error("Create slider failed:", error);
    }
  };

  const handleNotificationSubmit = async (event) => {
    event.preventDefault();
    setNotificationValidationError("");
    setNotificationSuccessMessage("");

    const title = notificationForm.title.trim();
    const description = notificationForm.description.trim();
    const notificationImage = notificationForm.notification_image;
    const notificationUrl = notificationForm.notification_url.trim();

    if (!title || !description || !notificationImage || !notificationUrl) {
      const message = "Fill all notification fields before submit.";
      setNotificationValidationError(message);
      showToast({ type: "error", message });
      return;
    }

    try {
      const payload = new FormData();
      payload.append("title", title);
      payload.append("description", description);
      payload.append("notification_url", notificationUrl);
      payload.append("notification_image", notificationImage);

      const res = await createNotification(payload);
      const createdItem = res?.data?.item;

      if (!createdItem?.id) {
        throw new Error("Notification was created but no item was returned.");
      }

      await fetchNotifications(1);
      const successText =
        res?.message || "Notification created successfully.";
      setNotificationSuccessMessage(successText);
      showToast({ type: "success", message: successText });

      window.setTimeout(() => {
        setIsOpen(false);
        setNotificationValidationError("");
        setNotificationSuccessMessage("");
        resetCreateNotificationState();
      }, 1200);
    } catch (error) {
      showToast({
        type: "error",
        message: error?.message || "Create notification failed.",
      });
      console.error("Create notification failed:", error);
    }
  };

  const handleBranchSubmit = async (event) => {
    event.preventDefault();
    setBranchValidationError("");
    setBranchSuccessMessage("");

    const branchName = branchForm.branch_name.trim();
    const branchAddress = branchForm.branch_address.trim();
    const phone = branchForm.phone.trim();
    const mapUrl = branchForm.map_url.trim();

    if (!branchName || !branchAddress || !phone || !mapUrl) {
      const message = "Fill all branch fields before submit.";
      setBranchValidationError(message);
      showToast({ type: "error", message });
      return;
    }

    try {
      const payload = {
        branch_name: branchName,
        branch_address: branchAddress,
        phone,
        map_url: mapUrl,
      };

      const res = await createBranch(payload);
      const createdItem = res?.data?.item;

      if (!createdItem?.id) {
        throw new Error("Branch was created but no item was returned.");
      }

      await fetchBranches(1);
      const successText =
        res?.message || res?.msg || "Branch created successfully.";
      setBranchSuccessMessage(successText);
      showToast({ type: "success", message: successText });

      window.setTimeout(() => {
        setIsOpen(false);
        setBranchValidationError("");
        setBranchSuccessMessage("");
        resetCreateBranchState();
      }, 1200);
    } catch (error) {
      showToast({
        type: "error",
        message: error?.message || "Create branch failed.",
      });
      console.error("Create branch failed:", error);
    }
  };

  return (
    <>
      <div
        className="
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <div
          className="
            flex items-center gap-6
            sm:gap-8 lg:gap-10
            border-b border-[#F3F4F6]
            overflow-x-auto scrollbar-hide
          "
        >
          {DASHBOARD_TABS.map((tab) => {
            const active = tab === activeTab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`
                  relative pb-3 whitespace-nowrap
                  text-xs sm:text-sm
                  transition-all
                  ${
                    active
                      ? "text-[#141810] font-semibold"
                      : "text-[#6B7280] font-semibold hover:text-[#141810]"
                  }
                `}
              >
                {tab}

                {active && (
                  <span
                    className="
                      absolute left-0 -bottom-[1px]
                      h-[2px] w-full
                      bg-[#46EC12] rounded-full
                    "
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={openModal}
          disabled={!canCreate}
          className="
            flex items-center justify-center gap-2
            bg-[#46EC12] text-[#141810]
            px-5 py-2.5
            sm:px-7 sm:py-3
            lg:px-8 lg:py-3.5
            rounded-full
            text-xs sm:text-sm
            font-bold
            hover:opacity-90 transition-all
            shrink-0
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
            add_circle
          </span>
          {activeTab === "Slider" ? "Create Slider" : `Create ${activeTab}`}
        </button>
      </div>

      <SliderCreateModal
        isOpen={isOpen && activeTab === "Slider"}
        form={form}
        creating={creating}
        createError={createError}
        successMessage={successMessage}
        onClose={closeModal}
        onChange={handleChange}
        onImageUpload={handleImageUpload}
        onSubmit={handleSubmit}
      />

      <NotificationCreateModal
        isOpen={isOpen && activeTab === "Notifications"}
        form={notificationForm}
        creating={creatingNotification}
        createError={notificationValidationError || notificationCreateError}
        successMessage={notificationSuccessMessage}
        onClose={closeModal}
        onChange={handleNotificationChange}
        onImageUpload={handleNotificationImageUpload}
        onSubmit={handleNotificationSubmit}
      />

      <BranchCreateModal
        isOpen={isOpen && activeTab === "Branches"}
        form={branchForm}
        creating={creatingBranch}
        createError={branchValidationError || branchCreateError}
        successMessage={branchSuccessMessage}
        onClose={closeModal}
        onChange={handleBranchChange}
        onSubmit={handleBranchSubmit}
      />
    </>
  );
}
