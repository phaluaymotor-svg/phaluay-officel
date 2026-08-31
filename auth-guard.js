(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  const publicPages = new Set(['login.html','register.html']);
  if (publicPages.has(page)) return;

  function showGuestMode() {
    document.documentElement.classList.remove('auth-checking');
    document.documentElement.classList.add('auth-ready', 'preview-access');
    document.querySelectorAll('[data-auth-user]').forEach(el => {
      el.textContent = 'GUEST';
    });
    document.querySelectorAll('[data-auth-photo]').forEach(el => {
      el.hidden = true;
    });
  }

  function goLogin(reason='') {
    const next = encodeURIComponent(location.pathname.split('/').pop() + location.search + location.hash);
    const suffix = reason ? '&reason=' + encodeURIComponent(reason) : '';
    location.replace('login.html?next=' + next + suffix);
  }

  // Production behavior:
  // - No Firebase config yet -> website remains usable in Guest mode.
  // - Firebase configured -> real authentication is required.
  if (!window.PHALUAY_FIREBASE_READY || !window.phaluayAuth) {
    showGuestMode();
    return;
  }

  document.documentElement.classList.add('auth-checking');
  window.phaluayAuth.onAuthStateChanged(user => {
    if (!user) return goLogin('login-required');

    document.documentElement.classList.remove('auth-checking');
    document.documentElement.classList.add('auth-ready');
    document.querySelectorAll('[data-auth-user]').forEach(el => {
      el.textContent = user.displayName || user.email || user.phoneNumber || 'ACCOUNT';
    });
    document.querySelectorAll('[data-auth-photo]').forEach(el => {
      if (user.photoURL) {
        el.src = user.photoURL;
        el.hidden = false;
      }
    });
  });
})();