const ADMIN_USER = 'KANENbuseng';
const ADMIN_PASS = 'pabunan1978';

function toggleAuthMode(mode) {
    document.getElementById('auth-mode').value = mode;
    const signupBtn = document.getElementById('tab-btn-signup');
    const loginBtn = document.getElementById('tab-btn-login');
    const riderFields = document.getElementById('rider-fields');
    const submitBtn = document.getElementById('gate-submit-btn');
    const errorEl = document.getElementById('gate-error');

    errorEl.classList.add('hidden');

    if (mode === 'signup') {
        signupBtn.className = 'py-2 rounded-xl transition-all bg-blue-600 text-white';
        loginBtn.className = 'py-2 rounded-xl transition-all text-gray-400 hover:text-white';
        riderFields.classList.remove('hidden');
        submitBtn.textContent = 'Create Customer Account';
    } else {
        loginBtn.className = 'py-2 rounded-xl transition-all bg-blue-600 text-white';
        signupBtn.className = 'py-2 rounded-xl transition-all text-gray-400 hover:text-white';
        riderFields.classList.add('hidden');
        submitBtn.textContent = 'Sign In to V-Track';
    }
}

function toggleAdminMode() {
    const roleInput = document.getElementById('auth-role');
    const toggleBox = document.getElementById('customer-mode-toggle');
    const riderFields = document.getElementById('rider-fields');
    const subtitle = document.getElementById('gate-subtitle');
    const submitBtn = document.getElementById('gate-submit-btn');
    const switchBtn = document.getElementById('admin-switch-btn');
    const errorEl = document.getElementById('gate-error');

    errorEl.classList.add('hidden');

    if (roleInput.value === 'customer') {
        roleInput.value = 'admin';
        toggleBox.classList.add('hidden');
        riderFields.classList.add('hidden');
        subtitle.textContent = 'Administrator access only.';
        submitBtn.textContent = 'Login as Admin';
        switchBtn.textContent = 'Back to Customer Login / Sign Up';
    } else {
        roleInput.value = 'customer';
        toggleBox.classList.remove('hidden');
        subtitle.textContent = 'Sign up or login to browse and book rental vehicles.';
        switchBtn.textContent = 'Admin Portal Login';
        toggleAuthMode(document.getElementById('auth-mode').value);
    }
}

function isAtLeast18(dobString) {
    if (!dobString) return false;
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age >= 18;
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const role = document.getElementById('auth-role').value;
    const mode = document.getElementById('auth-mode').value;
    const fullName = document.getElementById('gate-fullname').value.trim();
    const password = document.getElementById('gate-password').value;
    const errorEl = document.getElementById('gate-error');

    errorEl.classList.add('hidden');

    if (role === 'admin') {
        if (fullName === ADMIN_USER && password === ADMIN_PASS) {
            state.currentUser = {
                name: 'Fleet Administrator',
                role: 'admin'
            };
            saveState();
            enterMainApp();
        } else {
            errorEl.textContent = 'Invalid admin credentials.';
            errorEl.classList.remove('hidden');
        }
        return;
    }

    if (mode === 'signup') {
        const dob = document.getElementById('gate-dob').value;
        const phone = document.getElementById('gate-phone').value.trim();

        if (!isAtLeast18(dob)) {
            errorEl.textContent = 'Rider must be at least 18 years old to rent a vehicle.';
            errorEl.classList.remove('hidden');
            return;
        }
        if (!phone) {
            errorEl.textContent = 'Please enter your contact number.';
            errorEl.classList.remove('hidden');
            return;
        }

        const newUser = {
            name: fullName,
            password,
            dob,
            phone,
            role: 'customer'
        };

        const existingIndex = state.users.findIndex(u => u.name.toLowerCase() === fullName.toLowerCase());
        if (existingIndex >= 0) {
            state.users[existingIndex] = newUser;
        } else {
            state.users.push(newUser);
        }

        state.currentUser = { ...newUser };
        saveState();
        enterMainApp();
    } else {
        const foundUser = state.users.find(
            u => u.name.toLowerCase() === fullName.toLowerCase() && u.password === password
        );
        if (!foundUser) {
            errorEl.textContent = 'Account not found or incorrect password.';
            errorEl.classList.remove('hidden');
            return;
        }
        state.currentUser = { ...foundUser };
        saveState();
        enterMainApp();
    }
}

function logout() {
    state.currentUser = null;
    saveState();
    document.getElementById('main-app-container').classList.add('hidden');
    document.getElementById('auth-gate-screen').classList.remove('hidden');
    document.getElementById('gate-auth-form').reset();
}

function enterMainApp() {
    document.getElementById('auth-gate-screen').classList.add('hidden');
    document.getElementById('main-app-container').classList.remove('hidden');

    const user = state.currentUser;
    document.getElementById('user-display-name').textContent = user.name;
    document.getElementById('user-display-role').textContent = user.role;

    const adminNav = document.getElementById('nav-admin');
    if (user.role === 'admin') {
        adminNav.classList.remove('hidden');
    } else {
        adminNav.classList.add('hidden');
    }

    renderFilters();
    renderFleet();
    renderReservations();
    renderAdminFleet();
}


