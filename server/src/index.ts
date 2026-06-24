import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { renderMemeVideo } from './render';

const app = new Hono();

app.use('/*', cors());

app.post('/render', async (c) => {
  const body = await c.req.json<{ text?: string }>().catch(() => null);
  const text = body?.text?.trim();

  if (!text) {
    return c.json({ error: 'text is required' }, 400);
  }

  try {
    const video = await renderMemeVideo(text);
    return new Response(video, {
      headers: { 'Content-Type': 'video/mp4' },
    });
  } catch (err) {
    console.error(err);
    return c.json({ error: 'render failed' }, 500);
  }
});

const port = Number(process.env.PORT) || 8787;

export default {
  port,
  fetch: app.fetch,
};
