export function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-surface-100">
            <div className="skeleton h-48 rounded-none" />
            <div className="p-5 space-y-3">
                <div className="skeleton h-4 w-20 rounded-full" />
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-4 w-2/3" />
                <div className="flex justify-between pt-3 border-t border-surface-100">
                    <div className="skeleton h-6 w-6 rounded-full" />
                    <div className="skeleton h-4 w-16" />
                </div>
            </div>
        </div>
    );
}

export function DetailSkeleton() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="skeleton h-72 lg:h-96 rounded-2xl" />
            <div className="container-app space-y-4">
                <div className="skeleton h-8 w-2/3" />
                <div className="skeleton h-4 w-1/3" />
                <div className="space-y-2">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-5/6" />
                    <div className="skeleton h-4 w-4/6" />
                </div>
            </div>
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-surface-100">
                        <div className="skeleton h-4 w-24 mb-3" />
                        <div className="skeleton h-8 w-32 mb-2" />
                        <div className="skeleton h-3 w-20" />
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-2xl p-6 border border-surface-100">
                <div className="skeleton h-6 w-40 mb-4" />
                <div className="skeleton h-64" />
            </div>
        </div>
    );
}
