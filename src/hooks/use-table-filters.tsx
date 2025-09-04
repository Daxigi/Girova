"use client"

import { useState, useMemo } from "react"

export interface FilterState {
  search: string
  status?: string
  dateFrom?: string
  dateTo?: string
  priceMin?: number
  priceMax?: number
}

export function useTableFilters<T>(data: T[], filterFn: (item: T, filters: FilterState) => boolean) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    priceMin: undefined,
    priceMax: undefined,
  })

  const filteredData = useMemo(() => {
    return data.filter((item) => filterFn(item, filters))
  }, [data, filters, filterFn])

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      dateFrom: "",
      dateTo: "",
      priceMin: undefined,
      priceMax: undefined,
    })
  }

  return {
    filters,
    filteredData,
    updateFilter,
    clearFilters,
  }
}
