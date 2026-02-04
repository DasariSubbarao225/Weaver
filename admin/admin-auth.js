// Admin Authentication Module

// Simple MD5 hash function for password verification
function md5(string) {
    function rotateLeft(value, shift) {
        return (value << shift) | (value >>> (32 - shift));
    }
    
    function addUnsigned(x, y) {
        const lx = x & 0x80000000;
        const ly = y & 0x80000000;
        const lx4 = x & 0x40000000;
        const ly4 = y & 0x40000000;
        const result = (x & 0x3FFFFFFF) + (y & 0x3FFFFFFF);
        if (lx4 & ly4) return result ^ 0x80000000 ^ lx ^ ly;
        if (lx4 | ly4) {
            if (result & 0x40000000) return result ^ 0xC0000000 ^ lx ^ ly;
            return result ^ 0x40000000 ^ lx ^ ly;
        }
        return result ^ lx ^ ly;
    }
    
    function f(x, y, z) { return (x & y) | ((~x) & z); }
    function g(x, y, z) { return (x & z) | (y & (~z)); }
    function h(x, y, z) { return x ^ y ^ z; }
    function i(x, y, z) { return y ^ (x | (~z)); }
    
    function ff(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function gg(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function hh(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function ii(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function convertToWordArray(string) {
        let messageLength = string.length;
        let numWords = (((messageLength + 8) - ((messageLength + 8) % 64)) / 64 + 1) * 16;
        let wordArray = new Array(numWords - 1);
        let bytePos = 0;
        let wordCount = 0;
        
        while (bytePos < messageLength) {
            wordCount = (bytePos - (bytePos % 4)) / 4;
            let byteInWord = (bytePos % 4) * 8;
            wordArray[wordCount] = (wordArray[wordCount] | (string.charCodeAt(bytePos) << byteInWord));
            bytePos++;
        }
        
        wordCount = (bytePos - (bytePos % 4)) / 4;
        let byteInWord = (bytePos % 4) * 8;
        wordArray[wordCount] = wordArray[wordCount] | (0x80 << byteInWord);
        wordArray[numWords - 2] = messageLength << 3;
        wordArray[numWords - 1] = messageLength >>> 29;
        
        return wordArray;
    }
    
    function wordToHex(value) {
        let hex = '';
        for (let i = 0; i <= 3; i++) {
            let byte = (value >>> (i * 8)) & 255;
            hex += ('0' + byte.toString(16)).slice(-2);
        }
        return hex;
    }
    
    let x = convertToWordArray(string);
    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;
    
    const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    const S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    
    for (let k = 0; k < x.length; k += 16) {
        let AA = a, BB = b, CC = c, DD = d;
        
        a = ff(a, b, c, d, x[k], S11, 0xD76AA478);
        d = ff(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = ff(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = ff(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = ff(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = ff(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = ff(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = ff(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = ff(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = ff(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = ff(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = ff(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = ff(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = ff(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = ff(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = ff(b, c, d, a, x[k + 15], S14, 0x49B40821);
        
        a = gg(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = gg(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = gg(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = gg(b, c, d, a, x[k], S24, 0xE9B6C7AA);
        a = gg(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = gg(d, a, b, c, x[k + 10], S22, 0x02441453);
        c = gg(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = gg(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = gg(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = gg(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = gg(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = gg(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = gg(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = gg(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = gg(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = gg(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        
        a = hh(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = hh(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = hh(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = hh(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = hh(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = hh(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = hh(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = hh(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = hh(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = hh(d, a, b, c, x[k], S32, 0xEAA127FA);
        c = hh(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = hh(b, c, d, a, x[k + 6], S34, 0x04881D05);
        a = hh(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = hh(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = hh(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = hh(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        
        a = ii(a, b, c, d, x[k], S41, 0xF4292244);
        d = ii(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = ii(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = ii(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = ii(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = ii(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = ii(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = ii(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = ii(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = ii(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = ii(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = ii(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = ii(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = ii(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = ii(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = ii(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }
    
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

// Admin configuration
const ADMIN_CONFIG_KEY = 'weaver_admin_config';
const AUTH_SESSION_KEY = 'weaver_admin_session';

// Default admin credentials (password hash for "password")
const DEFAULT_ADMIN = {
    username: 'admin',
    passwordHash: '5f4dcc3b5aa765d61d8327deb882cf99' // MD5 of "password"
};

// Get admin config from localStorage or use default
function getAdminConfig() {
    const stored = localStorage.getItem(ADMIN_CONFIG_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing admin config:', e);
        }
    }
    return { admin: DEFAULT_ADMIN };
}

// Save admin config to localStorage
function saveAdminConfig(config) {
    localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(config));
}

// Check if user is authenticated
function isAuthenticated() {
    const session = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (session) {
        try {
            const data = JSON.parse(session);
            return data.authenticated === true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

// Create auth session
function createSession(username) {
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
        authenticated: true,
        username: username,
        timestamp: Date.now()
    }));
}

// Destroy auth session
function destroySession() {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
}

// Get current session username
function getSessionUsername() {
    const session = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (session) {
        try {
            const data = JSON.parse(session);
            return data.username || 'Admin';
        } catch (e) {
            return 'Admin';
        }
    }
    return 'Admin';
}

// Login function
function login(username, password) {
    const config = getAdminConfig();
    const adminUser = config.admin || DEFAULT_ADMIN;
    
    const passwordHash = md5(password);
    
    if (username === adminUser.username && passwordHash === adminUser.passwordHash) {
        createSession(username);
        return true;
    }
    
    return false;
}

// Logout function
function logout() {
    destroySession();
    window.location.href = 'index.html';
}

// Update admin credentials
function updateCredentials(username, newPassword) {
    const config = getAdminConfig();
    config.admin = {
        username: username,
        passwordHash: newPassword ? md5(newPassword) : config.admin.passwordHash
    };
    saveAdminConfig(config);
    return true;
}

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        
        if (login(username, password)) {
            window.location.href = 'dashboard.html';
        } else {
            errorDiv.textContent = 'Invalid username or password';
        }
    });
}

// Handle logout button
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        logout();
    });
}

// Protect dashboard page
if (window.location.pathname.includes('dashboard.html')) {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
    }
}
