'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './button'
import { X, Settings, Cookie } from 'lucide-react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Toujours activé
    analytics: false,
    marketing: false,
    personalization: false
  })

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieConsent = localStorage.getItem('cookie_consent')
    if (!cookieConsent) {
      setShowBanner(true)
    } else {
      // Charger les préférences sauvegardées
      try {
        const savedPreferences = JSON.parse(cookieConsent)
        setPreferences(savedPreferences)
      } catch (error) {
        console.error('Erreur lors du chargement des préférences cookies:', error)
        setShowBanner(true)
      }
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie_consent', JSON.stringify(prefs))
    localStorage.setItem('cookie_consent_date', new Date().toISOString())
    
    // Ici, vous pourriez ajouter la logique pour activer/désactiver les cookies
    // selon les préférences de l'utilisateur
    
    setPreferences(prefs)
    setShowBanner(false)
    setShowPreferences(false)
  }

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    }
    savePreferences(allAccepted)
  }

  const acceptNecessaryOnly = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    }
    savePreferences(necessaryOnly)
  }

  const handlePreferenceChange = (type: keyof CookiePreferences, value: boolean) => {
    if (type === 'necessary') return // Les cookies nécessaires ne peuvent pas être désactivés
    
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const saveCustomPreferences = () => {
    savePreferences(preferences)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      {/* Bannière principale */}
      {!showPreferences && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Cookie className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nous utilisons des cookies
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Nous utilisons des cookies pour améliorer votre expérience sur notre site, 
                    analyser le trafic et personnaliser le contenu. Vous pouvez choisir quels cookies accepter.
                  </p>
                  <p className="text-xs text-gray-500">
                    En continuant à naviguer, vous acceptez notre utilisation des cookies nécessaires. 
                    Consultez notre{' '}
                    <Link href="/legal/politique-cookies" className="text-blue-600 hover:underline">
                      Politique de cookies
                    </Link>
                    {' '}pour plus d'informations.
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setShowBanner(false)}
                className="text-gray-400 hover:text-gray-600 ml-4"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                onClick={acceptAll}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                Accepter tous les cookies
              </Button>
              
              <Button
                onClick={acceptNecessaryOnly}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
              >
                Cookies nécessaires uniquement
              </Button>
              
              <Button
                onClick={() => setShowPreferences(true)}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Personnaliser
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Centre de préférences */}
      {showPreferences && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Centre de préférences des cookies
                </h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Gérez vos préférences de cookies. Vous pouvez activer ou désactiver différents types 
                de cookies selon vos préférences.
              </p>

              <div className="space-y-6">
                {/* Cookies nécessaires */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Cookies nécessaires</h3>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Toujours activé
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés. 
                    Ils incluent l'authentification, la sécurité et les préférences de base.
                  </p>
                </div>

                {/* Cookies d'analyse */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Cookies d'analyse</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ces cookies nous aident à comprendre comment vous utilisez notre site pour l'améliorer. 
                    Ils collectent des informations anonymes sur les pages visitées et les interactions.
                  </p>
                </div>

                {/* Cookies de personnalisation */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Cookies de personnalisation</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.personalization}
                        onChange={(e) => handlePreferenceChange('personalization', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ces cookies permettent de mémoriser vos préférences (thème, langue) et de personnaliser 
                    votre expérience sur le site.
                  </p>
                </div>

                {/* Cookies marketing */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Cookies marketing</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ces cookies sont utilisés pour afficher des publicités pertinentes et mesurer l'efficacité 
                    de nos campagnes marketing.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button
                  onClick={saveCustomPreferences}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  Sauvegarder mes préférences
                </Button>
                
                <Button
                  onClick={acceptAll}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
                >
                  Accepter tout
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Vous pouvez modifier vos préférences à tout moment en cliquant sur "Gérer les cookies" 
                  en bas de page. Pour plus d'informations, consultez notre{' '}
                  <Link href="/legal/politique-cookies" className="text-blue-600 hover:underline">
                    Politique de cookies
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Hook pour accéder aux préférences de cookies depuis d'autres composants
export function useCookiePreferences(): CookiePreferences | null {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie_consent')
    if (cookieConsent) {
      try {
        setPreferences(JSON.parse(cookieConsent))
      } catch (error) {
        console.error('Erreur lors du chargement des préférences cookies:', error)
      }
    }
  }, [])

  return preferences
}

// Fonction utilitaire pour ouvrir le centre de préférences
export function openCookiePreferences() {
  // Cette fonction peut être appelée depuis le footer ou d'autres composants
  const event = new CustomEvent('openCookiePreferences')
  window.dispatchEvent(event)
}

