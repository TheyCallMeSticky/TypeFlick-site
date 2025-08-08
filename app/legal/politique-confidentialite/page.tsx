import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité - TypeFlick',
  description: 'Politique de confidentialité et protection des données personnelles de TypeFlick, conforme au RGPD',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>
      
      <div className="prose prose-gray max-w-none">
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-sm text-blue-800 mb-0">
            Cette politique de confidentialité décrit comment TypeFlick collecte, utilise et protège vos données personnelles 
            conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi française.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Responsable du traitement</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Responsable du traitement :</strong> [À COMPLÉTER - Nom de la société]</p>
            <p><strong>Adresse :</strong> [À COMPLÉTER - Adresse complète]</p>
            <p><strong>Email :</strong> [À COMPLÉTER - Email de contact]</p>
            <p><strong>Téléphone :</strong> [À COMPLÉTER - Numéro de téléphone]</p>
          </div>
          <p className="mt-4">
            Si vous avez des questions concernant cette politique de confidentialité ou le traitement de vos données personnelles, 
            vous pouvez nous contacter à l'adresse email indiquée ci-dessus.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Données personnelles collectées</h2>
          
          <h3 className="text-xl font-semibold mb-3">2.1 Données collectées lors de l'inscription</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Nom et prénom :</strong> pour personnaliser votre expérience et vous identifier</li>
            <li><strong>Adresse email :</strong> pour la création de votre compte, l'authentification et les communications</li>
            <li><strong>Mot de passe :</strong> pour sécuriser l'accès à votre compte (stocké de manière chiffrée)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.2 Données collectées lors de l'utilisation du service</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Données de création vidéo :</strong> nom du beatmaker, nom du beat, type de beat, liens d'achat</li>
            <li><strong>Fichiers uploadés :</strong> fichiers audio et images utilisés pour créer vos vidéos</li>
            <li><strong>Préférences de publication :</strong> plateformes cibles (YouTube, TikTok, Instagram, X)</li>
            <li><strong>Métadonnées des vidéos :</strong> titres, descriptions, hashtags pour chaque plateforme</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.3 Données techniques</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Adresse IP :</strong> pour la sécurité et la géolocalisation approximative</li>
            <li><strong>Données de navigation :</strong> pages visitées, durée de session, actions effectuées</li>
            <li><strong>Informations sur l'appareil :</strong> type de navigateur, système d'exploitation, résolution d'écran</li>
            <li><strong>Cookies et traceurs :</strong> voir notre <a href="/legal/politique-cookies" className="text-blue-600 hover:underline">Politique de cookies</a></li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.4 Données de paiement</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Informations de facturation :</strong> nom, adresse de facturation</li>
            <li><strong>Données de transaction :</strong> montant, date, statut du paiement</li>
            <li><strong>Identifiant Stripe :</strong> pour la gestion des abonnements et paiements</li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            Note : Les données de carte bancaire sont traitées directement par notre prestataire de paiement Stripe et ne sont jamais stockées sur nos serveurs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Finalités du traitement</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Finalité</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Base légale</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Données concernées</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Création et gestion de votre compte</td>
                  <td className="border border-gray-300 px-4 py-2">Exécution du contrat</td>
                  <td className="border border-gray-300 px-4 py-2">Nom, email, mot de passe</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Fourniture du service de création vidéo</td>
                  <td className="border border-gray-300 px-4 py-2">Exécution du contrat</td>
                  <td className="border border-gray-300 px-4 py-2">Toutes données de création</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Gestion des paiements et abonnements</td>
                  <td className="border border-gray-300 px-4 py-2">Exécution du contrat</td>
                  <td className="border border-gray-300 px-4 py-2">Données de facturation, Stripe ID</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Support client et assistance</td>
                  <td className="border border-gray-300 px-4 py-2">Intérêt légitime</td>
                  <td className="border border-gray-300 px-4 py-2">Données de contact, historique</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Amélioration du service</td>
                  <td className="border border-gray-300 px-4 py-2">Intérêt légitime</td>
                  <td className="border border-gray-300 px-4 py-2">Données d'usage anonymisées</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Communications marketing</td>
                  <td className="border border-gray-300 px-4 py-2">Consentement</td>
                  <td className="border border-gray-300 px-4 py-2">Email, préférences</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Sécurité et prévention des fraudes</td>
                  <td className="border border-gray-300 px-4 py-2">Intérêt légitime</td>
                  <td className="border border-gray-300 px-4 py-2">IP, données de navigation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Destinataires des données</h2>
          
          <h3 className="text-xl font-semibold mb-3">4.1 Destinataires internes</h3>
          <p>
            Vos données personnelles sont accessibles aux membres de notre équipe qui en ont besoin pour l'exécution de leurs missions, 
            notamment les équipes techniques, support client et administration.
          </p>

          <h3 className="text-xl font-semibold mb-3">4.2 Prestataires externes</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Vercel :</strong> hébergement de l'application et des données</li>
            <li><strong>Stripe :</strong> traitement des paiements et gestion des abonnements</li>
            <li><strong>Services de stockage cloud :</strong> stockage sécurisé des fichiers vidéo et audio</li>
            <li><strong>Services d'analyse :</strong> mesure d'audience et amélioration du service</li>
          </ul>
          <p>
            Tous nos prestataires sont sélectionnés avec soin et s'engagent contractuellement à respecter la confidentialité 
            et la sécurité de vos données personnelles.
          </p>

          <h3 className="text-xl font-semibold mb-3">4.3 Autorités publiques</h3>
          <p>
            Nous pouvons être amenés à communiquer vos données personnelles aux autorités publiques compétentes, 
            uniquement dans les cas prévus par la loi ou sur demande judiciaire.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Transferts internationaux</h2>
          <p>
            Certains de nos prestataires peuvent être situés en dehors de l'Union européenne. Dans ce cas, 
            nous nous assurons que des garanties appropriées sont mises en place pour protéger vos données :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Décisions d'adéquation de la Commission européenne</li>
            <li>Clauses contractuelles types approuvées par la Commission européenne</li>
            <li>Certifications et codes de conduite appropriés</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Durée de conservation</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type de données</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Durée de conservation</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Justification</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Données de compte actif</td>
                  <td className="border border-gray-300 px-4 py-2">Durée de la relation contractuelle</td>
                  <td className="border border-gray-300 px-4 py-2">Exécution du contrat</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Données de compte supprimé</td>
                  <td className="border border-gray-300 px-4 py-2">30 jours après suppression</td>
                  <td className="border border-gray-300 px-4 py-2">Possibilité de récupération</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Données de facturation</td>
                  <td className="border border-gray-300 px-4 py-2">10 ans</td>
                  <td className="border border-gray-300 px-4 py-2">Obligations comptables et fiscales</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Logs de sécurité</td>
                  <td className="border border-gray-300 px-4 py-2">1 an</td>
                  <td className="border border-gray-300 px-4 py-2">Sécurité et prévention des fraudes</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Données marketing</td>
                  <td className="border border-gray-300 px-4 py-2">3 ans après dernier contact</td>
                  <td className="border border-gray-300 px-4 py-2">Prospection commerciale</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Droit d'accès</h4>
              <p className="text-sm text-blue-700">
                Vous pouvez demander l'accès aux données personnelles que nous détenons sur vous.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Droit de rectification</h4>
              <p className="text-sm text-green-700">
                Vous pouvez demander la correction de données inexactes ou incomplètes.
              </p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Droit à l'effacement</h4>
              <p className="text-sm text-red-700">
                Vous pouvez demander la suppression de vos données dans certaines conditions.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Droit à la limitation</h4>
              <p className="text-sm text-yellow-700">
                Vous pouvez demander la limitation du traitement de vos données.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Droit à la portabilité</h4>
              <p className="text-sm text-purple-700">
                Vous pouvez récupérer vos données dans un format structuré et lisible.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Droit d'opposition</h4>
              <p className="text-sm text-gray-700">
                Vous pouvez vous opposer au traitement de vos données pour des raisons légitimes.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Comment exercer vos droits ?</h4>
            <p className="text-sm text-orange-700">
              Pour exercer vos droits, contactez-nous à l'adresse : [À COMPLÉTER - Email de contact]<br/>
              Nous vous répondrons dans un délai maximum d'un mois à compter de la réception de votre demande.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Chiffrement :</strong> Toutes les données sont chiffrées en transit (HTTPS) et au repos</li>
            <li><strong>Authentification :</strong> Accès sécurisé par mot de passe et authentification à deux facteurs</li>
            <li><strong>Contrôle d'accès :</strong> Accès limité aux seules personnes autorisées</li>
            <li><strong>Surveillance :</strong> Monitoring continu des accès et des activités suspectes</li>
            <li><strong>Sauvegardes :</strong> Sauvegardes régulières et sécurisées de vos données</li>
            <li><strong>Formation :</strong> Formation régulière de nos équipes aux bonnes pratiques de sécurité</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Cookies et traceurs</h2>
          <p>
            Notre site utilise des cookies et autres traceurs pour améliorer votre expérience utilisateur et analyser l'utilisation du site. 
            Pour plus d'informations, consultez notre <a href="/legal/politique-cookies" className="text-blue-600 hover:underline">Politique de cookies</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Modifications de cette politique</h2>
          <p>
            Nous pouvons être amenés à modifier cette politique de confidentialité pour refléter les changements dans nos pratiques 
            ou pour des raisons opérationnelles, légales ou réglementaires.
          </p>
          <p>
            Toute modification importante vous sera notifiée par email ou par un avis visible sur notre site. 
            Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Réclamations</h2>
          <p>
            Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, 
            vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>CNIL (Commission Nationale de l'Informatique et des Libertés)</strong></p>
            <p>3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07</p>
            <p>Téléphone : 01 53 73 22 22</p>
            <p>Site web : <a href="https://www.cnil.fr" className="text-blue-600 hover:underline">https://www.cnil.fr</a></p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, 
            vous pouvez nous contacter :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>Email :</strong> [À COMPLÉTER - Email de contact]</p>
            <p><strong>Adresse :</strong> [À COMPLÉTER - Adresse postale]</p>
            <p><strong>Téléphone :</strong> [À COMPLÉTER - Numéro de téléphone]</p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          <p className="mt-2">Cette politique de confidentialité est conforme au Règlement Général sur la Protection des Données (RGPD) 2016/679.</p>
        </div>
      </div>
    </div>
  )
}

