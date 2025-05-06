"use client"

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const renderPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        // First page
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => onPageChange(1)}
                    className="w-9 h-9 flex items-center justify-center rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
                >
                    1
                </button>,
            )

            if (startPage > 2) {
                pages.push(
                    <span key="ellipsis1" className="w-9 h-9 flex items-center justify-center text-zinc-600">
                        ...
                    </span>,
                )
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${i === currentPage
                            ? "bg-red-500/20 text-red-500 font-medium"
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                        }`}
                >
                    {i}
                </button>,
            )
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="ellipsis2" className="w-9 h-9 flex items-center justify-center text-zinc-600">
                        ...
                    </span>,
                )
            }

            pages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className="w-9 h-9 flex items-center justify-center rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
                >
                    {totalPages}
                </button>,
            )
        }

        return pages
    }

    return (
        <div className="flex items-center justify-center gap-1 mt-8">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${currentPage === 1
                        ? "text-zinc-700 cursor-not-allowed"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                    }`}
            >
                <span className="material-symbols-outlined">
                    chevron_left
                </span>
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${currentPage === totalPages
                        ? "text-zinc-700 cursor-not-allowed"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                    }`}
            >
                <span className="material-symbols-outlined">
                    chevron_right
                </span>
            </button>
        </div>
    )
}
