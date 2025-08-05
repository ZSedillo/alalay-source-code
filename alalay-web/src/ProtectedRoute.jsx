import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user, loading, loaded } = useSelector((state) => state.user);

  // ⏳ Don't render or redirect until auth check is done
  if (!loaded) return <div>Loading...</div>;

  // ❌ Not logged in
  if (!user) return <Navigate to="/Login" replace />;

  // ✅ Logged in
  return children;
}
