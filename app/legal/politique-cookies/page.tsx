import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de cookies - TypeFlick',
  description: 'Politique de gestion des cookies et traceurs de TypeFlick, conforme aux exigences de la CNIL',
}

export default function PolitiqueCookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Politique de cookies</h1>
      
      <div className="prose prose-gray max-w-none">
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-sm text-blue-800 mb-0">
            Cette politique explique comment TypeFlick utilise les cookies et autres traceurs sur son site web, 
            conformément à la réglementation française et européenne en vigueur.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Qu'est-ce qu'un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) 
            lors de la visite d'un site web. Il permet au site de reconnaître votre navigateur et de conserver 
            certaines informations sur vos préférences ou actions.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">1.1 Types de cookies</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Cookies de session</h4>
              <p className="text-sm text-green-700">
                Temporaires, supprimés à la fermeture du navigateur
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Cookies persistants</h4>
              <p className="text-sm text-blue-700">
                Conservés pendant une durée déterminée sur votre appareil
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Cookies internes</h4>
              <p className="text-sm text-purple-700">
                Déposés directement par TypeFlick
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Cookies tiers</h4>
              <p className="text-sm text-orange-700">
                Déposés par des partenaires externes
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Cookies utilisés sur TypeFlick</h2>
          
          <h3 className="text-xl font-semibold mb-3">2.1 Cookies strictement nécessaires</h3>
          <p className="text-sm text-gray-600 italic mb-4">
            Ces cookies sont indispensables au fonctionnement du site et ne nécessitent pas votre consentement.
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Finalité</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Durée</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Éditeur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">session_token</td>
                  <td className="border border-gray-300 px-4 py-2">Authentification utilisateur</td>
                  <td className="border border-gray-300 px-4 py-2">Session</td>
                  <td className="border border-gray-300 px-4 py-2">TypeFlick</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">csrf_token</td>
                  <td className="border border-gray-300 px-4 py-2">Protection contre les attaques CSRF</td>
                  <td className="border border-gray-300 px-4 py-2">Session</td>
                  <td className="border border-gray-300 px-4 py-2">TypeFlick</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">cookie_consent</td>
                  <td className="border border-gray-300 px-4 py-2">Mémorisation de vos choix de cookies</td>
                  <td className="border border-gray-300 px-4 py-2">6 mois</td>
                  <td className="border border-gray-300 px-4 py-2">TypeFlick</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">user_preferences</td>
                  <td className="border border-gray-300 px-4 py-2">Sauvegarde des préférences utilisateur</td>
                  <td className="border border-gray-300 px-4 py-2">1 an</td>
                  <td className="border border-gray-300 px-4 py-2">TypeFlick</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3">2.2 Cookies de mesure d'audience</h3>
          <p className="text-sm text-gray-600 italic mb-4">
            Ces cookies nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Finalité</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Durée</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Éditeur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">_ga</td>
                  <td className="border border-gray-300 px-4 py-2">Identification des visiteurs uniques</td>
                  <td className="border border-gray-300 px-4 py-2">2 ans</td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">_ga_*</td>
                  <td className="border border-gray-300 px-4 py-2">Collecte de données d'usage</td>
                  <td className="border border-gray-300 px-4 py-2">2 ans</td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">_gid</td>
                  <td className="border border-gray-300 px-4 py-2">Identification des sessions</td>
                  <td className="border border-gray-300 px-4 py-2">24 heures</td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3">2.3 Cookies de réseaux sociaux</h3>
          <p className="text-sm text-gray-600 italic mb-4">
            Ces cookies permettent le partage de contenu sur les réseaux sociaux.
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Réseau social</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Finalité</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Durée</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Politique</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">YouTube</td>
                  <td className="border border-gray-300 px-4 py-2">Intégration de vidéos</td>
                  <td className="border border-gray-300 px-4 py-2">Variable</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline text-sm">
                      Voir la politique
                    </a>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Twitter/X</td>
                  <td className="border border-gray-300 px-4 py-2">Boutons de partage</td>
                  <td className="border border-gray-300 px-4 py-2">Variable</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href="https://twitter.com/privacy" className="text-blue-600 hover:underline text-sm">
                      Voir la politique
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Instagram</td>
                  <td className="border border-gray-300 px-4 py-2">Intégration de contenu</td>
                  <td className="border border-gray-300 px-4 py-2">Variable</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href="https://help.instagram.com/519522125107875" className="text-blue-600 hover:underline text-sm">
                      Voir la politique
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3">2.4 Cookies de personnalisation</h3>
          <p className="text-sm text-gray-600 italic mb-4">
            Ces cookies améliorent votre expérience en personnalisant le contenu.
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Finalité</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Durée</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Éditeur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">theme_preference</td>
                  <td className="border border-gray-300 px-4 py-2">Mémorisation du thème (clair/sombre)</td>
                  <td className="border border-gray-300 px-4 py-2">1 an</td>
                  <td className="border border-gray-300 px-4 py-2">TypeFlick</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">language_preference</td>
                  <td className="border border-gray-300 px-4 py-2">Mémorisation de la langue choisie</td>
                  <td className="border border-gray-300 px-4 py-2">1 an</td>
                  <td className="border border-gray-300 px-4 py-2">TypeFlick</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">recent_templates</td>
                  <td className="border border-gray-300 px-4 py-2">Affichage des templates récents</td>
                  <td className="border border-gray-300 px-4 py-2">30 jours</td>
                  <td className="border border-gray-300 px-4 py-2">TypeFlick</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Gestion de vos préférences</h2>
          
          <h3 className="text-xl font-semibold mb-3">3.1 Paramétrage de votre navigateur</h3>
          <p>
            Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies. 
            Voici les liens pour les navigateurs les plus courants :
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Chrome</h4>
              <a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline text-sm">
                Gérer les cookies dans Chrome
              </a>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Firefox</h4>
              <a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies-preferences" className="text-blue-600 hover:underline text-sm">
                Gérer les cookies dans Firefox
              </a>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Safari</h4>
              <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" className="text-blue-600 hover:underline text-sm">
                Gérer les cookies dans Safari
              </a>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Edge</h4>
              <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline text-sm">
                Gérer les cookies dans Edge
              </a>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Centre de préférences TypeFlick</h3>
          <p>
            Vous pouvez également gérer vos préférences de cookies directement sur notre site 
            via le centre de préférences accessible en bas de page ou en cliquant sur le bouton ci-dessous :
          </p>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Gérer mes préférences de cookies
            </button>
            <p className="text-sm text-blue-700 mt-2">
              Ce bouton ouvrira le centre de préférences où vous pourrez activer/désactiver chaque catégorie de cookies.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Conséquences du refus des cookies</h3>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important</h4>
            <p className="text-sm text-yellow-700">
              Le refus de certains cookies peut limiter les fonctionnalités du site :
            </p>
            <ul className="list-disc pl-4 mt-2 text-sm text-yellow-700">
              <li>Perte des préférences personnalisées</li>
              <li>Nécessité de se reconnecter à chaque visite</li>
              <li>Fonctionnalités de partage social indisponibles</li>
              <li>Statistiques d'usage non collectées</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Durée de conservation</h2>
          <p>
            La durée de conservation des cookies varie selon leur type et leur finalité :
          </p>
          
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type de cookie</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Durée maximale</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Justification</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Cookies de session</td>
                  <td className="border border-gray-300 px-4 py-2">Fermeture du navigateur</td>
                  <td className="border border-gray-300 px-4 py-2">Sécurité et fonctionnement</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Cookies de préférences</td>
                  <td className="border border-gray-300 px-4 py-2">1 an</td>
                  <td className="border border-gray-300 px-4 py-2">Expérience utilisateur</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Cookies d'analyse</td>
                  <td className="border border-gray-300 px-4 py-2">2 ans</td>
                  <td className="border border-gray-300 px-4 py-2">Amélioration du service</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Consentement cookies</td>
                  <td className="border border-gray-300 px-4 py-2">6 mois</td>
                  <td className="border border-gray-300 px-4 py-2">Recommandation CNIL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Cookies et données personnelles</h2>
          <p>
            Certains cookies peuvent contenir des données personnelles. Dans ce cas, leur traitement est soumis 
            à notre <a href="/legal/politique-confidentialite" className="text-blue-600 hover:underline">Politique de confidentialité</a> 
            et au Règlement Général sur la Protection des Données (RGPD).
          </p>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Vos droits</h3>
          <p>Concernant les données personnelles contenues dans les cookies, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Droit d'accès aux données vous concernant</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l'effacement des données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit d'opposition au traitement</li>
            <li>Droit à la portabilité des données</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Exercice de vos droits</h3>
          <p>
            Pour exercer ces droits, contactez-nous à l'adresse : [À COMPLÉTER - Email de contact]
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cookies et transferts internationaux</h2>
          <p>
            Certains cookies peuvent entraîner des transferts de données vers des pays situés en dehors de l'Union européenne. 
            Ces transferts sont encadrés par des garanties appropriées :
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Google Analytics</h4>
              <p className="text-sm text-green-700">
                Transfert vers les États-Unis encadré par les clauses contractuelles types de la Commission européenne.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Réseaux sociaux</h4>
              <p className="text-sm text-blue-700">
                Les transferts sont régis par les politiques de confidentialité respectives de chaque plateforme.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Évolution de cette politique</h2>
          <p>
            Cette politique de cookies peut être modifiée pour refléter les changements dans nos pratiques 
            ou pour des raisons opérationnelles, légales ou réglementaires.
          </p>
          <p>
            Toute modification importante vous sera notifiée par une bannière sur le site ou par email. 
            Nous vous encourageons à consulter régulièrement cette page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact et réclamations</h2>
          
          <h3 className="text-xl font-semibold mb-3">8.1 Nous contacter</h3>
          <p>
            Pour toute question concernant cette politique de cookies :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>Email :</strong> [À COMPLÉTER - Email de contact]</p>
            <p><strong>Adresse :</strong> [À COMPLÉTER - Adresse postale]</p>
            <p><strong>Téléphone :</strong> [À COMPLÉTER - Numéro de téléphone]</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Réclamations</h3>
          <p>
            Si vous estimez que l'utilisation des cookies ne respecte pas la réglementation, 
            vous pouvez adresser une réclamation à la CNIL :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>CNIL</strong></p>
            <p>3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07</p>
            <p>Téléphone : 01 53 73 22 22</p>
            <p>Site web : <a href="https://www.cnil.fr" className="text-blue-600 hover:underline">https://www.cnil.fr</a></p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Ressources utiles</h2>
          <p>
            Pour en savoir plus sur les cookies et vos droits :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi" className="text-blue-600 hover:underline">
                CNIL - Que dit la loi sur les cookies ?
              </a>
            </li>
            <li>
              <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies" className="text-blue-600 hover:underline">
                CNIL - Les règles à suivre pour les cookies
              </a>
            </li>
            <li>
              <a href="https://europa.eu/youreurope/citizens/consumers/internet-telecoms/data-protection-online-privacy/index_fr.htm" className="text-blue-600 hover:underline">
                Commission européenne - Protection des données en ligne
              </a>
            </li>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          <p className="mt-2">
            Cette politique de cookies est conforme à la directive ePrivacy et au RGPD.
          </p>
        </div>
      </div>
    </div>
  )
}

