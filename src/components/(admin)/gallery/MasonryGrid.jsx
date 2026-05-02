import PhotoCard from "./PhotoCard";

const photos = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl-7swXv-9hgtMamthtpT7S4rhxqv0bx4PJMGd31jn0iaB_Qu03SrpL_sGKM_IVX3GWr9NYRbohhxyXY4PnH6m5EVKQ6DOMHIljiGIpgdic4Bbyadm7KXhfbbwWYaxminVQ72CJcr3JVhqMBv8UltJGYYvwe1kukZe8xjZe0-dNxLoq3-1M-cXTDQEjBQ16vTaod5VyGPOefdRNGe73i6wCDq2t1GJiK7qk73kX24Fn-szQXioS0q6q4fq-uqYv-RTABkgyDXFT_g",
    tag: "Inauguration",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIhWFLQwriQiYFArARK__B9-qw6Y6qWanbIrYNEbHtP1RLZ3ceXsLFyV91W4pRxqJmqepKUYmiDpYmJAyt_AwPe8W7XnX2k7OEImwpD7LAODYjmXeuP51bfhHWBgeWrQpDKxePv-6Rl1DChBzHlaDjYxIAxEzB3YqD5vVz3sMi1qUrHgCpq_SHAKUETlI-zBrvG7TmD3ZQDHFDUcbJvWZUVcuqEylKkq7Ze0EmXe5IJ1KTOn7hKGQW0EWOd5lUsd7D6AlH1ufQdHo",
    tag: "Workshop",
  },

  // ✅ FIXED UNSPLASH URLS
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    tag: "Annual Meet",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    tag: "Awards Ceremony",
  },
  {
    src: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=1200&q=80",
    tag: "Workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    tag: "Inauguration",
  },


];

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo, index) => (
        <PhotoCard key={index} {...photo} />
      ))}
    </div>
  );
}
