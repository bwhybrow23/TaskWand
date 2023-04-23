/**
 * 
 * Dark Mode
 * 
 */
//Wait for page to load fully 
document.addEventListener("DOMContentLoaded", function() {

  // Find the sunMoonIcon element
  const sunMoonIcon = document.getElementById("sunMoonIcon");

  // Set the initial icon based on the current color scheme
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    sunMoonIcon.src = "../../assets/img/moon.svg";
    sunMoonIcon.alt = "Moon";
    sunMoonIcon.classList.add("moon");
    document.body.classList.add('dark-mode');
  } else {
    sunMoonIcon.src = "../../assets/img/sun.svg";
    sunMoonIcon.alt = "Sun";
    sunMoonIcon.class = "sun";
    sunMoonIcon.classList.add("sun");
  }

  // Add event listener to toggle dark mode
  const darkModeButton = document.querySelector(".darkModeButton");
  if (darkModeButton) {
    darkModeButton.addEventListener("click", function() {
      const body = document.body;
      const isDark = body.classList.contains('dark-mode');

      if (isDark) {
        body.classList.remove('dark-mode');
        sunMoonIcon.src = "../../assets/img/sun.svg";
        sunMoonIcon.alt = "Sun";
        sunMoonIcon.class = "sun";
        sunMoonIcon.classList.add("sun");
        sunMoonIcon.classList.remove("moon");
      } else {
        body.classList.add('dark-mode');
        sunMoonIcon.src = "../../assets/img/moon.svg";
        sunMoonIcon.alt = "Moon";
        sunMoonIcon.class = "moon";
        sunMoonIcon.classList.add("moon");
        sunMoonIcon.classList.remove("sun");
      }
    });
  };
});
