// --- JAVASCRIPT LOGIC ---

// 1. Parse the URL to get the "to" parameter
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const toValue = params.get('to');
    
    if (toValue) {
        // Decode the URL encoding (e.g., %20 becomes space)
        const guestName = decodeURIComponent(toValue);
        document.getElementById('to-name').innerText = guestName;
    }
};

// 2. Handle Opening the Invitation
function openInvitation() {
    const cover = document.getElementById('cover');
    const content = document.getElementById('invitation-content');
    const audio = document.getElementById('bg-music');

    // Slide up the cover
    cover.classList.add('slide-up');
    
    // Wait a bit, then show content
    setTimeout(() => {
        cover.style.display = 'none';
        content.style.display = 'block';
        
        // Small delay to allow display:block to apply before changing opacity for fade-in
        setTimeout(() => {
            content.style.opacity = '1';
            
            // Try to play music (Note: Browsers require user interaction first, which clicking "Open" provides)
            audio.play().then(() => {
                console.log("Music started");
            }).catch(error => {
                console.log("Autoplay blocked, user must interact first");
            });
        }, 100);
    }, 500); // Wait for slide animation
}

// 3. Music Toggle Logic
const musicBtn = document.getElementById('musicToggle');
const audio = document.getElementById('bg-music');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicBtn.innerText = "🎵";
    } else {
        // Only works if invitation is opened usually, or user clicked once
        audio.play();
        musicBtn.innerText = "⏸";
    }
    isPlaying = !isPlaying;
}

const reveals = document.querySelectorAll(".verse, .man-photo, .woman-photo, .karo-header, .detail-card, .location-title, .map-container, .btn-map, .karo-footer, .card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.2
  });

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });