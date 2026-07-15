// NivAaran API Client
const API = {
  base: '/api',

  getToken() { return localStorage.getItem('nivaaran_token'); },
  getUser()  { return JSON.parse(localStorage.getItem('nivaaran_user') || 'null'); },

  setAuth(token, user) {
    localStorage.setItem('nivaaran_token', token);
    localStorage.setItem('nivaaran_user', JSON.stringify(user));
  },

  clearAuth() {
    localStorage.removeItem('nivaaran_token');
    localStorage.removeItem('nivaaran_user');
  },

  isLoggedIn() { return !!this.getToken(); },

  async request(path, options = {}) {
    const token = this.getToken();
    const res = await fetch(this.base + path, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': 'Bearer ' + token } : {}),
        ...options.headers
      },
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined
    });
    const data = await res.json();
    if (res.status === 401) {
      this.clearAuth();
      window.location.href = '/login.html';
    }
    return data;
  },

  // Auth
  login:    (employeeId, password) => API.request('/auth/login',    { method:'POST', body:{ employeeId, password } }),
  register: (d) =>                    API.request('/auth/register',  { method:'POST', body: d }),
  me:       () =>                     API.request('/auth/me'),

  // Dashboard
  summary: () => API.request('/dashboard/summary'),

  // Complaints
  complaints:      (params={}) => API.request('/complaints?' + new URLSearchParams(params)),
  complaint:       (id) =>        API.request('/complaints/' + id),
  createComplaint: (d) =>         API.request('/complaints',         { method:'POST',  body: d }),
  updateStatus:    (id, status) => API.request(`/complaints/${id}/status`, { method:'PATCH', body:{ status } }),
  generateDraft:   (id) =>        API.request(`/complaints/${id}/draft`,   { method:'POST' }),

  // Genome
  clusters:   () =>     API.request('/genome'),
  fixCluster: (id) =>   API.request(`/genome/${id}/fix`, { method:'POST' }),

  // Radar
  radar:     () =>     API.request('/radar'),
  outreach:  (id) =>   API.request(`/radar/${id}/outreach`, { method:'POST' }),

  // RBI
  rbi:           () =>     API.request('/rbi'),
  generateLetter:(id) =>   API.request(`/rbi/${id}/generate-letter`, { method:'POST' }),

  // CLS
  cls:    () =>   API.request('/cls'),
  retain: (id) => API.request(`/cls/${id}/retain`, { method:'POST' }),
};

window.API = API;
