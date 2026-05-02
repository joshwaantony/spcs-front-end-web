


// const sliders = [
//   {
//     title: "Summer Book Fair 2024",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd8p5PA3luaTbQNde3txMD02IXlyfF2ZjPQvPXdSqyL3K2_6y6BhPLgabxvu2AZXE9epBBchG1_ZT2QFWy6IUQGxiQO_9zOoJPLUVxPTTdmS5ymMkYOh-nMt1V_C4w2wuxBAepjo7MClud8oeusY0wQRXuCNJjYaaiOvrwDjKnFmdiap5bnC4ViWvZjwPbRQ5m8kUnOl5zfMDwHa1bQfqvpy81KdnUwJY1TITia0NbIXWOugU1Jl_grBaLxxwSW_-lYVqDo2X5QzQ",
//   },
//   {
//     title: "New Arrivals Showcase",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6ZQb1kiDeQyaOu85zMrHJVlcf_Mw1NMnDYqYZPc4qzwVorZpSjJ3z3omfs5iGaWRsK0Q1756N0IZuCTIvhWeONMyJuEFZYWX6c5iHR81trBEmtfUcjakC0rfXsflatmiVWs3DEBe23qo2ZDFcTbsHHLXmBxI6FtvB7vgfDav3NiSZFH4WKUvMcCEqQG965DTLAbM4FIyOw0PRpOT_HyC3vx1DSv6DOqKUUvZcu5p7uqQAH9N4GlnPQDHjjHX232gohCtEivIfii8",
//   },
//   {
//     title: "Membership Drive",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHfAm7YnZRrRiQ56AvRYC3wN4WE1bQCs2FP1Ch44oJBBcWsmBcL319wQAz6gS79XB317RQTpry-W1hEC9phRC2VJkZikwKyk2OVlpwpIimSZKOMO7UQG8q1gN52kl4JqiK9DS6dZjlgb60xicFPYKTOGQTmntTP8LgS4z7gfP0sP65elYl7Qt2MmCsz9ahxkLazaqpzaYQX_BN5vv1kK5g80KjPOsiqnxF65xPY-9vVrJ5GiYqQuPWc_ZnJpqq4ofvQgVo41M4_DQ",
//   },
// ];

// export default function SliderGrid() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {sliders.map((s) => (
//         <div
//           key={s.title}
//           className="bg-white p-4 sm:p-5 rounded-[24px] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)]"
//         >
//           <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-5">
//             <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
//           </div>

//           <h3 className="font-bold text-sm sm:text-base mb-6 px-1">
//             {s.title}
//           </h3>

//           <div className="flex flex-col sm:flex-row gap-2 px-1">
//             <button className="border-2 border-[#46EC12] text-xs font-bold px-5 py-1.5 rounded-full hover:bg-[#46ec13] transition">
//               Edit
//             </button>
//             <button className="bg-red-50 text-red-500 text-xs font-bold px-5 py-1.5 rounded-full hover:bg-red-500 hover:text-white transition">
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useSliderStore } from "@/store/admin/dashboard/slider.store";
import { useToastStore } from "@/store/ui/toast.store";
import SliderDeleteModal from "@/components/(admin)/dashboard/slider/SliderDeleteModal";
import SliderEditModal from "@/components/(admin)/dashboard/slider/SliderEditModal";

export default function SliderGrid() {
  const {
    sliders,
    loading,
    error,
    updating,
    updateError,
    deleting,
    deleteError,
    fetchSliders,
    updateSlider,
    deleteSlider,
    resetUpdateSliderState,
    resetDeleteSliderState,
  } = useSliderStore();
  const showToast = useToastStore((state) => state.showToast);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingSlider, setDeletingSlider] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    slider_url: "",
    slider_img_url: "",
    slider_img_preview_url: "",
    slider_image: null,
  });

  useEffect(() => {
    fetchSliders(1);
  }, [fetchSliders]);

  const openEditModal = (slider) => {
    setEditingSlider(slider);
    setEditForm({
      title: slider.title || "",
      slider_url: slider.slider_url || "",
      slider_img_url: slider.slider_img_url || "",
      slider_img_preview_url: slider.slider_img_url || "",
      slider_image: null,
    });
    resetUpdateSliderState();
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    if (updating) {
      return;
    }

    setIsEditOpen(false);
    setEditingSlider(null);
    resetUpdateSliderState();
  };

  const openDeleteModal = (slider) => {
    setDeletingSlider(slider);
    resetDeleteSliderState();
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setIsDeleteOpen(false);
    setDeletingSlider(null);
    resetDeleteSliderState();
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "slider_img_url"
        ? { slider_img_preview_url: value || current.slider_img_preview_url }
        : {}),
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editingSlider?.id) {
      return;
    }

    const title = editForm.title.trim();
    const sliderUrl = editForm.slider_url.trim();

    if (!title || !sliderUrl) {
      return;
    }

    try {
      const payload = new FormData();
      payload.append("title", title);
      payload.append("slider_url", sliderUrl);

      if (editForm.slider_image) {
        payload.append("slider_image", editForm.slider_image);
      }

      await updateSlider(editingSlider.id, payload);
      await fetchSliders(1);
      showToast({ type: "success", message: "Slider updated successfully." });
      closeEditModal();
    } catch (updateActionError) {
      showToast({
        type: "error",
        message: updateActionError?.message || "Update slider failed.",
      });
      console.error("Update slider failed:", updateActionError);
    }
  };

  const handleEditImagePreview = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setEditForm((current) => ({
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

  const handleDeleteConfirm = async () => {
    if (!deletingSlider?.id) {
      return;
    }

    try {
      await deleteSlider(deletingSlider.id);
      await fetchSliders(1);
      showToast({ type: "success", message: "Slider deleted successfully." });
      closeDeleteModal();
    } catch (deleteActionError) {
      showToast({
        type: "error",
        message: deleteActionError?.message || "Delete slider failed.",
      });
      console.error("Delete slider failed:", deleteActionError);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-[24px] border border-gray-100 bg-white p-4 sm:p-5"
          >
            <div className="mb-5 aspect-[16/9] rounded-2xl bg-slate-200" />
            <div className="mb-3 h-4 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-1/2 rounded bg-slate-100" />
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

  if (!sliders?.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-gray-200 bg-white px-6 py-12 text-center text-sm font-medium text-gray-500">
        No sliders found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sliders?.map((s) => (
        <div
          key={s.id}
          className="bg-white p-4 sm:p-5 rounded-[24px] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)]"
        >
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-5">
            <img
              src={s.slider_img_url}
              alt={s.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="font-bold text-sm sm:text-base mb-6 h-6 px-1">
            {s.title}
          </h3>

          <p className="mb-6 px-1 text-xs text-gray-500 break-all">
            {s.slider_url}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 px-1">
            <button
              type="button"
              onClick={() => openEditModal(s)}
              className="border-2 border-[#46EC12] text-xs font-bold px-5 py-1.5 rounded-full hover:bg-[#46ec13] transition"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => openDeleteModal(s)}
              className="bg-red-50 text-red-500 text-xs font-bold px-5 py-1.5 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <SliderEditModal
        isOpen={isEditOpen}
        slider={editingSlider}
        form={editForm}
        updating={updating}
        updateError={updateError}
        onClose={closeEditModal}
        onChange={handleEditChange}
        onImageUpload={handleEditImagePreview}
        onSubmit={handleEditSubmit}
      />

      <SliderDeleteModal
        isOpen={isDeleteOpen}
        slider={deletingSlider}
        deleting={deleting}
        deleteError={deleteError}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
