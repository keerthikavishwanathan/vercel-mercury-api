const Mercury = require('@postlight/mercury-parser');
module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const result = await Mercury.parse(url);
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to parse article', details: err.message });
  }
};