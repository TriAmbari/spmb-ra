/* =========================================================
   SPMB RA DARURRAHMAN
   custom.js
   Modern Islamic • Child Friendly • Lightweight
   ========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initSmoothScroll();
    initMobileNavigation();
    initBackToTop();
    initCountdown();
    initRegistrationButtons();
    initScrollAnimation();
    initLazyLoading();
    initExternalLinks();
    initCurrentYear();
    initImageFallback();
    initMapOptimization();

});


/* =========================================================
   02. SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {

    const links = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId) return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const offset = 15;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            closeMobileMenu();

        });

    });

}


/* =========================================================
   03. MOBILE NAVIGATION
   ========================================================= */

function initMobileNavigation() {

    const navItems = document.querySelectorAll(
        ".mobile-nav__item"
    );

    if (!navItems.length) return;

    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            navItems.forEach(function (nav) {
                nav.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    /*
     * Update menu aktif berdasarkan posisi section
     */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    if (!sections.length) return;

    window.addEventListener(
        "scroll",
        throttle(function () {

            let currentSection = "";

            const scrollPosition =
                window.scrollY + 180;

            sections.forEach(function (section) {

                const sectionTop =
                    section.offsetTop;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition <
                    sectionTop + sectionHeight
                ) {
                    currentSection =
                        section.getAttribute("id");
                }

            });

            navItems.forEach(function (item) {

                const href =
                    item.getAttribute("href");

                if (
                    href &&
                    href === "#" + currentSection
                ) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }

            });

        }, 100)
    );

}


/* =========================================================
   04. CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    const navItems =
        document.querySelectorAll(
            ".mobile-nav__item"
        );

    /*
     * Tidak menggunakan menu hamburger.
     * Fungsi dibuat sebagai pengaman apabila
     * HTML dikembangkan nantinya.
     */

    navItems.forEach(function (item) {

        if (
            item.classList.contains("menu-close")
        ) {
            item.classList.remove("open");
        }

    });

}


/* =========================================================
   05. BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button =
        document.querySelector(
            ".back-to-top"
        );

    if (!button) return;

    function updateBackToTop() {

        if (window.scrollY > 450) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }

    updateBackToTop();

    window.addEventListener(
        "scroll",
        throttle(updateBackToTop, 100)
    );

    button.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   COUNTDOWN SPMB
   ========================================================= */

function initCountdown() {

    const countdown = document.querySelector(".countdown");

    if (!countdown) return;

    /*
     * Prioritas:
     * 1. data-target pada HTML
     * 2. tanggal default
     */

    let targetString = countdown.dataset.target;

    /*
     * Jika HTML belum memiliki data-target,
     * gunakan tanggal default.
     *
     * SILAKAN GANTI tanggal ini sesuai
     * jadwal penutupan SPMB RA.
     */

    if (!targetString) {
        targetString = "2027-01-01T23:59:59+07:00";
    }

    const targetDate = new Date(targetString);

    /*
     * Pastikan tanggal valid
     */

    if (isNaN(targetDate.getTime())) {
        console.warn(
            "Tanggal countdown tidak valid:",
            targetString
        );

        return;
    }


    const daysEl =
        countdown.querySelector("[data-days]");

    const hoursEl =
        countdown.querySelector("[data-hours]");

    const minutesEl =
        countdown.querySelector("[data-minutes]");

    const secondsEl =
        countdown.querySelector("[data-seconds]");


    /*
     * Jika struktur HTML tidak cocok,
     * jangan membuat error.
     */

    if (
        !daysEl ||
        !hoursEl ||
        !minutesEl ||
        !secondsEl
    ) {

        console.warn(
            "Elemen countdown tidak lengkap."
        );

        return;
    }


    function updateCountdown() {

        const now = Date.now();

        const distance =
            targetDate.getTime() - now;


        /*
         * Jika waktu sudah habis
         */

        if (distance <= 0) {

            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";

            countdown.classList.add(
                "countdown-finished"
            );

            const finishedMessage =
                document.querySelector(
                    ".countdown-finished-message"
                );

            if (finishedMessage) {
                finishedMessage.textContent =
                    "Pendaftaran telah mencapai batas waktu.";
            }

            return;
        }


        /*
         * Perhitungan waktu
         */

        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        /*
         * Tampilkan angka
         */

        daysEl.textContent =
            String(days).padStart(2, "0");

        hoursEl.textContent =
            String(hours).padStart(2, "0");

        minutesEl.textContent =
            String(minutes).padStart(2, "0");

        secondsEl.textContent =
            String(seconds).padStart(2, "0");

    }


    /*
     * Jalankan langsung
     */

    updateCountdown();


    /*
     * Update setiap detik
     */

    const countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );


    /*
     * Simpan interval agar bisa dihentikan
     * jika halaman tidak aktif.
     */

    countdown.dataset.interval =
        countdownInterval;

}


/* =========================================================
   07. COUNTDOWN HELPER
   ========================================================= */

function setCountdownValue(
    element,
    value
) {

    if (!element) return;

    element.textContent =
        String(value).padStart(2, "0");

}


/* =========================================================
   08. REGISTRATION BUTTON
   ========================================================= */

function initRegistrationButtons() {

    const buttons =
        document.querySelectorAll(
            'a[href*="form"], ' +
            'a[href*="docs.google"], ' +
            'a[href*="forms.gle"], ' +
            ".registration-button"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                /*
                 * Efek visual ringan
                 */

                this.classList.add(
                    "button-clicked"
                );

                setTimeout(
                    () => {
                        this.classList.remove(
                            "button-clicked"
                        );
                    },
                    350
                );

            }
        );

    });

}


/* =========================================================
   09. SCROLL ANIMATION
   ========================================================= */

function initScrollAnimation() {

    /*
     * Jangan aktifkan animasi jika user
     * memilih reduced motion.
     */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    const elements =
        document.querySelectorAll(
            ".info-card, " +
            ".social-card, " +
            ".quote-card, " +
            ".registration-card, " +
            ".image-card, " +
            ".location-card"
        );


    if (!elements.length) return;


    /*
     * Fallback untuk browser yang tidak
     * mendukung IntersectionObserver.
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(function (element) {

            element.classList.add(
                "is-visible"
            );

        });

        return;

    }


    elements.forEach(function (element) {

        element.classList.add(
            "scroll-reveal"
        );

    });


    const observer =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach(function (element) {

        observer.observe(element);

    });

}


/* =========================================================
   10. LAZY LOADING
   ========================================================= */

function initLazyLoading() {

    const images =
        document.querySelectorAll(
            "img[data-src]"
        );

    if (!images.length) return;


    /*
     * Browser modern
     */

    if (
        "loading" in HTMLImageElement.prototype
    ) {

        images.forEach(function (img) {

            const source =
                img.getAttribute(
                    "data-src"
                );

            if (!source) return;

            img.src = source;

            img.removeAttribute(
                "data-src"
            );

            img.setAttribute(
                "loading",
                "lazy"
            );

        });

        return;

    }


    /*
     * Fallback IntersectionObserver
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        images.forEach(function (img) {

            const source =
                img.getAttribute(
                    "data-src"
                );

            if (!source) return;

            img.src = source;

        });

        return;

    }


    const imageObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const img =
                            entry.target;

                        const source =
                            img.getAttribute(
                                "data-src"
                            );

                        if (source) {

                            img.src = source;

                            img.removeAttribute(
                                "data-src"
                            );

                        }

                        observer.unobserve(
                            img
                        );

                    }
                );

            },
            {
                rootMargin:
                    "150px 0px"
            }
        );


    images.forEach(function (img) {

        imageObserver.observe(img);

    });

}


/* =========================================================
   11. IMAGE FALLBACK
   ========================================================= */

function initImageFallback() {

    const images =
        document.querySelectorAll(
            "img"
        );

    images.forEach(function (img) {

        img.addEventListener(
            "error",
            function () {

                /*
                 * Jangan menjalankan fallback
                 * berulang kali.
                 */

                if (
                    this.dataset.fallback
                ) {
                    return;
                }

                this.dataset.fallback =
                    "true";

                /*
                 * Jika gambar logo/foto tidak
                 * ditemukan, tampilkan area
                 * kosong yang tetap rapi.
                 */

                this.style.objectFit =
                    "contain";

                this.style.opacity =
                    "0.55";

            }
        );

    });

}


/* =========================================================
   12. EXTERNAL LINKS
   ========================================================= */

function initExternalLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="http"]'
        );

    links.forEach(function (link) {

        /*
         * Link ke domain berbeda dibuka
         * pada tab baru.
         */

        try {

            const url =
                new URL(
                    link.href,
                    window.location.href
                );

            if (
                url.hostname !==
                window.location.hostname
            ) {

                link.target = "_blank";

                link.rel =
                    "noopener noreferrer";

            }

        } catch (error) {

            /*
             * Abaikan URL yang tidak valid.
             */

        }

    });

}


/* =========================================================
   13. CURRENT YEAR
   ========================================================= */

function initCurrentYear() {

    const elements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    if (!elements.length) return;

    const year =
        new Date().getFullYear();

    elements.forEach(function (element) {

        element.textContent =
            year;

    });

}


/* =========================================================
   14. GOOGLE MAP OPTIMIZATION
   ========================================================= */

function initMapOptimization() {

    const maps =
        document.querySelectorAll(
            ".map-wrapper iframe"
        );

    if (!maps.length) return;

    maps.forEach(function (map) {

        map.setAttribute(
            "loading",
            "lazy"
        );

        map.setAttribute(
            "referrerpolicy",
            "no-referrer-when-downgrade"
        );

    });

}


/* =========================================================
   15. THROTTLE
   ========================================================= */

function throttle(
    callback,
    delay
) {

    let lastCall = 0;

    return function () {

        const now =
            Date.now();

        if (
            now - lastCall >=
            delay
        ) {

            lastCall = now;

            callback.apply(
                this,
                arguments
            );

        }

    };

}


/* =========================================================
   16. DYNAMIC STYLE
   ========================================================= */

(function addDynamicStyles() {

    const style =
        document.createElement(
            "style"
        );

    style.textContent = `

        /* ---------------------------------
           Scroll Reveal
           --------------------------------- */

        .scroll-reveal {

            opacity: 0;

            transform:
                translateY(25px);

            transition:
                opacity .6s ease,
                transform .6s
                cubic-bezier(
                    .22,
                    1,
                    .36,
                    1
                );

        }


        .scroll-reveal.is-visible {

            opacity: 1;

            transform:
                translateY(0);

        }


        /* ---------------------------------
           Button Click
           --------------------------------- */

        .button-clicked {

            transform:
                scale(.97) !important;

        }


        /* ---------------------------------
           Countdown Finished
           --------------------------------- */

        .countdown-finished
        .countdown__item {

            opacity: .85;

        }


        /* ---------------------------------
           Prevent horizontal overflow
           --------------------------------- */

        html,
        body {

            max-width: 100%;

            overflow-x: hidden;

        }

    `;

    document.head.appendChild(
        style
    );

})();


/* =========================================================
   17. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        /*
         * Tidak melakukan pekerjaan berat
         * ketika tab sedang tidak aktif.
         */

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);


/* =========================================================
   18. PREVENT DOUBLE CLICK
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".btn--xl, " +
                ".registration-button"
            );

        if (!button) return;

        /*
         * Jangan memblokir link.
         * Hanya memberikan feedback visual.
         */

        button.classList.add(
            "button-clicked"
        );

        window.setTimeout(
            function () {

                button.classList.remove(
                    "button-clicked"
                );

            },
            300
        );

    }
);


/* =========================================================
   19. ONLINE / OFFLINE STATUS
   ========================================================= */

window.addEventListener(
    "offline",
    function () {

        document.body.classList.add(
            "is-offline"
        );

    }
);


window.addEventListener(
    "online",
    function () {

        document.body.classList.remove(
            "is-offline"
        );

    }
);


/* =========================================================
   20. FINAL INITIALIZATION
   ========================================================= */

window.addEventListener(
    "load",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
