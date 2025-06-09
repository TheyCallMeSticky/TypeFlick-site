'use client'
import { useState, useRef } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import ProgressCell from './ProgressCell'
import { Trash, PlayIcon, PauseIcon, EyeIcon } from 'lucide-react'
import { mutate } from 'swr'

const fetcher = (u: string) => fetch(u).then((r) => r.json())

type Row = {
  id: number
  beatName: string
  status: 'pending' | 'processing' | 'done' | 'failed'
  createdAt: string
  imageFilename: string
  audioFilename: string
  progress: number
}

export default function VideoTable() {
  const { data, error, isLoading } = useSWR<Row[]>('/api/videos/list?offset=0&limit=50', fetcher, {
    refreshInterval: 5000
  })

  /* petit lecteur audio ---------------------------------------------------------------- */
  const [current, setCurrent] = useState<number | null>(null)
  const ref = useRef<HTMLAudioElement>(null)

  const togglePlay = (row: Row) => {
    if (current === row.id) {
      ref.current?.pause()
      setCurrent(null)
    } else {
      if (ref.current) {
        ref.current.src = `/files/audio/${row.audioFilename}`
        ref.current.volume = 0.25
        ref.current.play()
      }
      setCurrent(row.id)
    }
  }

  if (isLoading) return <p>Loading…</p>
  if (error) return <p className="text-red-600">Error loading videos</p>

  return (
    <>
      <audio hidden ref={ref} />
      <table className="w-full text-sm">
        <thead className="text-left border-b border-gray-600 text-text-100">
          <tr>
            <th className="py-2">Cover</th>
            <th>Audio</th>
            <th>Beat</th>
            <th>Status</th>
            <th>Progress</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {data!.map((row) => (
            <tr key={row.id} className="border-b last:border-0 border-gray-600">
              {/* miniature ------------------------------------------------------------ */}
              <td>
                <div className="flex items-center gap-3 py-2">
                  <Image
                    src={`/files/images/${row.imageFilename}`}
                    alt={row.beatName}
                    width={64}
                    height={64}
                    className="rounded"
                  />
                </div>
              </td>
              <td>
                <button
                  onClick={() => togglePlay(row)}
                  className="w-10 h-10 rounded-full border border-bg-300 bg-white text-gray-900 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                >
                  {current === row.id ? (
                    <PauseIcon className="w-5 h-5" />
                  ) : (
                    <PlayIcon className="w-5 h-5" />
                  )}
                </button>
              </td>

              {/* infos --------------------------------------------------------------- */}
              <td>
                <div className="flex gap-3 py-2">
                  <Link href={`/dashboard/videos/${row.id}`} className="font-style-bold">
                    {row.beatName}
                  </Link>
                </div>
              </td>
              <td className="capitalize">
                <div className="flex gap-3 py-2">{row.status}</div>
              </td>
              <td>
                <ProgressCell value={row.progress} />
              </td>

              {/* actions ------------------------------------------------------------- */}
              <td>
                <div className="flex items-center gap-3 py-2 self-center align-middle justify-end">
                  {/* view details */}
                  <Link href={`/dashboard/videos/${row.id}`}>
                    <EyeIcon className="w-5 h-5"></EyeIcon>
                  </Link>

                  {/* delete (appel API + refresh SWR) */}
                  <button
                    onClick={async () => {
                      if (!confirm('Delete this video?')) return
                      await fetch(`/api/videos/${row.id}`, { method: 'DELETE' })
                      await mutate('/api/videos/list?offset=0&limit=50')
                    }}
                    className="text-danger"
                  >
                    <Trash className="w-5 h-5"></Trash>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
