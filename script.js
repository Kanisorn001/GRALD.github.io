// Mobile nav toggle + footer year
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const year = document.querySelector("#year");

if (year) year.textContent = new Date().getFullYear();

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // close menu after clicking a link (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// PDF.js setup and rendering
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  // Function to render PDF
  async function renderPDF(pdfUrl, canvasId) {
    try {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(1);
      
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      
      const context = canvas.getContext('2d');
      
      const viewport = page.getViewport({ scale: 2 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  // Render both PDFs when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        renderPDF('assets/GRALD.pdf', 'posterCanvas');
        renderPDF('assets/MathCert01651.pdf', 'certCanvas');
      }, 500);
    });
  } else {
    setTimeout(() => {
      renderPDF('assets/GRALD.pdf', 'posterCanvas');
      renderPDF('assets/MathCert01651.pdf', 'certCanvas');
    }, 500);
  }
}