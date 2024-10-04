document.getElementById("phishingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const urlInput = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");
  const statusMessage = document.getElementById("statusMessage");

  if (urlInput) {
    const isPhishing = checkPhishingURL(urlInput);

    if (isPhishing) {
      statusMessage.innerText = "⚠️ Warning! This website may be a phishing site.";
      statusMessage.classList.add("text-red-600");
    } else {
      statusMessage.innerText = "✅ This website appears to be safe.";
      statusMessage.classList.add("text-green-600");
    }

    resultDiv.classList.remove("hidden");
  }
});

function checkPhishingURL(url) {
  const phishingKeywords = ["login", "update", "secure", "verify", "account", "bank"];
  const suspiciousExtensions = [".zip", ".exe", ".bat"];
  const suspiciousDomains = ["xyz", "ru", "cn"];

  // Basic heuristic for phishing detection
  const lowerUrl = url.toLowerCase();

  // Check if URL contains phishing-related keywords
  const hasPhishingKeyword = phishingKeywords.some((keyword) => lowerUrl.includes(keyword));
  
  // Check if URL has suspicious file extensions
  const hasSuspiciousExtension = suspiciousExtensions.some((ext) => lowerUrl.endsWith(ext));

  // Check if URL domain is from suspicious regions
  const hasSuspiciousDomain = suspiciousDomains.some((domain) => lowerUrl.includes(`.${domain}`));

  return hasPhishingKeyword || hasSuspiciousExtension || hasSuspiciousDomain;
}
