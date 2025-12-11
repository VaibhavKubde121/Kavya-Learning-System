// ===================== BASE URL HANDLING =====================

// User provides ONLY the backend root domain in .env like:
// VITE_API_BASE_URL = https://kavya-learning-system.onrender.com

// So we add /api automatically
const ROOT = import.meta.env.VITE_API_BASE_URL || '';
const BASE = ROOT ? `${ROOT}/api` : '/api';

function authHeaders(isForm = false) {
  const token = localStorage.getItem('token');
  const headers = {};

  if (token) headers.Authorization = `Bearer ${token}`;

  if (!isForm) headers['Content-Type'] = 'application/json';

  return headers;
}

// ===================== COURSES =====================

export async function getCourses() {
  const res = await fetch(`${BASE}/courses`, { headers: authHeaders() });
  return res.json();
}

export async function createCourse(payload) {
  const res = await fetch(`${BASE}/courses`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return res.json();
}

// ===================== QUIZZES =====================

export async function getQuizzes(courseId) {
  const url = courseId
    ? `${BASE}/quiz?courseId=${courseId}`
    : `${BASE}/quiz`;

  const res = await fetch(url, { headers: authHeaders() });
  return res.json();
}

export async function createQuiz(payload) {
  const res = await fetch(`${BASE}/quiz`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getQuiz(id) {
  const res = await fetch(`${BASE}/quiz/${id}`, { headers: authHeaders() });
  return res.json();
}

export async function submitQuiz(id, answers) {
  const res = await fetch(`${BASE}/quiz/${id}/submit`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ answers }),
  });
  return res.json();
}

// ===================== EVENTS =====================

export async function getEvents() {
  const res = await fetch(`${BASE}/events`, { headers: authHeaders() });
  return res.json();
}

export async function createEvent(payload) {
  const res = await fetch(`${BASE}/events`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return res.json();
}

// ===================== PROFILE =====================

export async function getProfile() {
  const res = await fetch(`${BASE}/users/profile`, { headers: authHeaders() });
  return res.json();
}

export async function updateProfile(payload) {
  const res = await fetch(`${BASE}/users/profile`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update profile');
  }

  return res.json();
}

// ===================== PHOTO UPLOAD =====================

export async function uploadProfilePhoto(file) {
  const formData = new FormData();
  formData.append('profilePhoto', file);

  const res = await fetch(`${BASE}/users/upload-photo`, {
    method: 'POST',
    headers: authHeaders(true),
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to upload photo');
  }

  return res.json();
}

// ===================== STREAK =====================

export async function getStreak() {
  const res = await fetch(`${BASE}/users/streak`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to load streak');
  return res.json();
}

// ===================== PROGRESS =====================

export async function getProgressOverview() {
  const res = await fetch(`${BASE}/progress/overview`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to load progress overview');
  return res.json();
}

export async function getRecentActivity() {
  const res = await fetch(`${BASE}/progress/activity`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to load recent activity');
  return res.json();
}

export async function downloadCertificate(courseId) {
  const res = await fetch(`${BASE}/progress/certificates/${courseId}/download`, {
    method: 'GET',
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Certificate is not available yet');
  return res.blob();
}

// ===================== AI QUERY =====================

export async function aiQuery(courseId, query) {
  const res = await fetch(`${BASE}/ai/query`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ courseId, query }),
  });
  return res.json();
}

// ===================== EXPORT ALL =====================

export default {
  getCourses,
  createCourse,
  getQuizzes,
  createQuiz,
  getQuiz,
  submitQuiz,
  getEvents,
  createEvent,
  getProfile,
  getProgressOverview,
  getRecentActivity,
  downloadCertificate,
  aiQuery,
  uploadProfilePhoto,
  updateProfile,
  getStreak,
};
