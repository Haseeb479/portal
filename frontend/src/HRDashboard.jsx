import React, { useEffect, useState } from "react";
import { getPendingRequisitions, approveRequisition, rejectRequisition, getNotifications } from "./api";
import OverridePanel from "./OverridePanel";

export default function HRDashboard({ token, role }) {
  const [requisitions, setRequisitions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getPendingRequisitions(token).then(setRequisitions);
    getNotifications(token).then(setNotifications);
  }, [token]);

  const handleApprove = async (id) => {
    await approveRequisition(id, token);
    setRequisitions((reqs) => reqs.filter((r) => r._id !== id));
  };

  const handleReject = async (id) => {
    await rejectRequisition(id, token);
    setRequisitions((reqs) => reqs.filter((r) => r._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">HR Dashboard</h1>
      <div className="grid grid-cols-3 gap-8 mb-10">
        <div className="bg-white/60 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold text-blue-700">{requisitions.length}</div>
          <div className="text-lg font-medium text-gray-700 mt-1">Pending Requisitions</div>
        </div>
        <div className="bg-white/60 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold text-blue-700">5</div>
          <div className="text-lg font-medium text-gray-700 mt-1">Active Jobs</div>
        </div>
        <div className="bg-white/60 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold text-blue-700">12</div>
          <div className="text-lg font-medium text-gray-700 mt-1">Candidates in Process</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Pending Requisitions */}
        <div className="col-span-2 bg-white/70 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-900">Pending Job Requisitions</h2>
          </div>
          <table className="min-w-full text-gray-800">
            <thead>
              <tr>
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Department</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requisitions.map((r) => (
                <tr key={r._id} className="border-t hover:bg-blue-50 transition">
                  <td className="py-2">{r.title}</td>
                  <td className="py-2">{r.department}</td>
                  <td className="py-2">{new Date(r.submitted_at).toLocaleDateString()}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs">{r.status}</span>
                  </td>
                  <td className="py-2 flex gap-2">
                    {role === "HR" && (
                      <>
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm"
                          onClick={() => handleApprove(r._id)}>Approve</button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                          onClick={() => handleReject(r._id)}>Reject</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Notifications */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/70 rounded-2xl p-5 shadow-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Notifications</h3>
            <ul className="space-y-3">
              {notifications.map((note) => (
                <li key={note._id} className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 bg-blue-400 rounded-full"></span>
                  <span>{note.message}</span>
                  <span className="ml-auto text-xs text-gray-400">{new Date(note.time).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
          <OverridePanel token={token} role={role} />
        </div>
      </div>
    </div>
  );
}
import { getPendingRequisitions, approveRequisition, rejectRequisition } from "./api";