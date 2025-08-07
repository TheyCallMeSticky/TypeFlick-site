import { Button } from '@/components/ui/button'
import { TypeFlickLogoBottomText } from '@/components/ui/logo'
import { ArrowRight, MusicIcon, PaletteIcon, VideoIcon } from 'lucide-react'

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mx-auto max-w-4xl">
            <div className="flex justify-center">
              <TypeFlickLogoBottomText className="h-90" />
            </div>
            <h1 className="mt-10 text-4xl font-bold text-accent-200 tracking-tight sm:text-5xl md:text-6xl ">
              Bring Your Beats to Life
              <span className="block text-primary-100">In Just a Few Clicks</span>
            </h1>
            <p className="mt-10 text-base text-gray-400 sm:mt-10 sm:text-xl lg:text-lg xl:text-xl">
              TypeFlick turns your beats into dynamic videos, ready for YouTube, TikTok, and
              Instagram — automatically. Choose your style, upload your artwork and sound, and let
              the visuals sync to your vibe. Boost your visibility with auto-generated titles,
              descriptions, and SEO-friendly content.
            </p>
            <div className="mt-10 mx-auto text-center">
              <a href="https://vercel.com/templates/next.js/next-js-saas-starter" target="_blank">
                <Button size="lg" variant="outline" className="text-lg rounded-full">
                  Try TypeFlick Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-300 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-white">
                <MusicIcon className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">Upload Your Beat & Artwork</h2>
                <p className="mt-2 text-base text-gray-700">
                  Drop your audio file and visual — we take care of the rest.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-white">
                <PaletteIcon className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">Pick Your Style</h2>
                <p className="mt-2 text-base text-gray-700">
                  Choose from stunning templates designed to match your music's vibe.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-white">
                <VideoIcon className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">Get Your Video & SEO</h2>
                <p className="mt-2 text-base text-gray-700">
                  Instantly receive a video ready to post, with optimized title, description, and
                  hashtags.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-100 sm:text-4xl">
                Ready to share your sound with the world?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-400">
                TypeFlick gives beatmakers the power to stand out — visually and musically.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a href="https://github.com/nextjs/saas-starter" target="_blank">
                <Button size="lg" variant="outline" className="text-lg rounded-full">
                  Start Creating Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
