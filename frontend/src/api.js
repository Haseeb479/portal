const API_BASE = "http://localhost:5000/api";

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getPendingRequisitions(token) {
  const res = await fetch(`${API_BASE}/hr-dashboard/job-requisitions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function approveRequisition(id, token) {
  const res = await fetch(`${API_BASE}/hr-dashboard/job-requisitions/${id}/approve`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function rejectRequisition(id, token) {
  const res = await fetch(`${API_BASE}/hr-dashboard/job-requisitions/${id}/reject`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getNotifications(token) {
  const res = await fetch(`${API_BASE}/hr-dashboard/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getOverrides(token) {
  const res = await fetch(`${API_BASE}/override`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createOverride(overrideData, token) {
  const res = await fetch(`${API_BASE}/override`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(overrideData)
  });
  return res.json();
}
export async function getOverviewStats(token) {
  const res = await fetch(`${API_BASE}/hr-dashboard/overview`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}