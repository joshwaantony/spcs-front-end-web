"use client";

import { useEffect, useState } from "react";
import BranchDeleteModal from "@/components/(admin)/dashboard/branch/BranchDeleteModal";
import BranchEditModal from "@/components/(admin)/dashboard/branch/BranchEditModal";
import { useBranchStore } from "@/store/admin/dashboard/branch.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function BranchGrid() {
  const {
    branches,
    loading,
    error,
    updating,
    updateError,
    deleting,
    deleteError,
    fetchBranches,
    deleteBranch,
    updateBranch,
    resetDeleteBranchState,
    resetUpdateBranchState,
  } = useBranchStore();
  const showToast = useToastStore((state) => state.showToast);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingBranch, setDeletingBranch] = useState(null);
  const [editForm, setEditForm] = useState({
    branch_name: "",
    branch_address: "",
    phone: "",
    map_url: "",
  });

  useEffect(() => {
    fetchBranches(1);
  }, [fetchBranches]);

  const openEditModal = (branch) => {
    setEditingBranch(branch);
    setEditForm({
      branch_name: branch.branch_name || "",
      branch_address: branch.branch_address || "",
      phone: branch.phone || "",
      map_url: branch.map_url || "",
    });
    resetUpdateBranchState();
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    if (updating) {
      return;
    }

    setIsEditOpen(false);
    setEditingBranch(null);
    resetUpdateBranchState();
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editingBranch?.id) {
      return;
    }

    const payload = {
      branch_name: editForm.branch_name.trim(),
      branch_address: editForm.branch_address.trim(),
      phone: editForm.phone.trim(),
      map_url: editForm.map_url.trim(),
    };

    if (
      !payload.branch_name ||
      !payload.branch_address ||
      !payload.phone ||
      !payload.map_url
    ) {
      return;
    }

    try {
      await updateBranch(editingBranch.id, payload);
      await fetchBranches(1);
      showToast({ type: "success", message: "Branch updated successfully." });
      closeEditModal();
    } catch (updateActionError) {
      showToast({
        type: "error",
        message: updateActionError?.message || "Update branch failed.",
      });
      console.error("Update branch failed:", updateActionError);
    }
  };

  const openDeleteModal = (branch) => {
    setDeletingBranch(branch);
    resetDeleteBranchState();
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setIsDeleteOpen(false);
    setDeletingBranch(null);
    resetDeleteBranchState();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBranch?.id) {
      return;
    }

    try {
      await deleteBranch(deletingBranch.id);
      await fetchBranches(1);
      showToast({ type: "success", message: "Branch deleted successfully." });
      closeDeleteModal();
    } catch (deleteActionError) {
      showToast({
        type: "error",
        message: deleteActionError?.message || "Delete branch failed.",
      });
      console.error("Delete branch failed:", deleteActionError);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-[28px] border border-[#e5ebdc] bg-white p-6"
          >
            <div className="h-4 w-24 rounded bg-slate-100" />
            <div className="mt-4 h-6 w-2/3 rounded bg-slate-200" />
            <div className="mt-6 h-4 w-full rounded bg-slate-100" />
            <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
            <div className="mt-6 h-11 w-full rounded-full bg-slate-100" />
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

  if (!branches?.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#d7e3c8] bg-[#fbfdf7] px-6 py-12 text-center shadow-[0_24px_70px_-32px_rgba(20,24,16,0.18)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
          Branches
        </p>
        <h3 className="mt-3 text-2xl font-black text-[#141810]">
          No branches found
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-[#6B7280]">
          Branch locations will appear here once the branch module is connected.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {branches.map((branch) => (
        <article
          key={branch.id}
          className="overflow-hidden rounded-[30px] border border-[#e5ebdc] bg-white shadow-[0_24px_70px_-32px_rgba(20,24,16,0.22)]"
        >
          <div className="bg-[linear-gradient(135deg,#f6fde9_0%,#eef7de_55%,#ffffff_100%)] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
                  Branch Location
                </p>
                <h3 className="mt-3 text-2xl font-black leading-tight text-[#141810]">
                  {branch.branch_name}
                </h3>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#496619] shadow-sm">
                {branch.id}
              </span>
            </div>
          </div>

          <div className="space-y-4 p-6">
            <div className="rounded-[22px] border border-[#e8ede0] bg-[#fbfdf7] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                Address
              </p>
              <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                {branch.branch_address}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-[#e8ede0] bg-white p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                  Phone
                </p>
                <a
                  href={`tel:${branch.phone}`}
                  className="mt-2 block text-sm font-semibold text-[#141810]"
                >
                  {branch.phone}
                </a>
              </div>

              <div className="rounded-[22px] border border-[#e8ede0] bg-white p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                  Maps
                </p>
                <a
                  href={branch.map_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-sm font-semibold text-[#141810] underline decoration-[#b9d98a] underline-offset-4"
                >
                  Open location
                </a>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => openEditModal(branch)}
                className="rounded-full border-2 border-[#46EC12] px-5 py-2 text-xs font-bold text-[#141810] transition hover:bg-[#46EC12]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => openDeleteModal(branch)}
                className="rounded-full bg-red-50 px-5 py-2 text-xs font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}

      <BranchEditModal
        isOpen={isEditOpen}
        branch={editingBranch}
        form={editForm}
        updating={updating}
        updateError={updateError}
        onClose={closeEditModal}
        onChange={handleEditChange}
        onSubmit={handleEditSubmit}
      />

      <BranchDeleteModal
        isOpen={isDeleteOpen}
        branch={deletingBranch}
        deleting={deleting}
        deleteError={deleteError}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
