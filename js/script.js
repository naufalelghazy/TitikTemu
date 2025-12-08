document.addEventListener("DOMContentLoaded", () => {
  // =============================================
  // TOGGLE MENU MOBILE (HAMBURGER)
  // =============================================
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("active");
      // Ganti ikon antara hamburger (bars) dan silang (times)
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });

    // Tutup menu saat klik di luar area menu
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove("active");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }
      }
    });

    // Tutup menu saat klik salah satu link navigasi
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }
      });
    });
  }

  // =============================================
  // SMOOTH SCROLL UNTUK ANCHOR LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
        // Tutup menu mobile jika sedang terbuka
        if (window.innerWidth <= 768) {
          navLinks.style.display = "none";
        }
      }
    });
  });

  // =============================================
  // FILTER KATEGORI MENU
  // =============================================
  const catBtns = document.querySelectorAll('.cat-btn');
  const menuItems = document.querySelectorAll('.menu-card');

  if (catBtns.length > 0) {
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Hapus class active dari semua tombol
        catBtns.forEach(b => b.classList.remove('active'));
        // Tambahkan class active ke tombol yang diklik
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        menuItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            // Tambahkan animasi fade in
            item.style.animation = 'fadeIn 0.5s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // =============================================
  // LOGIKA FORM RESERVASI/BOOKING
  // =============================================
  const bookingForm = document.querySelector('.reservation-form form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
      const people = document.getElementById('people').value;

      if (name && date) {
        alert(`Terima kasih ${name}! Reservasi Anda untuk ${people} orang pada tanggal ${new Date(date).toLocaleString()} telah kami terima. Kami akan menghubungi Anda segera.`);
        bookingForm.reset();
      } else {
        alert('Mohon lengkapi data reservasi Anda.');
      }
    });
  }

  // =============================================
  // ANIMASI SCROLL (FADE IN SAAT ELEMEN TERLIHAT)
  // =============================================
  const observerOptions = {
    threshold: 0.1 // Trigger saat 10% elemen terlihat
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // =============================================
  // LOGIKA FORM NEWSLETTER
  // =============================================
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input').value;
      if (email) {
        alert('Terima kasih telah berlangganan! Info promo terbaru akan dikirim ke ' + email);
        newsletterForm.reset();
      }
    });
  }

  // =============================================
  // TOMBOL KEMBALI KE ATAS (BACK TO TOP)
  // =============================================
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    // Tampilkan tombol saat scroll lebih dari 300px
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    // Scroll ke atas saat tombol diklik
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // =============================================
  // SLIDER TESTIMONIAL
  // =============================================
  const sliderTrack = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testi-card');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (sliderTrack && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Buat dot indicator untuk setiap slide
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Fungsi update dot yang aktif
    function updateDots() {
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Fungsi pindah ke slide tertentu
    function goToSlide(index) {
      if (index < 0) {
        currentSlide = totalSlides - 1; // Kembali ke slide terakhir
      } else if (index >= totalSlides) {
        currentSlide = 0; // Kembali ke slide pertama
      } else {
        currentSlide = index;
      }
      
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      updateDots();
    }

    // Fungsi slide berikutnya
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    // Fungsi slide sebelumnya
    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    // Event listener untuk tombol prev/next
    if (prevBtn && nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
      });

      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
      });
    }

    // Fungsi auto-slide setiap 5 detik
    function startInterval() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    // Reset interval saat user berinteraksi
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }

    // Inisialisasi slider
    startInterval();
  }
});


// =============================================
// FUNGSI TAMBAHAN: SCROLL INDICATOR
// =============================================

// Tampilkan tombol saat user scroll 20px dari atas
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Scroll ke atas saat tombol diklik
function topFunction() {
  document.body.scrollTop = 0; // Untuk Safari
  document.documentElement.scrollTop = 0; // Untuk Chrome, Firefox, IE dan Opera
}
