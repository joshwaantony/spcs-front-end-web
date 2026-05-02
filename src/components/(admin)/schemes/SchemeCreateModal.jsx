"use client";

import { useEffect, useRef, useState } from "react";
import { useSchemesStore } from "@/store/admin/schemes/schemes.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function SchemeCreateModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [imageFile, setImageFile] = useState(null);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const {
    search,
    creating,
    createError,
    createSuccess,
    createScheme,
    fetchSchemes,
    resetCreateSchemeState,
  } = useSchemesStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setTitle("");
    setDescription("");
    setStatus("ACTIVE");
    setImageFile(null);
    setLocalError("");
    resetCreateSchemeState();
  }, [isOpen, resetCreateSchemeState]);

  useEffect(() => {
    if (!createSuccess) {
      return;
    }

    showToast({ type: "success", message: createSuccess });
    resetCreateSchemeState();
  }, [createSuccess, resetCreateSchemeState, showToast]);

  useEffect(() => {
    if (!createError) {
      return;
    }

    showToast({ type: "error", message: createError });
  }, [createError, showToast]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (creating) {
      return;
    }

    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    const normalizedTitle = title.trim();
    const normalizedDescription = description.trim();

    if (!normalizedTitle) {
      setLocalError("Scheme title is required.");
      return;
    }

    if (!normalizedDescription) {
      setLocalError("Scheme description is required.");
      return;
    }

    const payload = new FormData();
    payload.append("title", normalizedTitle);
    payload.append("description", normalizedDescription);
    payload.append("status", status);

    if (imageFile) {
      payload.append("scheme_image", imageFile);
    }

    try {
      await createScheme(payload);
      await fetchSchemes(search);
      handleClose();
    } catch (error) {
      console.error("Create scheme failed:", error);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-[#141810]/55 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-[90] overflow-y-auto p-4 sm:p-6">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-6xl">
            <div className="bg-white rounded-[24px] shadow-2xl shadow-black/10 overflow-hidden">
              <form onSubmit={handleSubmit}>
                <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                      Create Schemes & Plans
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base mt-2">
                      Add plan details, image, and launch your new scheme from this popup.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={creating}
                    className="shrink-0 h-11 w-11 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-label="Close create scheme popup"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <div className="p-4 sm:p-5 lg:p-8">
                  <div className="bg-gray-50 rounded-lg p-1">
                    <div
                      className="flex flex-col lg:grid lg:grid-cols-[1fr_320px]
                                 gap-6 lg:gap-8 p-5 sm:p-6 lg:p-8"
                    >
                      <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold ml-2">Scheme Name</label>
                          <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            className="w-full h-12 sm:h-14 rounded-full px-5 sm:px-6 border border-gray-200 bg-white focus:ring-primary focus:border-primary"
                            placeholder="e.g., Summer Reading Scheme 2026"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold ml-2">Plan Description</label>
                          <textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            className="w-full min-h-[180px] sm:min-h-[220px] rounded-[24px] border border-gray-200 bg-white p-4 sm:p-6 focus:ring-primary focus:border-primary text-sm sm:text-base placeholder:text-gray-400"
                            placeholder="Enter detailed scheme terms and conditions..."
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold ml-2">Status</label>
                          <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            className="w-full h-12 sm:h-14 rounded-full px-5 sm:px-6 border border-gray-200 bg-white focus:ring-primary focus:border-primary text-sm sm:text-base"
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-bold mb-2 ml-2">
                          Scheme Image
                        </label>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/webp"
                          onChange={(event) =>
                            setImageFile(event.target.files?.[0] || null)
                          }
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 sm:p-8 bg-gray-50/50 hover:border-[#A6F20D] hover:bg-[#E9F8D4] transition cursor-pointer group text-center"
                        >
                          <div
                            className="bg-[#c5f483] p-3 sm:p-4 rounded-full mb-4
                                       group-hover:scale-110 transition-transform"
                          >
                            <span
                              className="material-symbols-outlined
                                         text-[#5f8f00] text-3xl"
                            >
                              cloud_upload
                            </span>
                          </div>

                          <p className="font-bold text-center text-sm sm:text-base">
                            Upload Scheme Image
                          </p>
                          <p className="text-gray-400 text-xs text-center mt-2 max-w-[220px]">
                            JPG, PNG or WEBP up to 10MB
                          </p>

                          {imageFile && (
                            <p className="text-[11px] sm:text-xs text-[#4A7A06] mt-4 break-all">
                              {imageFile.name}
                            </p>
                          )}
                        </button>
                      </div>
                    </div>

                    {(localError || createError || createSuccess) && (
                      <div className="px-5 sm:px-6 pt-1">
                        <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
                          {localError && <p className="text-red-600">{localError}</p>}
                          {!localError && createError && (
                            <p className="text-red-600">{createError}</p>
                          )}
                          {!localError && !createError && createSuccess && (
                            <p className="text-green-700">{createSuccess}</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div
                      className="flex justify-center sm:justify-end
                                 p-5 sm:p-6 border-t border-gray-100"
                    >
                      <button
                        type="submit"
                        disabled={creating}
                        className="w-full sm:w-auto bg-[#A6F20D] text-charcoal font-black text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {creating ? "CREATING..." : "Launch Scheme"}
                        <span className="material-symbols-outlined">
                          rocket_launch
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
