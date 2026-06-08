import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';

export default function ProfilePage({ session }) {
	const user = session?.user || {};

	const [fullName, setFullName] = useState(user.user_metadata?.full_name || '');
	const [infoMsg, setInfoMsg] = useState('');
	const [infoErr, setInfoErr] = useState('');

	const [newPass, setNewPass] = useState('');
	const [passMsg, setPassMsg] = useState('');
	const [passErr, setPassErr] = useState('');

	const [avatarUrl, setAvatarUrl] = useState(user.user_metadata?.avatar_url || '');
	const [uploading, setUploading] = useState(false);

	async function handleSaveInfo(e) {
		e.preventDefault();
		setInfoErr(''); setInfoMsg('');
		const { error } = await supabase.auth.updateUser({ data: { full_name: fullName } });
		if (error) setInfoErr(error.message);
		else setInfoMsg('Profil mis à jour !');
	}

	async function handleChangePassword(e) {
		e.preventDefault();
		setPassErr(''); setPassMsg('');
		const { error } = await supabase.auth.updateUser({ password: newPass });
		if (error) setPassErr(error.message);
		else { setPassMsg('Mot de passe mis à jour avec succès !'); setNewPass(''); }
	}

	async function handleUploadAvatar(e) {
		try {
			setUploading(true);
			if (!e.target.files || e.target.files.length === 0) throw new Error('Vous devez sélectionner une image.');
			const file = e.target.files[0];
			const fileExt = file.name.split('.').pop();
			const fileName = `${user.id}-${Math.random()}.${fileExt}`;
			const filePath = `${fileName}`;

			const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
			if (uploadError) throw uploadError;

			const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
			const publicUrl = data.publicUrl;

			const { error: updateError } = await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });
			if (updateError) throw updateError;

			setAvatarUrl(publicUrl);
			alert('Avatar mis à jour !');
		} catch (error) {
			alert(error.message);
		} finally {
			setUploading(false);
		}
	}

	return (
		<div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
			<Navbar session={session} />
			<main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
				<h2>Mon Profil</h2>

				<section style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
					<h3>Photo de profil</h3>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
						<img src={avatarUrl || 'https://via.placeholder.com/150'} alt="Avatar" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #1A8C82' }} />
						<input type="file" accept="image/*" onChange={handleUploadAvatar} disabled={uploading} />
						{uploading && <p>Téléchargement...</p>}
					</div>
				</section>

				<section style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
					<h3>Informations personnelles</h3>
					<form onSubmit={handleSaveInfo} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<div>
							<label style={{ display: 'block', marginBottom: '0.5rem' }}>Nom complet</label>
							<input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CBD5E1' }} />
						</div>
						{infoMsg && <p style={{ color: 'green' }}>{infoMsg}</p>}
						{infoErr && <p style={{ color: 'red' }}>{infoErr}</p>}
						<button type="submit" style={{ background: '#1A8C82', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '4px', cursor: 'pointer' }}>Sauvegarder les informations</button>
					</form>
				</section>

				<section style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
					<h3>Sécurité</h3>
					<form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<div>
							<label style={{ display: 'block', marginBottom: '0.5rem' }}>Nouveau mot de passe</label>
							<input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CBD5E1' }} placeholder="Minimum 6 caractères" />
						</div>
						{passMsg && <p style={{ color: 'green' }}>{passMsg}</p>}
						{passErr && <p style={{ color: 'red' }}>{passErr}</p>}
						<button type="submit" style={{ background: '#64748B', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '4px', cursor: 'pointer' }}>Modifier le mot de passe</button>
					</form>
				</section>
			</main>
		</div>
	);
}

