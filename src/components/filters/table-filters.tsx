"use client"

import type React from "react"

import { Search, X, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TableFiltersProps {
  searchValue: string
  onSearchChange: (value: string) => void
  onClearFilters: () => void
  children?: React.ReactNode
  activeFiltersCount?: number
}

export function TableFilters({
  searchValue,
  onSearchChange,
  onClearFilters,
  children,
  activeFiltersCount = 0,
}: TableFiltersProps) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-4 pb-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={onClearFilters} className="flex items-center gap-2 bg-transparent">
              <X className="w-4 h-4" />
              Limpiar Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
          {children && (
            <div className="flex items-center gap-4 pt-2 border-t">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex flex-wrap items-center gap-4">{children}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface StatusFilterProps {
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
}

export function StatusFilter({ value, onValueChange, options, placeholder = "Estado" }: StatusFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface PriceRangeFilterProps {
  minValue?: number
  maxValue?: number
  onMinChange: (value: number | undefined) => void
  onMaxChange: (value: number | undefined) => void
}

export function PriceRangeFilter({ minValue, maxValue, onMinChange, onMaxChange }: PriceRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Precio:</span>
      <Input
        type="number"
        placeholder="Min"
        value={minValue || ""}
        onChange={(e) => onMinChange(e.target.value ? Number(e.target.value) : undefined)}
        className="w-20"
      />
      <span className="text-gray-400">-</span>
      <Input
        type="number"
        placeholder="Max"
        value={maxValue || ""}
        onChange={(e) => onMaxChange(e.target.value ? Number(e.target.value) : undefined)}
        className="w-20"
      />
    </div>
  )
}

interface DateRangeFilterProps {
  fromValue: string
  toValue: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
  label?: string
}

export function DateRangeFilter({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  label = "Fecha",
}: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">{label}:</span>
      <Input type="date" value={fromValue} onChange={(e) => onFromChange(e.target.value)} className="w-36" />
      <span className="text-gray-400">-</span>
      <Input type="date" value={toValue} onChange={(e) => onToChange(e.target.value)} className="w-36" />
    </div>
  )
}
