import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from './_actions/user.actions'; // adjust this path if needed

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user, loading, loaded } = useSelector((state) => state.user);

  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  // Configurable timeout settings
  const INACTIVITY_TIMEOUT = 300; // seconds before auto-logout
  const MODAL_SHOW_THRESHOLD = 10; // when to show the modal

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalSeconds, setModalSeconds] = useState(INACTIVITY_TIMEOUT);

  useEffect(() => {
    if (!user) return;

    const resetTimer = () => {
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);

      const deadline = Date.now() + INACTIVITY_TIMEOUT * 1000;

      setShowModal(false);
      setModalSeconds(INACTIVITY_TIMEOUT);

      countdownRef.current = setInterval(() => {
        const secondsLeft = Math.ceil((deadline - Date.now()) / 1000);

        if (secondsLeft <= MODAL_SHOW_THRESHOLD) {
          setShowModal(true);
          setModalSeconds(secondsLeft);
        }

        if (secondsLeft <= 0) {
          clearInterval(countdownRef.current);
        }
      }, 1000);

      timerRef.current = setTimeout(() => {
        clearInterval(countdownRef.current);
        setShowModal(false);
        console.log('⏳ Logging out due to inactivity.');
        dispatch(logout());
      }, INACTIVITY_TIMEOUT * 1000);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Start timer initially
    resetTimer();

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [dispatch, user]);

  if (!loaded) return <div>Loading...</div>;
  if (!user) return <Navigate to="/Login" replace />;

  return (
    <>
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(30, 41, 59, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white',
            padding: '2.5rem 2rem 2rem 2rem',
            borderRadius: '1.25rem',
            boxShadow: '0 8px 32px rgba(30,41,59,0.18)',
            minWidth: 340,
            maxWidth: 400,
            textAlign: 'center',
            position: 'relative',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.2rem'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#FACC15"/>
                <path d="M12 7v4m0 4h.01" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              Session Expiring Soon
            </h2>
            <p style={{
              color: '#334155',
              fontSize: '1rem',
              marginBottom: '1.2rem'
            }}>
              You will be logged out in <span style={{color:'#e11d48', fontWeight:600}}>{modalSeconds}</span> seconds due to inactivity.
            </p>
            <p style={{
              color: '#64748b',
              fontSize: '0.95rem',
              marginTop: '1.1rem'
            }}>
              Any activity will keep you signed in.
            </p>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
