/* ================================================================
   STICKY FROG — GALLERY PHOTO LIST
   ================================================================

   HOW TO ADD A PHOTO:
   1. Put your photo in this same "images" folder
   2. Add a new line below following this format:
      { src: "images/YOUR-PHOTO.jpg", label: "Your Label Here" },

   HOW TO REMOVE A PHOTO:
   - Delete or comment out the line ( // at the start )

   HOW IT WORKS:
   - The gallery shows 5 random photos from this list every time
     the page loads or refreshes — automatically!

   ================================================================ */

const GALLERY_PHOTOS = [

  { src: "images/gallery-1.jpg",  label: "Screen Print — Apparel"   },
  { src: "images/gallery-2.jpg",  label: "Vehicle Graphics"          },
  { src: "images/gallery-3.jpg",  label: "Screen Print — Events"     },
  { src: "images/gallery-4.jpg",  label: "Custom Signs"              },
  { src: "images/gallery-6.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-7.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-8.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-9.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-10.jpg", label: "Heat Transfer / DTF"       },
  { src: "images/gallery-11.jpg", label: "Vehicle Graphics"       },
  { src: "images/gallery-12.jpg", label: "Heat Transfer / DTF"       },
  { src: "images/gallery-13.jpg", label: "Heat Transfer / DTF"       },
  { src: "images/gallery-14.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-15.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-16.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-17.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-18.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-19.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-20.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-21.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-22.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-23.jpg",  label: "Heat Transfer / DTF"       },
  { src: "images/gallery-24.jpg",  label: "Heat Transfer / DTF"       },
  

  // Add more photos below — just copy the line above and change the filename + label:
  // { src: "images/gallery-6.jpg",  label: "Labels & Decals"         },
  // { src: "images/gallery-7.jpg",  label: "Screen Print — Sports"   },
  // { src: "images/gallery-8.jpg",  label: "Vehicle Wrap"            },
  // { src: "images/gallery-9.jpg",  label: "Custom Embroidery"       },
  // { src: "images/gallery-10.jpg", label: "School Uniforms"         },

];

/* ================================================================
   DO NOT EDIT BELOW THIS LINE
   ================================================================ */

(function () {
  // Shuffle array using Fisher-Yates
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function loadGallery() {
    const slots = 5;
    const pool  = GALLERY_PHOTOS.length >= slots
      ? shuffle(GALLERY_PHOTOS).slice(0, slots)
      : shuffle([...GALLERY_PHOTOS, ...GALLERY_PHOTOS, ...GALLERY_PHOTOS]).slice(0, slots);

    pool.forEach((photo, i) => {
      const img   = document.getElementById('gimg-' + i);
      const label = document.getElementById('glabel-' + i);
      const slot  = document.getElementById('gslot-' + i);

      if (!img || !label || !slot) return;

      // Shimmer while the photo is fetched
      slot.classList.add('g-loading');

      // Start slightly zoomed + invisible for a cinematic zoom-settle entrance
      img.style.transition = 'none';
      img.style.opacity = '0';
      img.style.transform = 'scale(1.18)';

      img.src = photo.src;
      img.alt = photo.label;
      label.textContent = photo.label;

      img.onload = () => {
        slot.classList.remove('g-loading');
        requestAnimationFrame(() => {
          img.style.transition = 'transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease';
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
        });
        // Hand control back to the stylesheet's hover transitions once settled
        setTimeout(() => {
          img.style.transition = '';
          img.style.transform = '';
          img.style.opacity = '';
        }, 1150);
      };
      img.onerror = () => {
        // If image missing, show a placeholder
        slot.classList.remove('g-loading');
        slot.style.background = 'rgba(26,46,26,0.4)';
        label.textContent = photo.label + ' (photo not found)';
        label.style.transform = 'translateY(0)';
        img.style.transition = '';
        img.style.transform = '';
        img.style.opacity = '1';
      };
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGallery);
  } else {
    loadGallery();
  }
})();