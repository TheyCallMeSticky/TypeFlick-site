// components/ui/file-dropzone.tsx
'use client'

import { useCallback, useState } from 'react'
import { Upload, File, Music, Image as ImageIcon, X, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileDropZoneProps {
  onFileSelect: (file: File | null) => void
  accept: string
  maxSize?: number // in bytes
  currentFile?: File | null
  className?: string
  children?: React.ReactNode
  type: 'audio' | 'image'
}

export function FileDropZone({
  onFileSelect,
  accept,
  maxSize = 50 * 1024 * 1024, // 50MB default
  currentFile,
  className,
  children,
  type
}: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File too large. Maximum size: ${Math.round(maxSize / 1024 / 1024)}MB`
    }

    // Basic MIME type validation
    const acceptedTypes = accept.split(',').map((t) => t.trim())
    const isValidType = acceptedTypes.some((acceptedType) => {
      if (acceptedType.endsWith('/*')) {
        return file.type.startsWith(acceptedType.slice(0, -1))
      }
      return file.type === acceptedType
    })

    if (!isValidType) {
      return `Invalid file type. Accepted: ${accept}`
    }

    return null
  }

  const handleFile = useCallback(
    (file: File | null) => {
      setError(null)

      if (!file) {
        onFileSelect(null)
        return
      }

      const validationError = validateFile(file)

      if (validationError) {
        setError(validationError)
        return
      }

      onFileSelect(file)
    },
    [onFileSelect, maxSize, accept]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFile(files[0])
      }
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFile(files[0])
      } else {
        handleFile(null)
      }
    },
    [handleFile]
  )

  const formatFileSize = (bytes: number): string => {
    if (!bytes || isNaN(bytes)) return '0 Bytes'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = () => {
    if (type === 'audio') return <Music className="w-8 h-8" />
    if (type === 'image') return <ImageIcon className="w-8 h-8" />
    return <File className="w-8 h-8" />
  }

  const removeFile = () => {
    setError(null)
    handleFile(null)
    // Reset input
    const input = document.getElementById(`file-input-${type}`) as HTMLInputElement
    if (input) {
      input.value = ''
    }
  }

  // Check if currentFile is valid (not NaN or invalid data)
  const isValidFile =
    currentFile &&
    typeof currentFile === 'object' &&
    'name' in currentFile &&
    'size' in currentFile &&
    currentFile.name &&
    typeof currentFile.size === 'number' &&
    !isNaN(currentFile.size) &&
    currentFile.size > 0

  if (isValidFile && !error) {
    return (
      <div className="border-2 border-bg-300 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary-100">{getFileIcon()}</div>
            <div>
              <p className="text-sm font-medium text-text-100">{currentFile.name}</p>
              <p className="text-xs text-text-200">{formatFileSize(currentFile.size)}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="text-text-200 hover:text-red-500 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg transition-all cursor-pointer',
          isDragOver
            ? 'border-primary-100 bg-primary-100/5'
            : error
              ? 'border-red-500 bg-red-500/5'
              : 'border-bg-300 hover:border-primary-100/50 hover:bg-bg-200/50'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById(`file-input-${type}`)?.click()}
      >
        <input
          id={`file-input-${type}`}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {children || (
          <div className="p-8 text-center">
            <div
              className={cn(
                'mx-auto mb-4 transition-colors',
                isDragOver ? 'text-primary-100' : error ? 'text-red-500' : 'text-text-200'
              )}
            >
              {error ? <AlertCircle className="w-12 h-12" /> : <Upload className="w-12 h-12" />}
            </div>

            <p className="text-text-100 font-medium mb-1">
              {isDragOver ? `Drop your ${type} file here` : `Choose ${type} file or drag & drop`}
            </p>

            <p className="text-sm text-text-200 mb-2">
              {accept} • Max {Math.round(maxSize / 1024 / 1024)}MB
            </p>

            {error && (
              <p className="text-sm text-red-500 mt-2 bg-red-500/10 px-3 py-1 rounded">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
