const ENCRYPTION_KEY_STORAGE = "scam_detective_encryption_key";

type EncryptedPayload = {
  iv: string;
  ciphertext: string;
};

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function getOrCreateKey(): Promise<CryptoKey> {
  if (typeof window === "undefined" || !window.crypto?.subtle) {
    throw new Error("Web Crypto API is not available");
  }

  const stored = localStorage.getItem(ENCRYPTION_KEY_STORAGE);
  if (stored) {
    const rawKey = base64ToArrayBuffer(stored);
    return window.crypto.subtle.importKey(
      "raw",
      rawKey,
      { name: "AES-GCM" },
      true,
      ["encrypt", "decrypt"]
    );
  }

  const key = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  const exported = await window.crypto.subtle.exportKey("raw", key);
  localStorage.setItem(ENCRYPTION_KEY_STORAGE, arrayBufferToBase64(exported));
  return key;
}

export async function encryptText(plainText: string): Promise<EncryptedPayload> {
  const key = await getOrCreateKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plainText);
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  return {
    iv: arrayBufferToBase64(iv.buffer),
    ciphertext: arrayBufferToBase64(ciphertext),
  };
}

export async function decryptText(payload: EncryptedPayload): Promise<string> {
  const key = await getOrCreateKey();
  const iv = new Uint8Array(base64ToArrayBuffer(payload.iv));
  const ciphertext = base64ToArrayBuffer(payload.ciphertext);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}

export async function decryptPayload(payloadString: string): Promise<string | null> {
  try {
    const payload = JSON.parse(payloadString) as EncryptedPayload;
    if (!payload?.iv || !payload?.ciphertext) return null;
    return await decryptText(payload);
  } catch (error) {
    console.warn("Failed to decrypt payload", error);
    return null;
  }
}
