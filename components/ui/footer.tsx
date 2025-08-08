import Link from 'next/link'
import { TypeFlickLogoText } from './logo'

export function Footer() {
  const handleCookiePreferences = () => {
    // Supprimer le consentement existant pour forcer l'affichage de la bannière
    localStorage.removeItem('cookie_consent')
    localStorage.removeItem('cookie_consent_date')

    // Recharger la page pour afficher la bannière
    window.location.reload()
  }

  return (
    <footer className="bg-bg-200 border-t border-bg-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <TypeFlickLogoText className="h-8" />
            </Link>
            <p className="text-text-200 text-sm mb-4">
              Créez des vidéos musicales professionnelles en quelques clics. La solution idéale pour
              les beatmakers et producteurs.
            </p>
            <p className="text-text-300 text-xs">
              © {new Date().getFullYear()} TypeFlick. Tous droits réservés.
            </p>
          </div>

          {/* Liens produit */}
          <div>
            <h3 className="text-text-100 font-semibold mb-4">Produit</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-text-200 hover:text-text-100 text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/videos/new"
                  className="text-text-200 hover:text-text-100 text-sm transition-colors"
                >
                  Créer une vidéo
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-text-200 hover:text-text-100 text-sm transition-colors"
                >
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens légaux */}
          <div>
            <h3 className="text-text-100 font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/mentions-legales"
                  className="text-text-200 hover:text-text-100 text-sm transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/politique-confidentialite"
                  className="text-text-200 hover:text-text-100 text-sm transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/conditions-generales-utilisation"
                  className="text-text-200 hover:text-text-100 text-sm transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/conditions-generales-vente"
                  className="text-text-200 hover:text-text-100 text-sm transition-colors"
                >
                  Conditions de vente
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/politique-cookies"
                  className="text-text-200 hover:text-text-100 text-sm transition-colors"
                >
                  Politique de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation et informations supplémentaires */}
        <div className="border-t border-bg-300 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-text-300 text-xs mb-4 md:mb-0">
              <p>
                Site hébergé par Vercel Inc. - 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCookiePreferences}
                className="text-text-200 hover:text-text-100 text-xs transition-colors cursor-pointer"
              >
                Gérer les cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
