import * as React from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpDown, ArrowUp, ArrowDown, Search, ChevronLeft, ChevronRight } from 'lucide-react'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  priority?: boolean // shown on mobile
  render?: (value: unknown, row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  loading?: boolean
  emptyMessage?: string
  emptyIcon?: string
  searchable?: boolean
  searchPlaceholder?: string
  pageSize?: number
}

type SortDir = 'asc' | 'desc' | null

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  loading = false,
  emptyMessage = 'No data found',
  emptyIcon = '📭',
  searchable = true,
  searchPlaceholder = 'Search...',
  pageSize = 10,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState('')
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDir>(null)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize)

  // Filter
  const filtered = React.useMemo(() => {
    if (!search) return data
    const s = search.toLowerCase()
    return data.filter(row =>
      columns.some(col => {
        const val = row[col.key]
        return val != null && String(val).toLowerCase().includes(s)
      })
    )
  }, [data, search, columns])

  // Sort
  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av == null) return 1
      if (bv == null) return -1
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  // Paginate
  const totalPages = Math.ceil(sorted.length / rowsPerPage)
  const paginated = sorted.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  React.useEffect(() => { setPage(0) }, [search, sortKey, sortDir, rowsPerPage])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc')
      if (sortDir === 'desc') setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const priorityCols = columns.filter(c => c.priority !== false)
  const extraCols = columns.filter(c => c.priority === false)

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {searchable && (
          <div className="p-4 border-b border-slate-100">
            <div className="h-10 bg-slate-100 rounded-lg skeleton-shimmer w-72" />
          </div>
        )}
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded-full w-1/2 skeleton-shimmer" />
                <div className="h-3 bg-slate-100 rounded-full w-3/4 skeleton-shimmer" />
              </div>
              <div className="h-6 w-16 bg-slate-100 rounded-full skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (sorted.length === 0 && !search) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
        <div className="text-5xl mb-4">{emptyIcon}</div>
        <p className="text-charcoal text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
      {/* Search + row count */}
      {searchable && (
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta bg-white"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{sorted.length} results</span>
            <select
              value={rowsPerPage}
              onChange={e => setRowsPerPage(Number(e.target.value))}
              className="border border-slate-200 rounded px-2 py-1 text-xs bg-white min-h-0"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider',
                    col.sortable !== false && 'cursor-pointer select-none hover:text-ink transition-colors',
                    col.className,
                  )}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable !== false && (
                      sortKey === col.key ? (
                        sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-40" />
                      )
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((row, i) => (
              <tr
                key={i}
                className={cn(
                  'transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-cream/50',
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map(col => (
                  <td key={col.key} className={cn('px-4 py-3.5 text-sm text-charcoal', col.className)}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-slate-100">
        {paginated.map((row, i) => (
          <div
            key={i}
            className={cn('p-4 space-y-2', onRowClick && 'cursor-pointer active:bg-cream/50')}
            onClick={() => onRowClick?.(row)}
          >
            {priorityCols.map(col => (
              <div key={col.key} className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500 uppercase">{col.label}</span>
                <span className="text-sm text-ink font-medium">
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '-')}
                </span>
              </div>
            ))}
            {extraCols.length > 0 && (
              <details className="group">
                <summary className="text-xs text-terracotta cursor-pointer hover:underline list-none flex items-center gap-1 mt-1">
                  Show more ›
                </summary>
                <div className="mt-2 space-y-2 pt-2 border-t border-slate-100">
                  {extraCols.map(col => (
                    <div key={col.key} className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-500">{col.label}</span>
                      <span className="text-sm text-charcoal">
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '-')}
                      </span>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-0"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* No search results */}
      {sorted.length === 0 && search && (
        <div className="p-8 text-center">
          <p className="text-sm text-slate-500">No results for "{search}"</p>
        </div>
      )}
    </div>
  )
}
