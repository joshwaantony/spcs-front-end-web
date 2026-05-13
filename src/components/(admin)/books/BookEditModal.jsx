"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HiX } from "react-icons/hi";
import { useBooksStore } from "@/store/admin/books/books.store";
import { normalizeBook } from "@/store/admin/books/books.store";
import { useCategoryStore } from "@/store/admin/books/category.store";
import { useToastStore } from "@/store/ui/toast.store";
import { getBookById } from "@/services/admin/books/books.api";

const inputClassName =
  "h-12 w-full rounded-[16px] border border-[#dfe7d5] bg-white px-4 text-sm font-semibold text-[#141810] outline-none transition focus:border-[#46EC12] focus:ring-4 focus:ring-[#46EC12]/10";

const textareaClassName =
  "w-full rounded-[20px] border border-[#dfe7d5] bg-white px-4 py-4 text-sm font-medium text-[#141810] outline-none transition focus:border-[#46EC12] focus:ring-4 focus:ring-[#46EC12]/10";

const selectClassName =
  "h-12 w-full appearance-none rounded-[16px] border border-[#dfe7d5] bg-white px-4 text-sm font-semibold text-[#141810] outline-none transition focus:border-[#46EC12] focus:ring-4 focus:ring-[#46EC12]/10";

const getLinkedId = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value.id || value.category_id || value.discount_id || "";
};

const buildForm = (book) => ({
  title: book?.title || book?.name || "",
  authorName: book?.authorName || book?.author || "",
  category: getLinkedId(book?.category) || book?.category_id || "",
  type: book?.type || "PAPERBACK",
  price: String(book?.price || ""),
  titleMl: book?.titleMl || book?.malayalam_name || "",
  authorNameMl: book?.authorNameMl || book?.author_malayalam || "",
  isBestsellerManual: Boolean(book?.isBestsellerManual ?? book?.best_seller),
  description: book?.description || "",
  edition: book?.edition || "",
  isbn: book?.isbn || "",
  pages: String((book?.pages ?? book?.num_of_pages) || ""),
  publisherId: book?.publisherId || "",
  languageCode: book?.languageCode || book?.language || "",
  discountAmount: String(book?.discountAmount || "0"),
  sku: book?.sku || "",
  status: book?.status || "DRAFT",
  isAwardWinner: Boolean(book?.isAwardWinner ?? book?.award_winner),
  isNewArrival: Boolean(book?.isNewArrival ?? book?.new_arrival),
  isPrePublication: Boolean(
    book?.isPrePublication ?? book?.republication
  ),
  isFeatured: Boolean(book?.isFeatured ?? book?.highlight),
  rankOrder: String((book?.rankOrder ?? book?.rank) || ""),
  unlimited_stock: Boolean(book?.unlimited_stock),
  stock: String(book?.stock ?? ""),
  formatId: book?.formatId || "",
  formatMediaId: book?.formatMediaId || "",
  formatIsActive: Boolean(book?.formatIsActive ?? true),
  formatIsDigitalEnabled: Boolean(book?.formatIsDigitalEnabled),
  formatDrmEnabled: Boolean(book?.formatDrmEnabled ?? true),
  coverMediaId: book?.coverMediaId || "",
  cover_image: null,
  preview: book?.cover_image_url || "",
});

const toggleFields = [
  { key: "isBestsellerManual", label: "Best Seller" },
  { key: "isAwardWinner", label: "Award Winner" },
  { key: "isNewArrival", label: "New Arrival" },
  { key: "isPrePublication", label: "Pre Publication" },
  { key: "isFeatured", label: "Featured" },
  { key: "unlimited_stock", label: "Unlimited Stock" },
];

export default function BookEditModal({ isOpen, book, onClose }) {
  const [form, setForm] = useState(() => buildForm(book));
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingBook, setLoadingBook] = useState(false);
  const fileInputRef = useRef(null);
  const showToast = useToastStore((state) => state.showToast);
  const {
    page,
    limit,
    filter,
    search,
    fromDate,
    toDate,
    updating,
    updateError,
    updateBook,
    fetchBooks,
    resetUpdateBookState,
  } = useBooksStore();
  const { categories, fetchCategories, loading: categoryLoading } =
    useCategoryStore();

  const enabledFlags = useMemo(
    () => toggleFields.filter(({ key }) => form[key]),
    [form]
  );
  const hasSelectedCategoryOption = useMemo(
    () =>
      categories.some(
        (category) =>
          (category.id || category.category_id) === form.category
      ),
    [categories, form.category]
  );

  useEffect(() => {
    if (!isOpen || !book) {
      return;
    }

    let cancelled = false;

    const loadBook = async () => {
      setForm(buildForm(book));
      setSuccessMessage("");
      setLoadingBook(true);
      resetUpdateBookState();
      fetchCategories(1, 100, "");

      try {
        const res = await getBookById(book.id || book.book_id);

        if (cancelled) {
          return;
        }

        const detailedBook = normalizeBook(res?.data || res);
        setForm(buildForm(detailedBook || book));
      } catch (error) {
        if (!cancelled) {
          showToast({
            type: "error",
            message: error?.message || "Failed to fetch book details.",
          });
        }
      } finally {
        if (!cancelled) {
          setLoadingBook(false);
        }
      }
    };

    loadBook();

    return () => {
      cancelled = true;
    };
  }, [isOpen, book, resetUpdateBookState, fetchCategories, showToast]);

  useEffect(() => {
    if (!updateError) {
      return;
    }

    showToast({ type: "error", message: updateError });
  }, [showToast, updateError]);

  if (!isOpen || !book) {
    return null;
  }

  const handleClose = () => {
    if (updating || loadingBook) {
      return;
    }

    setSuccessMessage("");
    resetUpdateBookState();
    onClose();
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "unlimited_stock" && checked ? { stock: "0" } : {}),
      ...(name === "preview" ? { preview: value } : {}),
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
        cover_image: file,
        preview:
          typeof reader.result === "string" ? reader.result : current.preview,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
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
      titleMl: form.titleMl.trim(),
      authorName: form.authorName.trim() || null,
      authorNameMl: form.authorNameMl.trim() || null,
      description: form.description.trim(),
      edition: form.edition.trim(),
      pages: Number.isFinite(normalizedPages) ? normalizedPages : undefined,
      languageCode: form.languageCode.trim() || undefined,
      status: form.status,
      rankOrder: Number.isFinite(normalizedRank) ? normalizedRank : 0,
      isBestsellerManual: form.isBestsellerManual,
      isFeatured: form.isFeatured,
      isAwardWinner: form.isAwardWinner,
      isNewArrival: form.isNewArrival,
      isPrePublication: form.isPrePublication,
      publisherId: form.publisherId.trim() || null,
      coverMediaId: form.coverMediaId.trim() || null,
      categoryIds: form.category.trim() ? [form.category.trim()] : [],
      formats: [
        {
          id: form.formatId || undefined,
          type: form.type,
          price: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
          discountAmount: Number.isFinite(normalizedDiscountAmount)
            ? normalizedDiscountAmount
            : 0,
          sku: form.sku.trim() || undefined,
          isbn: form.isbn.trim() || undefined,
          hasUnlimitedStock: form.unlimited_stock,
          stockCount: Number.isFinite(normalizedStock) ? normalizedStock : 0,
          mediaId: form.formatMediaId || undefined,
          isDigitalEnabled:
            form.type === "EBOOK" ? true : form.formatIsDigitalEnabled,
          drmEnabled:
            form.type === "EBOOK" ? true : form.formatDrmEnabled,
          isActive: form.formatIsActive,
        },
      ],
    };

    try {
      await updateBook(book.id || book.book_id, payload);
      await fetchBooks({
        filter,
        page,
        limit,
        search,
        fromDate,
        toDate,
      });
      setSuccessMessage("Book updated successfully.");
      showToast({ type: "success", message: "Book updated successfully." });

      window.setTimeout(() => {
        resetUpdateBookState();
        onClose();
      }, 900);
    } catch (error) {
      console.error("Update book failed:", error);
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
          <div className="w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-[#f6faf1] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#e4ebda] bg-white/90 px-6 py-5 sm:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
                  Card Edit Popup
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#141810]">
                  Edit Book
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#edf1e8] bg-white text-[#6B7280]"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="grid gap-0 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-[#e4ebda] p-6 sm:p-8 xl:border-b-0 xl:border-r">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {loadingBook ? (
                    <div className="rounded-2xl border border-[#dfe7d5] bg-white px-4 py-3 text-sm font-medium text-[#6B7280]">
                      Loading latest book details...
                    </div>
                  ) : null}

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                      Replace Cover
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
                      className="flex w-full items-center justify-center gap-3 rounded-[24px] border-2 border-dashed border-[#d9e6c7] bg-[#fbfdf7] px-6 py-6 text-center transition hover:border-[#46EC12] hover:bg-[#f6fde9]"
                    >
                      <span className="material-symbols-outlined rounded-full bg-white p-3 text-[#7b8a63] shadow-sm">
                        cloud_upload
                      </span>
                      <span className="text-left">
                        <span className="block text-sm font-bold text-[#141810]">
                          Upload new cover image
                        </span>
                        <span className="mt-1 block text-xs text-[#6B7280]">
                          PNG, JPG, or WEBP
                        </span>
                      </span>
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Book Name">
                      <input name="title" value={form.title} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Author">
                      <input name="authorName" value={form.authorName} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Malayalam Name">
                      <input name="titleMl" value={form.titleMl} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Author in Malayalam">
                      <input name="authorNameMl" value={form.authorNameMl} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Category ID">
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
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
                        {form.category && !hasSelectedCategoryOption ? (
                          <option value={form.category}>
                            Current category ({form.category})
                          </option>
                        ) : null}
                      </select>
                    </Field>
                    <Field label="Book Type">
                      <select name="type" value={form.type} onChange={handleChange} className={selectClassName}>
                        <option value="PAPERBACK">Paperback</option>
                        <option value="HARDCOVER">Hardcover</option>
                        <option value="EBOOK">Ebook</option>
                        <option value="AUDIO">Audiobook</option>
                      </select>
                    </Field>
                    <Field label="Price">
                      <input type="number" name="price" value={form.price} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Edition">
                      <input name="edition" value={form.edition} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="ISBN">
                      <input name="isbn" value={form.isbn} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Pages">
                      <input type="number" name="pages" value={form.pages} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Publisher ID">
                      <input name="publisherId" value={form.publisherId} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Language">
                      <input name="languageCode" value={form.languageCode} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Discount Amount">
                      <input name="discountAmount" value={form.discountAmount} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Status">
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className={selectClassName}
                      >
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="ARCHIVED">Archived</option>
                        <option value="OUT_OF_STOCK">Out of Stock</option>
                        <option value="DISCONTINUED">Discontinued</option>
                      </select>
                    </Field>
                    <Field label="Rank">
                      <input type="number" name="rankOrder" value={form.rankOrder} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Stock">
                      <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        disabled={form.unlimited_stock}
                        className={`${inputClassName} disabled:cursor-not-allowed disabled:bg-[#f2f5ee]`}
                      />
                    </Field>
                    <Field label="SKU">
                      <input name="sku" value={form.sku} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Cover Media ID">
                      <input name="coverMediaId" value={form.coverMediaId} onChange={handleChange} className={inputClassName} />
                    </Field>
                    <Field label="Cover Preview URL">
                      <input name="preview" value={form.preview} onChange={handleChange} className={inputClassName} />
                    </Field>
                  </div>

                  <Field label="Description">
                    <textarea
                      name="description"
                      rows={4}
                      value={form.description}
                      onChange={handleChange}
                      className={textareaClassName}
                    />
                  </Field>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {toggleFields.map(({ key, label }) => (
                      <label
                        key={key}
                        className={`flex cursor-pointer items-center justify-between rounded-[18px] border px-4 py-4 transition ${
                          form[key]
                            ? "border-[#cfe4b2] bg-[#f5fbe9]"
                            : "border-[#e8ede3] bg-[#fbfcf9]"
                        }`}
                      >
                        <span className="text-sm font-bold text-[#141810]">
                          {label}
                        </span>
                        <input
                          type="checkbox"
                          name={key}
                          checked={form[key]}
                          onChange={handleChange}
                          className="h-5 w-5 rounded border-[#c9d7b6] text-[#46EC12] focus:ring-[#46EC12]/30"
                        />
                      </label>
                    ))}
                  </div>

                  {successMessage && (
                    <div className="rounded-2xl border border-[#daf2b4] bg-[#f7fde9] px-4 py-3 text-sm font-medium text-[#496619]">
                      {successMessage}
                    </div>
                  )}

                  {updateError && !successMessage && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {updateError}
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={updating || loadingBook}
                      className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updating || loadingBook}
                      className="h-12 rounded-full bg-[#46EC12] px-6 text-sm font-black text-[#141810] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loadingBook ? "Loading..." : updating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-[linear-gradient(180deg,#ffffff_0%,#eef8e0_100%)] p-6 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                  Card Preview
                </p>

                <div className="mt-5 overflow-hidden rounded-[30px] border border-[#dfe7d5] bg-white shadow-[0_24px_70px_-32px_rgba(20,24,16,0.35)]">
                  <div className="relative aspect-[4/5] bg-[#eef3e8]">
                    <img
                      src={form.preview}
                      alt={form.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(20,24,16,0)_0%,rgba(20,24,16,0.88)_100%)] px-6 pb-6 pt-20 text-white">
                      <div className="flex flex-wrap gap-2">
                        {enabledFlags.map(({ key, label }) => (
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
