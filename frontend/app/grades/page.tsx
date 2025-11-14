"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

type Submission = { 
  id: number; 
  grade?: number | null; 
  feedback?: string | null; 
  submittedAt: string; 
  filePath: string;
  assignmentId: number;
};

export default function GradesPage() {
  const { user, token } = useAuth();
  const [subs, setSubs] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((r) => r.json())
    .then((data: Submission[]) => {
      setSubs(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, [token]);

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="card-glass max-w-md mx-auto">
          <p className="text-gray-600">Please sign in to view your grades.</p>
          <a href="/login" className="btn-primary mt-4 inline-block">Sign In</a>
        </div>
      </div>
    );
  }

  if (user.role !== 'student') {
    return (
      <div className="text-center py-12">
        <div className="card-glass max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-600">Only students can view grades.</p>
          <a href="/dashboard" className="btn-primary mt-4 inline-block">Go to Dashboard</a>
        </div>
      </div>
    );
  }

  const calculateAverage = () => {
    const graded = subs.filter(s => s.grade !== null && s.grade !== undefined);
    if (graded.length === 0) return null;
    const sum = graded.reduce((acc, s) => acc + (s.grade || 0), 0);
    return (sum / graded.length).toFixed(2);
  };

  const getGradeColor = (grade: number | null | undefined) => {
    if (grade === null || grade === undefined) return 'text-gray-500';
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const average = calculateAverage();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
          My Grades
        </h1>
        <p className="text-gray-600">Track your assignment submissions and grades</p>
      </div>

      {average && (
        <div className="card-glass mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overall Average</p>
              <p className="text-3xl font-bold text-blue-600">{average}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Total Submissions</p>
              <p className="text-3xl font-bold text-gray-900">{subs.length}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="card-glass text-center py-12">
          <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      ) : subs.length === 0 ? (
        <div className="card-glass text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600 mb-4">No submissions yet.</p>
          <a href="/dashboard" className="btn-primary inline-block">Go to Assignments</a>
        </div>
      ) : (
        <div className="space-y-4">
          {subs.map((s) => (
            <div key={s.id} className="card-glass">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-primary">Submission #{s.id}</span>
                    {s.grade !== null && s.grade !== undefined ? (
                      <span className="badge badge-success">Graded</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Submitted: {new Date(s.submittedAt).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                
                {s.grade !== null && s.grade !== undefined && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Grade</p>
                    <p className={`text-3xl font-bold ${getGradeColor(s.grade)}`}>
                      {s.grade}%
                    </p>
                  </div>
                )}
              </div>
              
              {s.feedback && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Teacher Feedback:</p>
                  <p className="text-sm text-gray-800">{s.feedback}</p>
                </div>
              )}
              
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <a 
                  href={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api','')}/${s.filePath}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Submitted File
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
