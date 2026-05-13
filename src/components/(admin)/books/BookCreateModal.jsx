"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HiX } from "react-icons/hi";
import { useBooksStore } from "@/store/admin/books/books.store";
import { useCategoryStore } from "@/store/admin/books/category.store";
import { useToastStore } from "@/store/ui/toast.store";
import {
  ASSET_TYPES,
  formatFileSize,
  validateAssetFile,
} from "@/services/admin/media/media.constants";
import { uploadMediaAsset } from "@/services/admin/media/media.api";

const initialForm = {
  title: "",
  authorName: "",
  category: "",
  type: "PAPERBACK",
  price: "",
  titleMl: "",
  authorNameMl: "",
  isBestsellerManual: false,
  description: "",
  edition: "",
  isbn: "",
  pages: "",
  publisherId: "",
  languageCode: "",
  discountAmount: "0",
  sku: "",
  status: "DRAFT",
  isAwardWinner: false,
  isNewArrival: false,
  isPrePublication: false,
  isFeatured: false,
  rankOrder: "",
  unlimited_stock: false,
  stock: "0",
  cover_image: null,
  cover_img_preview_url: "",
  coverMediaId: "",
};

const booleanFieldGroups = [
  { key: "isBestsellerManual", label: "Best Seller" },
  { key: "isAwardWinner", label: "Award Winner" },
  { key: "isNewArrival", label: "New Arrival" },
  { key: "isPrePublication", label: "Pre Publication" },
  { key: "isFeatured", label: "Featured" },
  { key: "unlimited_stock", label: "Unlimited Stock" },
];

const inputClassName =
  "h-14 w-full rounded-[18px] border border-[#dfe7d5] bg-white px-4 text-sm font-semibold text-[#141810] placeholder:text-[#A1A8A0] outline-none transition focus:border-[#46EC12] focus:ring-4 focus:ring-[#46EC12]/10";

const selectClassName =
  "h-14 w-full appearance-none rounded-[18px] border border-[#dfe7d5] bg-white px-4 text-sm font-semibold text-[#141810] outline-none transition focus:border-[#46EC12] focus:ring-4 focus:ring-[#46EC12]/10";

export default function BookCreateModal({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const fileInputRef = useRef(null);
  const showToast = useToastStore((state) => state.showToast);
  const {
    page,
    limit,
    filter,
    search,
    fromDate,
    toDate,
    creating,
    createError,
    createBook,
    updateBook,
    fetchBooks,
    resetCreateBookState,
  } = useBooksStore();
  const {
    categories,
    fetchCategories,
    loading: categoryLoading,
  } = useCategoryStore();

  const featuredFlags = useMemo(
    () => booleanFieldGroups.filter(({ key }) => form[key]),
    [form]
  );
  const isSubmitting = creating || uploadingCover;
  const selectedCoverFileName = form.cover_image?.name || "";

  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
      setSuccessMessage("");
      resetCreateBookState();
      fetchCategories(1, 100, "");
    }
  }, [isOpen, resetCreateBookState, fetchCategories]);

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
    if (isSubmitting) {
      return;
    }

    setForm(initialForm);
    setSuccessMessage("");
    resetCreateBookState();
    onClose();
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "cover_img_preview_url"
        ? {
            cover_img_preview_url: value || current.cover_img_preview_url,
          }
        : {}),
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      validateAssetFile({
        file,
        assetType: ASSET_TYPES.BOOK_COVER,
      });
    } catch (error) {
      event.target.value = "";
      showToast({
        type: "error",
        message: error?.message || "Invalid cover image.",
      });
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        cover_image: file,
        cover_img_preview_url:
          typeof reader.result === "string"
            ? reader.result
            : current.cover_img_preview_url,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    const selectedCategory = form.category.trim();
    const normalizedPrice = Number(form.price);
    const normalizedPages = Number(form.pages);
    const normalizedRank =
      form.rankOrder.trim() === "" ? 0 : Number(form.rankOrder);
    const normalizedStock = form.unlimited_stock
      ? 0
      : Number(form.stock);
    const normalizedDiscountAmount = Number(form.discountAmount);

    const payload = {
      title: form.title.trim(),
      titleMl: form.titleMl.trim() || undefined,
      authorName: form.authorName.trim() || undefined,
      authorNameMl: form.authorNameMl.trim() || undefined,
      description: form.description.trim() || undefined,
      edition: form.edition.trim() || undefined,
      pages: Number.isFinite(normalizedPages) ? normalizedPages : undefined,
      languageCode: form.languageCode.trim() || undefined,
      status: form.status,
      rankOrder: Number.isFinite(normalizedRank) ? normalizedRank : 0,
      isBestsellerManual: form.isBestsellerManual,
      isFeatured: form.isFeatured,
      isAwardWinner: form.isAwardWinner,
      isNewArrival: form.isNewArrival,
      isPrePublication: form.isPrePublication,
      publisherId: form.publisherId.trim() || undefined,
      coverMediaId:
        form.cover_image || !form.coverMediaId.trim()
          ? undefined
          : form.coverMediaId.trim(),
      categoryIds: selectedCategory ? [selectedCategory] : [],
      formats: [
        {
          type: form.type,
          price: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
          discountAmount: Number.isFinite(normalizedDiscountAmount)
            ? normalizedDiscountAmount
            : 0,
          sku: form.sku.trim() || undefined,
          isbn: form.isbn.trim() || undefined,
          hasUnlimitedStock: form.unlimited_stock,
          stockCount: Number.isFinite(normalizedStock) ? normalizedStock : 0,
          isDigitalEnabled: form.type === "EBOOK",
          drmEnabled: form.type === "EBOOK",
          isActive: true,
        },
      ],
    };

    try {
      const res = await createBook(payload);
      const createdBookId = res?.data?.id || res?.data?.book_id;
      let coverUploadWarning = "";

      if (form.cover_image) {
        if (!createdBookId) {
          coverUploadWarning =
            "Book created, but cover upload was skipped because the book ID was not returned.";
        } else {
          setUploadingCover(true);

          try {
            const uploadedCover = await uploadMediaAsset({
              file: form.cover_image,
              assetType: ASSET_TYPES.BOOK_COVER,
              entityId: createdBookId,
              altText: form.title.trim() || undefined,
            });

            await updateBook(createdBookId, {
              coverMediaId: uploadedCover.mediaId,
            });
          } catch (error) {
            coverUploadWarning =
              error?.message ||
              "Book created, but attaching the uploaded cover failed.";
          } finally {
            setUploadingCover(false);
          }
        }
      }

      await fetchBooks({
        filter,
        page,
        limit,
        search,
        fromDate,
        toDate,
      });

      const successText = coverUploadWarning
        ? `Book created successfully. ${coverUploadWarning}`
        : form.cover_image
          ? "Book created and cover uploaded successfully."
          : res?.message || "Book created successfully.";

      setSuccessMessage(successText);
      showToast({
        type: coverUploadWarning ? "error" : "success",
        message: successText,
      });

      window.setTimeout(() => {
        setForm(initialForm);
        setSuccessMessage("");
        resetCreateBookState();
        onClose();
      }, 1000);
    } catch (error) {
      setUploadingCover(false);
      console.error("Create book failed:", error);
      showToast({
        type: "error",
        message: error?.message || "Failed to create book.",
      });
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-[#141810]/55 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-[70] overflow-y-auto p-4 md:p-6">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-7xl overflow-hidden rounded-[32px] border border-white/70 bg-[#f6faf1] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#e4ebda] bg-white/90 px-6 py-5 backdrop-blur sm:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
                  Book payload preview
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  Add New Book
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#edf1e8] bg-white text-[#6B7280] transition hover:text-[#141810]"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="grid gap-0 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="border-b border-[#e4ebda] p-6 sm:p-8 xl:border-b-0 xl:border-r">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                      Cover Image Upload
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full items-center justify-center gap-3 rounded-[28px] border-2 border-dashed border-[#d9e6c7] bg-[#fbfdf7] px-6 py-8 text-center transition hover:border-[#46EC12] hover:bg-[#f6fde9]"
                    >
                      <span className="material-symbols-outlined rounded-full bg-white p-3 text-[#7b8a63] shadow-sm">
                        cloud_upload
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-[#141810]">
                          Upload cover image
                        </span>
                        <span className="mt-1 block text-xs text-[#6B7280]">
                          PNG, JPG, or WEBP up to 5 MB. The cover is uploaded
                          automatically after the book is created.
                        </span>
                        {form.cover_image && (
                          <span className="mt-2 block text-[11px] font-medium text-[#496619]">
                            {selectedCoverFileName} ({formatFileSize(form.cover_image.size)})
                          </span>
                        )}
                      </span>
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Book Name">
                      <input
                        name="title"
                        value={form.title}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>

                    <Field label="Author">
                      <input
                        name="authorName"
                        value={form.authorName}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>

                    <Field label="Malayalam Name">
                      <input
                        name="titleMl"
                        value={form.titleMl}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>

                    <Field label="Author in Malayalam">
                      <input
                        name="authorNameMl"
                        value={form.authorNameMl}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>
                  </div>

                  <Field label="Description">
                    <textarea
                      name="description"
                      rows={4}
                      value={form.description}
                      onChange={handleInputChange}
                      className="w-full rounded-[24px] border border-[#dfe7d5] bg-white px-4 py-4 text-sm font-medium text-[#141810] placeholder:text-[#A1A8A0] outline-none transition focus:border-[#46EC12] focus:ring-4 focus:ring-[#46EC12]/10"
                    />
                  </Field>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Category ID">
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        className={selectClassName}
                        required
                      >
                        <option value="">
                          {categoryLoading
                            ? "Loading categories..."
                            : "Select category"}
                        </option>
                        {categories.map((category) => (
                          <option
                            key={category.id || category.category_id}
                            value={category.id || category.category_id}
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Book Type">
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleInputChange}
                        className={selectClassName}
                      >
                        <option value="PAPERBACK">Paperback</option>
                        <option value="HARDCOVER">Hardcover</option>
                        <option value="EBOOK">Ebook</option>
                        <option value="AUDIO">Audiobook</option>
                      </select>
                    </Field>

                    <Field label="Language">
                      <input
                        name="languageCode"
                        value={form.languageCode}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>

                    <Field label="Status">
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleInputChange}
                        className={selectClassName}
                      >
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="ARCHIVED">Archived</option>
                        <option value="OUT_OF_STOCK">Out of Stock</option>
                        <option value="DISCONTINUED">Discontinued</option>
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Price">
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>

                    <Field label="Discount Amount">
                      <input
                        name="discountAmount"
                        value={form.discountAmount}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>

                    <Field label="Rank">
                      <input
                        type="number"
                        name="rankOrder"
                        value={form.rankOrder}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>

                    <Field label="Stock">
                      <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleInputChange}
                        disabled={form.unlimited_stock}
                        className={`${inputClassName} disabled:cursor-not-allowed disabled:bg-[#f2f5ee]`}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Edition">
                      <input
                        name="edition"
                        value={form.edition}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>

                    <Field label="ISBN">
                      <input
                        name="isbn"
                        value={form.isbn}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>

                    <Field label="Pages">
                      <input
                        type="number"
                        name="pages"
                        value={form.pages}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>

                    <Field label="Publisher">
                      <input
                        name="publisherId"
                        value={form.publisherId}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </Field>
                  </div>

                  <Field label="SKU">
                    <input
                      name="sku"
                      value={form.sku}
                      onChange={handleInputChange}
                      className={inputClassName}
                    />
                  </Field>

                  <Field label="Cover Preview URL">
                    <input
                      name="cover_img_preview_url"
                      value={form.cover_img_preview_url}
                      onChange={handleInputChange}
                      placeholder="http://localhost:5000/uploads/books/randamoozham-cover.jpg"
                      className={inputClassName}
                    />
                  </Field>

                  <div className="rounded-[28px] border border-[#dce8cd] bg-white p-5 shadow-[0_20px_60px_-34px_rgba(20,24,16,0.16)]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                          Merchandising flags
                        </p>
                        <h3 className="mt-1 text-lg font-black text-[#141810]">
                          Shelf visibility and badges
                        </h3>
                      </div>
                      <div className="rounded-full bg-[#eef8e0] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#496619]">
                        {featuredFlags.length} enabled
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {booleanFieldGroups.map(({ key, label }) => (
                        <label
                          key={key}
                          className={`flex cursor-pointer items-center justify-between rounded-[20px] border px-4 py-4 transition ${
                            form[key]
                              ? "border-[#cfe4b2] bg-[#f5fbe9]"
                              : "border-[#e8ede3] bg-[#fbfcf9]"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-bold text-[#141810]">
                              {label}
                            </p>
                            <p className="mt-1 text-xs font-medium text-[#6B7280]">
                              {form[key] ? "Enabled" : "Disabled"}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            name={key}
                            checked={form[key]}
                            onChange={handleInputChange}
                            className="h-5 w-5 rounded border-[#c9d7b6] text-[#46EC12] focus:ring-[#46EC12]/30"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {successMessage && (
                    <div className="rounded-2xl border border-[#daf2b4] bg-[#f7fde9] px-4 py-3 text-sm font-medium text-[#496619]">
                      {successMessage}
                    </div>
                  )}
                  {createError && !successMessage && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {createError}
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563] transition hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 rounded-full bg-[#46EC12] px-6 text-sm font-black text-[#141810] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {creating
                        ? "Creating book..."
                        : uploadingCover
                          ? "Uploading cover..."
                          : "Create Book"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-[linear-gradient(180deg,#ffffff_0%,#eef8e0_100%)] p-6 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                  Cover preview
                </p>

                <div className="mt-5 overflow-hidden rounded-[30px] border border-[#dfe7d5] bg-white shadow-[0_24px_70px_-32px_rgba(20,24,16,0.35)]">
                  <div className="relative aspect-[4/5] bg-[#eef3e8]">
                    {form.cover_img_preview_url ? (
                      <img
                        src={form.cover_img_preview_url}
                        alt={form.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-[#7b8a63]">
                        Select a cover image to preview it here.
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(20,24,16,0)_0%,rgba(20,24,16,0.88)_100%)] px-6 pb-6 pt-20 text-white">
                      <div className="flex flex-wrap gap-2">
                        {featuredFlags.map(({ key, label }) => (
                          <span
                            key={key}
                            className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-4 text-3xl font-black leading-tight">
                        {form.titleMl || form.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-white/80">
                        {form.authorNameMl || form.authorName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7b8a63]">
                          Catalogue card
                        </p>
                        <h4 className="mt-2 text-2xl font-black text-[#141810]">
                          {form.title}
                        </h4>
                        <p className="mt-1 text-sm font-semibold text-[#6B7280]">
                          {form.authorName}
                        </p>
                      </div>
                      <div className="rounded-[20px] bg-[#141810] px-4 py-3 text-right text-white">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                          Price
                        </p>
                        <p className="mt-1 text-2xl font-black">Rs {form.price}</p>
                      </div>
                    </div>

                    <p className="rounded-[24px] bg-[#f7f9f3] px-4 py-4 text-sm font-medium leading-6 text-[#445046]">
                      {form.description}
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <PreviewStat label="Edition" value={form.edition} />
                      <PreviewStat label="ISBN" value={form.isbn} />
                      <PreviewStat label="Publisher" value={form.publisherId} />
                      <PreviewStat label="Pages" value={form.pages} />
                      <PreviewStat label="Language" value={form.languageCode} />
                      <PreviewStat
                        label="Availability"
                        value={
                          form.unlimited_stock
                            ? "Unlimited stock"
                            : `${form.stock} copies`
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
        {label}
      </label>
      {children}
    </div>
  );
}

function PreviewStat({ label, value }) {
  return (
    <div className="rounded-[22px] border border-[#e8ede3] bg-[#fbfcf9] px-4 py-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7b8a63]">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-[#141810]">{value}</p>
    </div>
  );
}
