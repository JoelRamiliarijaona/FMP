const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function getStrapiData(path: string) {
  try {
    const url = `${baseUrl}/api${path}`;
    console.log("🔍 [STRAPI] Fetching URL:", url);
    
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });
    
    console.log("📡 [STRAPI] Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ [STRAPI] Error response:", errorText);
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("📦 [STRAPI] Raw data received:", JSON.stringify(data, null, 2));
    console.log("📦 [STRAPI] Data structure:", {
      hasData: !!data,
      hasDataData: !!(data && data.data),
      keys: data ? Object.keys(data) : [],
    });
    
    return data;
  } catch (error) {
    console.error("❌ [STRAPI] Fetch error:", error);
    throw error;
  }
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  console.log("Getting media from Strapi:", `${baseUrl}${url}`);
  return `${baseUrl}${url}`;
}
