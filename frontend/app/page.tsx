export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center py-20">
      <div className="card-glass max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Welcome to EduTrack
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your modern classroom management platform. Track assignments, submit work, and monitor progress all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/register" className="btn-primary">
            Get Started
          </a>
          <a href="/login" className="btn-secondary">
            Sign In
          </a>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <div className="card-glass text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Manage Assignments</h3>
          <p className="text-sm text-gray-600">Create and organize assignments with ease</p>
        </div>
        
        <div className="card-glass text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Submit Work</h3>
          <p className="text-sm text-gray-600">Upload assignments securely and track submissions</p>
        </div>
        
        <div className="card-glass text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
          <p className="text-sm text-gray-600">Monitor grades and receive feedback instantly</p>
        </div>
      </div>
    </div>
  );
}
