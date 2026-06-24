const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export async function renderMemeVideo(text: string): Promise<Blob> {
  const res = await fetch(`${API_URL}/render`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error(`render failed: ${res.status}`);
  }

  return res.blob();
}
