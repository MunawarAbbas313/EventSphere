import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-surface-200 text-surface-600 hover:bg-surface-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {start > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="w-10 h-10 rounded-xl text-sm font-medium border border-surface-200 text-surface-600 hover:bg-surface-50 transition-all"
                    >
                        1
                    </button>
                    {start > 2 && <span className="text-surface-400 px-1">...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${page === currentPage
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                            : 'border border-surface-200 text-surface-600 hover:bg-surface-50'
                        }`}
                >
                    {page}
                </button>
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span className="text-surface-400 px-1">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="w-10 h-10 rounded-xl text-sm font-medium border border-surface-200 text-surface-600 hover:bg-surface-50 transition-all"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-surface-200 text-surface-600 hover:bg-surface-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
