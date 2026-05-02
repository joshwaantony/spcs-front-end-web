

import { useState, useEffect } from "react";
import MagazineCard from "./MagazineCard";
import EditBulletinModal from "./EditBulletinModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useBulletinsStore } from "@/store/admin/bulletins/bulletins.store";

export default function MagazineGrid({
  page = 1,
  limit = 10,
  search = "",
  onPageChange = () => {},
}) {
  const [editingBulletin, setEditingBulletin] = useState(null);
  const [deletingBulletin, setDeletingBulletin] = useState(null);
  const { fetching, fetchError, bulletins, getBulletins } = useBulletinsStore();

  useEffect(() => {
    getBulletins(page, limit, search).catch((error) => {
      console.error("Error fetching bulletins:", error);
    });
  }, [page, limit, search]);

  const handleSaved = async (updatedTitle) => {
    setEditingBulletin(null);
    // Refresh the list after editing
    await getBulletins(page, limit, search);
  };

  const handleDeleted = async (bulletinId) => {
    setDeletingBulletin(null);
    // Refresh the list after deleting
    await getBulletins(page, limit, search);
  };

  if (fetching && bulletins.length === 0) {
    return (
      <section className="mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#A6F20D] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading bulletins...</p>
          </div>
        </div>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className="mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Error: {fetchError}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Recent Publications ({bulletins.length})
          </h2>
        </div>

        {bulletins.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No bulletins found</p>
          </div>
        ) : (
          <>
            {/* Responsive Grid */}
            <div className="
              grid 
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-6
              lg:gap-8
            ">
              {bulletins.map((item) => (
                <MagazineCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.cover_image_url}
                  size={item.file_size}
                  date={item.date}
                  fileUrl={item.pdf_url}
                  onEdit={() => setEditingBulletin(item)}
                  onDelete={() => setDeletingBulletin(item)}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <EditBulletinModal
        isOpen={Boolean(editingBulletin)}
        bulletin={editingBulletin}
        onClose={() => setEditingBulletin(null)}
        onSaved={handleSaved}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(deletingBulletin)}
        bulletin={deletingBulletin}
        onClose={() => setDeletingBulletin(null)}
        onDeleted={handleDeleted}
      />
    </>
  );
}
