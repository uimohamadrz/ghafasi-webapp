import { toBlob } from 'html-to-image';

export type ShareOutcome = 'shared' | 'copied' | 'downloaded' | 'failed';

interface ShareOptions {
  filename: string;
  title: string;
  text: string;
}

/** Swaps any <video> inside the node for a still frame so html-to-image can capture it. */
function freezeVideos(node: HTMLElement): () => void {
  const videos = Array.from(node.querySelectorAll('video'));
  const restores: Array<() => void> = [];

  for (const video of videos) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || video.clientWidth || 1;
    canvas.height = video.videoHeight || video.clientHeight || 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch {
        // cross-origin or not-yet-decoded frame; leave canvas blank
      }
    }
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.className = video.className;
    img.setAttribute('style', video.getAttribute('style') || '');
    video.insertAdjacentElement('afterend', img);
    const prevDisplay = video.style.display;
    video.style.display = 'none';
    restores.push(() => {
      video.style.display = prevDisplay;
      img.remove();
    });
  }

  return () => restores.forEach((restore) => restore());
}

export async function shareCardImage(node: HTMLElement, opts: ShareOptions): Promise<ShareOutcome> {
  const unfreeze = freezeVideos(node);
  let blob: Blob | null = null;
  try {
    blob = await toBlob(node, { pixelRatio: 2 });
  } catch {
    blob = null;
  } finally {
    unfreeze();
  }
  if (!blob) return 'failed';

  const file = new File([blob], opts.filename, { type: 'image/png' });

  const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean };
  if (nav.canShare?.({ files: [file] }) && navigator.share) {
    try {
      await navigator.share({ files: [file], title: opts.title, text: opts.text });
      return 'shared';
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return 'failed';
    }
  }

  if (navigator.clipboard && 'write' in navigator.clipboard && typeof ClipboardItem !== 'undefined') {
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      return 'copied';
    } catch {
      // fall through to download
    }
  }

  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = opts.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    return 'downloaded';
  } catch {
    return 'failed';
  }
}
