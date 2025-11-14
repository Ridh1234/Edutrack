"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AssignmentCard from '../../components/AssignmentCard';
import FileUploadForm from '../../components/FileUploadForm';
import { apiFetch } from '../../lib/api';

type Assignment = { id: number; title: string; description?: string | null; dueDate?: string | null };
type Submission = {
  id: number;
  assignmentId: number; // included in backend model (foreign key) used for updating lists
  grade?: number | null;
  feedback?: string | null;
  submittedAt: string;
  filePath: string;
  student: { id: number; name: string; email: string };
};

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, { loading: boolean; submissions: Submission[] | null }>>({});
  const [grading, setGrading] = useState<Record<number, { grade: string; feedback: string; saving: boolean }>>({});

  useEffect(() => {
    if (!token) return;
    apiFetch<Assignment[]>('/assignments', {}, token).then(setAssignments).catch(console.error);
  }, [token]);

  const createAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await apiFetch<Assignment>(
      '/assignments',
      { method: 'POST', body: JSON.stringify({ title, description, dueDate: dueDate || null }) },
      token
    );
    setAssignments((a: Assignment[]) => [created, ...a]);
    setTitle('');
    setDescription('');
    setDueDate('');
    setShowForm(false);
  };

  const upload = (assignmentId: number) => async (file: File) => {
    if (!token) return;
    const form = new FormData();
    form.append('assignmentId', String(assignmentId));
    form.append('file', file);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form
    });
    if (!res.ok) throw new Error('Upload failed');
    alert('Submitted successfully!');
  };

  // Teacher: toggle view submissions
  const toggleSubmissions = async (assignmentId: number) => {
    if (user?.role !== 'teacher') return;
    // If already expanded: collapse and stop
    if (expanded[assignmentId]) {
      setExpanded((prev) => {
        const copy = { ...prev };
        delete copy[assignmentId];
        return copy;
      });
      return;
    }
    // Otherwise start loading
    setExpanded((prev) => ({ ...prev, [assignmentId]: { loading: true, submissions: null } }));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/assignment/${assignmentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to load submissions');
      const data: Submission[] = await res.json();
      setExpanded((prev) => ({ ...prev, [assignmentId]: { loading: false, submissions: data } }));
      // init grading state entries
      setGrading((prev) => ({
        ...prev,
        ...Object.fromEntries(data.map((s) => [s.id, { grade: s.grade?.toString() || '', feedback: s.feedback || '', saving: false }]))
      }));
    } catch (e) {
      setExpanded((prev) => ({ ...prev, [assignmentId]: { loading: false, submissions: [] } }));
      console.error(e);
    }
  };

  const saveGrade = async (submission: Submission) => {
    if (!token) return;
    const gState = grading[submission.id];
    if (!gState) return;
    setGrading((prev) => ({ ...prev, [submission.id]: { ...prev[submission.id], saving: true } }));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/${submission.id}/grade`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          grade: gState.grade === '' ? undefined : parseFloat(gState.grade),
          feedback: gState.feedback || undefined
        })
      });
      if (!res.ok) throw new Error('Failed to save grade');
      const updated: Submission = await res.json();
      // Update expanded data
      setExpanded((prev) => {
        const entry = prev[updated.assignmentId];
        if (!entry || !entry.submissions) return prev;
        return {
          ...prev,
          [updated.assignmentId]: {
            ...entry,
            submissions: entry.submissions.map((s) => (s.id === updated.id ? { ...s, grade: updated.grade, feedback: updated.feedback } : s))
          }
        };
      });
      setGrading((prev) => ({ ...prev, [updated.id]: { ...prev[updated.id], saving: false, grade: updated.grade?.toString() || '', feedback: updated.feedback || '' } }));
    } catch (e) {
      console.error(e);
      setGrading((prev) => ({ ...prev, [submission.id]: { ...prev[submission.id], saving: false } }));
      alert('Failed to save grade');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="card-glass max-w-md mx-auto">
          <p className="text-gray-600">Please sign in to access your dashboard.</p>
          <a href="/login" className="btn-primary mt-4 inline-block">Sign In</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
          {user.role === 'teacher' ? 'Teacher Dashboard' : 'My Assignments'}
        </h1>
        <p className="text-gray-600">
          {user.role === 'teacher' 
            ? 'Create and manage your assignments' 
            : 'View and submit your assignments'}
        </p>
      </div>

      {user.role === 'teacher' && (
        <div className="mb-8">
          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Assignment
            </button>
          ) : (
            <div className="card-glass">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">New Assignment</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={createAssignment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input 
                    className="input-field" 
                    placeholder="Assignment title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    className="input-field min-h-[100px]" 
                    placeholder="Assignment description and instructions" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input 
                    type="datetime-local"
                    className="input-field" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary">
                    Create Assignment
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {user.role === 'teacher' ? 'Your Assignments' : 'All Assignments'}
          </h2>
          <span className="badge badge-primary">
            {assignments.length} {assignments.length === 1 ? 'assignment' : 'assignments'}
          </span>
        </div>
        
        {assignments.length === 0 ? (
          <div className="card-glass text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600">
              {user.role === 'teacher' 
                ? 'No assignments yet. Create your first assignment to get started!' 
                : 'No assignments available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map((a) => {
              const exp = expanded[a.id];
              return (
                <AssignmentCard key={a.id} title={a.title} description={a.description} dueDate={a.dueDate}>
                  {user.role === 'student' && <FileUploadForm onSubmit={upload(a.id)} />}
                  {user.role === 'teacher' && (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => toggleSubmissions(a.id)}
                        className="btn-secondary"
                      >
                        {exp ? 'Hide Submissions' : 'View Submissions'}
                      </button>
                      {exp && (
                        <div className="mt-2">
                          {exp.loading && <p className="text-sm text-gray-600">Loading submissions...</p>}
                          {!exp.loading && exp.submissions && exp.submissions.length === 0 && (
                            <p className="text-sm text-gray-600">No submissions yet.</p>
                          )}
                          {!exp.loading && exp.submissions && exp.submissions.length > 0 && (
                            <div className="space-y-4">
                              {exp.submissions.map((s) => {
                                const g = grading[s.id];
                                return (
                                  <div key={s.id} className="rounded-lg border border-gray-200 p-4 bg-white/70">
                                    <div className="flex items-center justify-between mb-2">
                                      <div>
                                        <p className="text-sm font-medium text-gray-800">{s.student.name} <span className="text-xs text-gray-500">({s.student.email})</span></p>
                                        <p className="text-xs text-gray-500">Submitted: {new Date(s.submittedAt).toLocaleString()}</p>
                                      </div>
                                      <a
                                        href={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api','')}/${s.filePath}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 text-sm hover:underline"
                                      >
                                        View File
                                      </a>
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-3 mt-2">
                                      <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        step={0.01}
                                        placeholder="Grade %"
                                        className="input-field"
                                        value={g?.grade || ''}
                                        onChange={(e) => setGrading((prev) => ({ ...prev, [s.id]: { ...prev[s.id], grade: e.target.value } }))}
                                      />
                                      <input
                                        type="text"
                                        placeholder="Feedback"
                                        className="input-field md:col-span-2"
                                        value={g?.feedback || ''}
                                        onChange={(e) => setGrading((prev) => ({ ...prev, [s.id]: { ...prev[s.id], feedback: e.target.value } }))}
                                      />
                                      <div className="md:col-span-3 flex gap-2">
                                        <button
                                          type="button"
                                          disabled={g?.saving}
                                          onClick={() => saveGrade(s)}
                                          className="btn-primary disabled:opacity-50"
                                        >
                                          {g?.saving ? 'Saving...' : 'Save Grade'}
                                        </button>
                                      </div>
                                      {s.grade !== null && s.grade !== undefined && (
                                        <p className="text-xs text-gray-600 md:col-span-3">Current: {s.grade}% {s.feedback ? `- ${s.feedback}` : ''}</p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </AssignmentCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
