type Props = {
  title: string;
  description?: string | null;
  dueDate?: string | null;
  children?: React.ReactNode;
};

export default function AssignmentCard({ title, description, dueDate, children }: Props) {
  return (
    <div className="card-glass mb-4 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {dueDate && (
            <div className="flex items-center gap-2 mt-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-600">
                Due: {new Date(dueDate).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {description && (
        <p className="text-gray-700 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
          {description}
        </p>
      )}
      
      {children && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
}
