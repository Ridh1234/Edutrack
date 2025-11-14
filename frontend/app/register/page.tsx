"use client";
import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSuccess(false);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        setMessage('Account created successfully! You can now sign in.');
        setIsSuccess(true);
        setForm({ name: '', email: '', password: '', role: 'student' });
      } else {
        let detail = 'Registration failed. Please try again.';
        try {
          const data = await res.json();
          if (data?.errors?.length) {
            detail = data.errors.map((e: { path: string; msg: string }) => `${e.path}: ${e.msg}`).join(', ');
          } else if (data?.error) {
            detail = data.error;
          }
        } catch {
          // Ignore JSON parse errors
        }
        setMessage(detail);
      }
    } catch (err) {
      setMessage((err as Error).message || 'Network error. Please check your connection.');
    }
  };

  return (
    <div className="max-w-md mx-auto pt-12">
      <div className="card-glass">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-600">Join EduTrack to get started</p>
        </div>
        
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              className="input-field" 
              placeholder="John Doe" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email"
              className="input-field" 
              placeholder="you@example.com" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="At least 6 characters" 
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'student' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  form.role === 'student' 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold">Student</div>
                <div className="text-xs text-gray-600 mt-1">Submit assignments</div>
              </button>
              
              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'teacher' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  form.role === 'teacher' 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold">Teacher</div>
                <div className="text-xs text-gray-600 mt-1">Create & grade</div>
              </button>
            </div>
          </div>
          
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              isSuccess 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {message}
            </div>
          )}
          
          <button type="submit" className="btn-primary w-full">
            Create Account
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
}
