"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useOngsManagement } from "@/hooks/use-ongs-management"
import {
  SearchAndFilter,
  OngsTable,
  LoadingState,
  EmptyState,
} from "./subComponents"

export default function ONGsPage() {
  const {
    ongs,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSearch,
    handleStatusChange,
    handleDelete,
  } = useOngsManagement()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight dark:text-gray-100">Gerenciar ONGs</h1>

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        handleSearch={handleSearch}
      />

      <Card className="dark:border-gray-800 dark:bg-gray-950">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl dark:text-gray-100">Lista de ONGs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingState />
          ) : ongs.length === 0 ? (
            <EmptyState />
          ) : (
            <OngsTable
              ongs={ongs}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
