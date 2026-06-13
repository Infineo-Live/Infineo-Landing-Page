export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const country = req.headers['x-vercel-ip-country'] || null;
  res.status(200).json({ country });
}
