// components/wizard/StepAssets.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FileDropZone } from '@/components/ui/file-dropzone'

const Req = () => (
  <span aria-hidden className="text-red-600">
    *
  </span>
)

interface StepAssetsProps {
  control: any
  errors: any
  setValue: any
  watch: any
}

export function StepAssets({ errors, setValue, watch }: StepAssetsProps) {
  const audioFile = watch('audioFile')
  const imageFile = watch('imageFile')

  return (
    <Card className="bg-bg-200 border-bg-300">
      <CardHeader>
        <h3 className="text-lg font-semibold text-text-100">Upload Assets</h3>
        <p className="text-sm text-text-200">Upload your audio file and cover image</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-100 mb-3">
            Audio File <Req />
          </label>
          <FileDropZone
            type="audio"
            accept="audio/*"
            maxSize={50 * 1024 * 1024} // 50MB
            currentFile={audioFile}
            onFileSelect={(file) => setValue('audioFile', file)}
          />
          {errors.audioFile && (
            <p className="text-red-500 text-sm mt-2">{errors.audioFile.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-100 mb-3">
            Cover Image <Req />
          </label>
          <FileDropZone
            type="image"
            accept="image/*"
            maxSize={10 * 1024 * 1024} // 10MB
            currentFile={imageFile}
            onFileSelect={(file) => setValue('imageFile', file)}
          />
          {errors.imageFile && (
            <p className="text-red-500 text-sm mt-2">{errors.imageFile.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
