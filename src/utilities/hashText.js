async function hashText(text) {
  // Encode the text as a UTF-8 byte array
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // Hash the text using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export default hashText;
