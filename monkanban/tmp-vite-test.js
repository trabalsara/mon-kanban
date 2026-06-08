const urls = ['http://localhost:5173/src/App.jsx'];
for (const url of urls) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log('URL:', url);
    console.log('Status:', res.status);
    console.log('Contains Sara TRABAL:', text.includes('Sara TRABAL'));
    console.log('Contains Déploiement automatique opérationnel:', text.includes('Déploiement automatique opérationnel'));
    const idx = text.indexOf('Sara TRABAL');
    console.log('Index Sara:', idx);
    if (idx >= 0) {
      console.log(text.slice(Math.max(0, idx - 100), idx + 200).replace(/\n/g, ' '));
    }
    console.log('First 400 chars:', text.slice(0, 400).replace(/\n/g, ' '));
  } catch (err) {
    console.error('ERR', url, err.message);
  }
}
