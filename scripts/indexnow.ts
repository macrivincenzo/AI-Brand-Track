/**
 * Notify Bing, Yandex and other IndexNow engines about every URL in the live sitemap.
 * Run after publishing new or updated pages: `npx tsx scripts/indexnow.ts`
 * The key is public by design; it must match public/<key>.txt.
 */
const SITE = 'https://www.aibrandtrack.com';
const KEY = 'ecdf00ed26926c8511a56724c9c8a86f';

async function main() {
  const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  console.log(`IndexNow: submitted ${urls.length} URLs → HTTP ${res.status}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
