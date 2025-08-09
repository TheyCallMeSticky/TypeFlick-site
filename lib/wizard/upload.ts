// lib/wizard/upload.ts

export async function uploadFile(file: File, kind: 'audio' | 'image'): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('type', kind)

  const res = await fetch('/api/upload', { method: 'POST', body: fd })
  if (!res.ok) throw new Error('Upload failed')

  const { filename } = (await res.json()) as { filename: string }
  return filename
}
