




import DocumentCard from "./DocumentCard";

export default function DocumentList() {
  return (
    <div className="space-y-3 sm:space-y-4 mb-10">
      <DocumentCard
        title="Tender Notice: Demolition of Old Indiapress Building"
        meta="PDF • 2.4 MB • Jan 10, 2024"
        badge="Closing Soon"
        badgeColor="bg-red-100 text-red-700 border border-red-200"
        iconBg="bg-red-50 group-hover:bg-red-100"
        iconText="text-red-600"
      />

      <DocumentCard
        title="Tender Notice: Soil Stacking & Site Prep."
        meta="PDF • 1.2 MB • Jan 15, 2024"
        iconBg="bg-blue-50 group-hover:bg-blue-100"
        iconText="text-[#2C8CEE]"
      />

      <DocumentCard
        title="Aksharam Museum: Re-Tender Notice for Museum Setting"
        meta="PDF • 1.8 MB • Jan 12, 2024"
        badge="New"
        badgeColor="bg-green-100 text-green-700 border border-green-200"
        iconBg="bg-green-50 group-hover:bg-green-100"
        iconText="text-green-600"
      />

      <DocumentCard
        title="General Application Form"
        meta="DOCX • 450 KB • Dec 05, 2023"
        badge="Membership"
        badgeColor="bg-gray-100 text-gray-700 border border-gray-200"
        iconBg="bg-orange-50 group-hover:bg-orange-100"
        iconText="text-orange-600"
        fileIcon="description"
      />
    </div>
  );
}
