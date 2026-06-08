// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase' ;
import  LoginPage  from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [session, setSession] = useState (null) ;
  const [loading, setLoading] = useState (true) ;

// Écoute les changements de session (connexion/déconnexion)
useEffect(() => {
  let mounted = true;

  supabase.auth.getSession()
    .then(({ data }) => {
      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    })
    .catch((error) => {
      console.error('Supabase getSession error:', error);
      if (mounted) setLoading(false);
    });

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => setSession(session)
  );

  return () => {
    mounted = false;
    listener?.subscription?.unsubscribe();
  };
}, []);

if (loading) return <div>Chargement ...</div>;

return (
  <BrowserRouter>
    <Routes>
      <Route path="/login"
        element={session ? <Navigate to="/dashboard" /> : <LoginPage />}  />
      <Route path="/dashboard" 
        element={session ? <DashboardPage session={session} /> : <Navigate to="/login" /> } />
      <Route path="*" element={<Navigate to={session ? "/dashboard" : "/login"} />} />
      <Route path='/profile'
        element={session ? <ProfilePage session={session} /> : <Navigate to='/login' />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;