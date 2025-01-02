export default async function handler(req, res) {
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: 'Token inválido' });
  // }

  try {
    // Revalida la página específica
    await res.revalidate('/entries');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidando', error: err });
  }
}