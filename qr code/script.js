const inputText = document.getElementById('inputText');
const generateBtn = document.getElementById('generateBtn');
const qrCodeContainer = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');
const body = document.body;
const logoContainer = document.getElementById('logoContainer');
const platformLogo = document.getElementById('platformLogo');


const qrCodeLinks = {
    facebook: "https://www.facebook.com/",
    whatsapp: "https://www.whatsapp.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    google: "https://www.google.com/",
    github: "https://www.github.com/",
  };
  

// Function to update the background color and logo
function updateBackgroundColorAndLogo(text) {
  const lowercaseText = text.toLowerCase();

  if (lowercaseText.includes('facebook')) {
    body.style.background = 'linear-gradient(145deg, #0000FF, #FFFFFF)';
    platformLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'; // Facebook Logo
  } else if (lowercaseText.includes('instagram')) {
    body.style.background = 'linear-gradient(45deg, #f58529, #dd2a7b, #8134af)';
    platformLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png'; // Instagram Logo
  } else if (lowercaseText.includes('github')) {
    body.style.background = 'linear-gradient(55deg, #000000 , #C0C0C0 )';
    platformLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg'; // GitHub Logo
  } else if (lowercaseText.includes('google')) {
    body.style.background =
      'linear-gradient(45deg, #FF0000 , #FFC300, rgb(2, 183, 2), #0000FF, rgb(97, 202, 244))';
    platformLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'; // Google Logo
  } else if (lowercaseText.includes('youtube')) {
    body.style.background = 'linear-gradient(45deg, #FFFFFF,  #FF0000)';
    platformLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg'; // YouTube Logo
  } else if (lowercaseText.includes('linkedin')) {
    body.style.background = 'linear-gradient(50deg, #FFFFFF,  #0000FF)';
    platformLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'; // LinkedIn Logo
  } else if (lowercaseText.includes('whatsapp')) {
    body.style.background = 'linear-gradient(45deg, rgb(2, 183, 2), rgb(190, 244, 145))';
    platformLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'; // WhatsApp Logo
  } else {
    body.style.background = 'linear-gradient(135deg, #74ebd5, #9face6)';
    platformLogo.src = ''; // Clear the logo for unknown inputs
  }

  // Show or hide the logo
  if (platformLogo.src) {
    logoContainer.classList.remove('hidden');
  } else {
    logoContainer.classList.add('hidden');
  }
}

// Event listener for the Generate button
generateBtn.addEventListener('click', () => {
  const text = inputText.value.trim().toLowerCase();

  let qrText = text; // Default is the input text
  if (qrCodeLinks[text]) {
    qrText = qrCodeLinks[text]; // Use predefined URL if available
  }

  if (!text) {
    alert('Please enter some text or URL!');
    return;
  }

  // Update the background color and logo based on the input
  updateBackgroundColorAndLogo(text);

  // Clear any previous QR code
  qrCodeContainer.innerHTML = '';
  downloadBtn.classList.add('hidden');

  // Generate new QR code
  const qrCode = new QRCode(qrCodeContainer, {
    text: text,
    width: 256,
    height: 256,
    colorDark: '#000000',
    colorLight: '#ffffff',
  });

  // Wait for the QR code to be generated
  setTimeout(() => {
    const img = qrCodeContainer.querySelector('img');
    if (img) {
      downloadBtn.href = img.src;
      downloadBtn.classList.remove('hidden');
    }
  }, 300);
});
