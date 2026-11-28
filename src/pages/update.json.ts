import type { APIRoute } from 'astro';
import { release } from '../lib/site';

// Static public update manifest. Keep this in step with the latest published
// stable GitHub Release; the Windows client reads tag_name and body.
export const GET: APIRoute = () => new Response(JSON.stringify({
  tag_name: `v${release.version}`,
  body: release.notes,
  download_url: release.download,
}) + '\n', {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});
