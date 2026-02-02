// Local storage for scan history - all data stays on device for privacy

export interface ScanHistoryItem {
  id: string;
  type: "Text" | "URL" | "Email" | "Phone";
  content: string;
  fullContent: string;
  origin: string;
  risk: number;
  date: string; // human-readable date (YYYY-MM-DD)
  createdAt: number; // timestamp for filtering
  result: "High Risk" | "Medium Risk" | "Low Risk" | "Safe";
  threatType: string;
}

const STORAGE_KEY = "scam_detective_scan_history";

// Get all scan history from local storage
export function getScanHistory(): ScanHistoryItem[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed: ScanHistoryItem[] = JSON.parse(stored);

    // Backfill createdAt for older records
    return parsed.map((item) => {
      if (item.createdAt) return item;
      const parsedDate = Date.parse(item.date);
      return {
        ...item,
        createdAt: Number.isNaN(parsedDate) ? Date.now() : parsedDate,
      };
    });
  } catch (error) {
    console.error("Failed to load scan history:", error);
    return [];
  }
}

// Storage limits
const MAX_SCANS = 1000;
const MAX_STORAGE_BYTES = 5 * 1024 * 1024; // 5 MB

// Calculate approximate size of JSON string in bytes
function getStorageSize(data: string): number {
  return new Blob([data]).size;
}

// Add new scan to history
export function addScanToHistory(scan: Omit<ScanHistoryItem, "id" | "date" | "createdAt">): void {
  if (typeof window === "undefined") return;
  
  try {
    const history = getScanHistory();
    const newScan: ScanHistoryItem = {
      ...scan,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      createdAt: Date.now(),
    };
    
    // Add to beginning of array (newest first)
    let updated = [newScan, ...history];
    
    // Apply limits: max 1,000 scans OR 5 MB storage, whichever is hit first
    // First trim by count
    if (updated.length > MAX_SCANS) {
      updated = updated.slice(0, MAX_SCANS);
    }
    
    // Then check size and trim oldest items if needed
    let jsonData = JSON.stringify(updated);
    while (getStorageSize(jsonData) > MAX_STORAGE_BYTES && updated.length > 1) {
      updated.pop(); // Remove oldest
      jsonData = JSON.stringify(updated);
    }
    
    localStorage.setItem(STORAGE_KEY, jsonData);
    
    // Dispatch custom event so other components can update
    window.dispatchEvent(new CustomEvent("scanHistoryUpdated"));
  } catch (error) {
    console.error("Failed to save scan to history:", error);
  }
}

// Clear all history
export function clearScanHistory(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("scanHistoryUpdated"));
  } catch (error) {
    console.error("Failed to clear scan history:", error);
  }
}

// Helper to determine result category from probability
export function getRiskResult(probability: number): ScanHistoryItem["result"] {
  if (probability >= 0.7) return "High Risk";
  if (probability >= 0.4) return "Medium Risk";
  if (probability >= 0.2) return "Low Risk";
  return "Safe";
}

// Helper to determine threat type from content and probability
export function getThreatType(content: string, probability: number): string {
  if (probability < 0.2) return "None";
  
  const lower = content.toLowerCase();
  
  // Check for phishing indicators
  if (lower.includes("verify") || lower.includes("account") || lower.includes("suspended") || 
      lower.includes("click here") || lower.includes("urgent") || lower.includes("password")) {
    return "Phishing";
  }
  
  // Check for lottery/prize scams
  if (lower.includes("winner") || lower.includes("prize") || lower.includes("congratulations") ||
      lower.includes("claim") || lower.includes("lottery")) {
    return "Spam";
  }
  
  // Check for financial scams
  if (lower.includes("money") || lower.includes("bitcoin") || lower.includes("investment") ||
      lower.includes("bank")) {
    return "Financial Scam";
  }
  
  return probability >= 0.7 ? "Phishing" : "Spam";
}
