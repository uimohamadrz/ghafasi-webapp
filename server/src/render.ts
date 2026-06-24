import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE_DIR = new URL('..', import.meta.url).pathname;
const FONT_PATH = join(BASE_DIR, 'fonts', 'IRANSans(FaNum)_Bold.ttf');
const SOURCE_VIDEO = join(BASE_DIR, 'assets', 'kham.mp4');

export async function renderMemeVideo(text: string): Promise<Uint8Array> {
  const workDir = await mkdtemp(join(tmpdir(), 'kham-render-'));
  const textFile = join(workDir, 'caption.txt');
  const outputFile = join(workDir, 'output.mp4');

  try {
    // drawtext's textfile= option sidesteps all filtergraph escaping
    // concerns for free-form user input (colons, quotes, commas, etc).
    await writeFile(textFile, text, 'utf-8');

    const ffmpegCmd = [
      'ffmpeg', '-y',
      '-i', SOURCE_VIDEO,
      '-vf', (
        `fps=30,` +
        `drawtext=textfile=${textFile}:fontfile=${FONT_PATH}:fontcolor=white:` +
        `fontsize=60:x=(w-text_w)/2:y=h-80:borderw=6:bordercolor=black`
      ),
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
      '-preset', 'fast', '-crf', '23', '-an',
      '-movflags', '+faststart',
      outputFile,
    ];

    const proc = Bun.spawn(ffmpegCmd, { stdout: 'pipe', stderr: 'pipe' });
    const exitCode = await proc.exited;
    if (exitCode !== 0) {
      const stderr = await new Response(proc.stderr).text();
      throw new Error(`ffmpeg exited with code ${exitCode}: ${stderr}`);
    }

    return await readFile(outputFile);
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}
