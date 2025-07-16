import React, { useState, useEffect } from "react";
import { getOverrides, createOverride } from "./api";

export default function OverridePanel({ token, role }) {
  const [actions, setActions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: "", entityId: "", previousStatus: "", newStatus: "", reason: "" });

  useEffect(() => {
    getOverrides(token).then(setActions);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOverride(form, token);
    setShowModal(false);
    setForm({ type: "", entityId: "", previousStatus: "", newStatus: "", reason: "" });
    getOverrides(token).then(setActions);
  };

  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-semibold text-blue-900">Manual Overrides</h3>
        {["HR", "Admin"].includes(role) && (
          <button className="px-3 py-1 bg-blue-200 rounded-lg" onClick={() => setShowModal(true)}>
            New Override
          </button>
        )}
      </div>
      <ul className="space-y-2 text-sm">
        {actions.map(a => (
          <li key={a._id} className="flex justify-between">
            <span>{a.type} for ID {a.entityId}: <b>{a.previousStatus} → {a.newStatus}</b></span>
            <span className="text-gray-400">{new Date(a.performedAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <div className="font-bold mb-4">Perform Manual Override</div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input className="border px-3 py-2 rounded w-full" placeholder="Type (e.g., CandidateShortlist)"
                value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} required />
              <input className="border px-3 py-2 rounded w-full" placeholder="Entity ID"
                value={form.entityId} onChange={e => setForm(f => ({ ...f, entityId: e.target.value }))} required />
              <input className="border px-3 py-2 rounded w-full" placeholder="Previous Status"
                value={form.previousStatus} onChange={e => setForm(f => ({ ...f, previousStatus: e.target.value }))} required />
              <input className="border px-3 py-2 rounded w-full" placeholder="New Status"
                value={form.newStatus} onChange={e => setForm(f => ({ ...f, newStatus: e.target.value }))} required />
              <input className="border px-3 py-2 rounded w-full" placeholder="Reason"
                value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} required />
              <div className="flex gap-3 mt-2">
                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded-lg">Submit</button>
                <button type="button" className="bg-gray-300 px-3 py-1 rounded-lg" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { getOverrides, createOverride } from "./api";