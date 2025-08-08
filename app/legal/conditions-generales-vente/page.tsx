import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - TypeFlick',
  description: 'Conditions générales de vente des services TypeFlick, tarifs et modalités de paiement',
}

export default function ConditionsGeneralesVentePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Conditions Générales de Vente</h1>
      
      <div className="prose prose-gray max-w-none">
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-sm text-blue-800 mb-0">
            Les présentes Conditions Générales de Vente (CGV) régissent la vente des services TypeFlick. 
            Elles complètent nos Conditions Générales d'Utilisation et s'appliquent à toute commande passée sur notre plateforme.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Définitions</h2>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Vendeur :</strong> [À COMPLÉTER - Nom de la société], société éditrice de TypeFlick</li>
            <li><strong>Client :</strong> Toute personne physique ou morale passant commande sur TypeFlick</li>
            <li><strong>Services :</strong> Les prestations proposées par TypeFlick (abonnements, crédits, fonctionnalités premium)</li>
            <li><strong>Commande :</strong> Acte par lequel le Client demande l'achat de Services</li>
            <li><strong>Contrat :</strong> Accord formé par l'acceptation de la Commande par le Vendeur</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Champ d'application</h2>
          <p>
            Les présentes CGV s'appliquent à toutes les ventes de Services réalisées par le Vendeur 
            auprès de Clients ayant passé commande sur la plateforme TypeFlick.
          </p>
          <p>
            Elles prévalent sur toutes autres conditions générales ou particulières non expressément agréées par le Vendeur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Services proposés</h2>
          
          <h3 className="text-xl font-semibold mb-3">3.1 Description des services</h3>
          <p>TypeFlick propose les services suivants :</p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Plan Gratuit</h4>
              <ul className="text-sm list-disc pl-4">
                <li>Création limitée de vidéos</li>
                <li>Templates de base</li>
                <li>Export en qualité standard</li>
                <li>Filigrane TypeFlick</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-800">Plan Premium</h4>
              <ul className="text-sm list-disc pl-4 text-blue-700">
                <li>Création illimitée de vidéos</li>
                <li>Tous les templates disponibles</li>
                <li>Export haute qualité</li>
                <li>Sans filigrane</li>
                <li>Support prioritaire</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Évolution des services</h3>
          <p>
            Le Vendeur se réserve le droit de modifier, améliorer ou supprimer tout ou partie des Services, 
            sous réserve d'en informer le Client avec un préavis raisonnable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Tarifs et modalités de paiement</h2>
          
          <h3 className="text-xl font-semibold mb-3">4.1 Tarifs</h3>
          <p>
            Les tarifs des Services sont indiqués en euros toutes taxes comprises (TTC) et hors frais de traitement éventuels. 
            Ils sont consultables sur la plateforme TypeFlick.
          </p>
          <p>
            Les tarifs peuvent être modifiés à tout moment. Les modifications s'appliquent aux nouvelles commandes 
            et aux renouvellements d'abonnement.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Modalités de paiement</h3>
          <p>Le paiement s'effectue :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Par carte bancaire (Visa, Mastercard, American Express)</li>
            <li>Par virement bancaire (sur demande pour les entreprises)</li>
            <li>Via les solutions de paiement intégrées (Apple Pay, Google Pay)</li>
          </ul>
          <p>
            Le paiement est traité de manière sécurisée par notre prestataire Stripe. 
            Aucune donnée bancaire n'est stockée sur nos serveurs.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Facturation</h3>
          <p>
            Une facture est automatiquement générée et envoyée par email après chaque paiement. 
            Elle est également accessible depuis l'espace client.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Défaut de paiement</h3>
          <p>
            En cas de défaut de paiement, l'accès aux Services peut être suspendu après mise en demeure restée sans effet. 
            Des pénalités de retard pourront être appliquées au taux légal en vigueur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Commande et acceptation</h2>
          
          <h3 className="text-xl font-semibold mb-3">5.1 Processus de commande</h3>
          <p>La commande s'effectue selon les étapes suivantes :</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Sélection du service souhaité</li>
            <li>Vérification du récapitulatif de commande</li>
            <li>Saisie des informations de facturation</li>
            <li>Acceptation des présentes CGV</li>
            <li>Confirmation et paiement</li>
          </ol>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Confirmation de commande</h3>
          <p>
            La commande est confirmée par l'envoi d'un email de confirmation contenant les détails de la commande 
            et les informations de facturation.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Formation du contrat</h3>
          <p>
            Le contrat est formé lors de la validation du paiement par notre prestataire. 
            L'accès aux Services commandés est activé immédiatement après confirmation du paiement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Livraison et exécution</h2>
          
          <h3 className="text-xl font-semibold mb-3">6.1 Activation des services</h3>
          <p>
            Les Services numériques sont activés immédiatement après confirmation du paiement. 
            Le Client reçoit un email de confirmation avec les détails d'accès.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Disponibilité</h3>
          <p>
            Nous nous efforçons d'assurer une disponibilité maximale des Services, 
            sous réserve des opérations de maintenance et des cas de force majeure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Droit de rétractation</h2>
          
          <h3 className="text-xl font-semibold mb-3">7.1 Principe</h3>
          <p>
            Conformément à l'article L221-28 du Code de la consommation, le Client dispose d'un délai de 14 jours 
            à compter de la souscription pour exercer son droit de rétractation.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Exceptions</h3>
          <p>
            Le droit de rétractation ne peut être exercé pour les services numériques dont l'exécution a commencé 
            avec l'accord préalable exprès du Client et renoncement exprès à son droit de rétractation.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.3 Modalités</h3>
          <p>
            Pour exercer le droit de rétractation, le Client doit nous notifier sa décision par email 
            à l'adresse [À COMPLÉTER - Email de contact] ou via le formulaire de contact.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.4 Remboursement</h3>
          <p>
            En cas de rétractation, nous procédons au remboursement dans un délai de 14 jours 
            par le même moyen de paiement que celui utilisé pour la transaction initiale.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Abonnements</h2>
          
          <h3 className="text-xl font-semibold mb-3">8.1 Durée</h3>
          <p>
            Les abonnements sont proposés avec différentes durées (mensuel, annuel). 
            La durée est précisée lors de la souscription.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Renouvellement</h3>
          <p>
            Sauf résiliation, les abonnements se renouvellent automatiquement pour une durée identique. 
            Le Client est informé par email avant chaque renouvellement.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.3 Résiliation</h3>
          <p>
            Le Client peut résilier son abonnement à tout moment depuis son espace client 
            ou en nous contactant directement. La résiliation prend effet à la fin de la période en cours.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.4 Suspension</h3>
          <p>
            En cas de non-paiement ou de violation des conditions d'utilisation, 
            l'abonnement peut être suspendu après mise en demeure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Garanties et responsabilité</h2>
          
          <h3 className="text-xl font-semibold mb-3">9.1 Garanties</h3>
          <p>
            Nous garantissons que les Services seront fournis avec diligence et selon les règles de l'art. 
            Nous nous engageons à corriger tout défaut de conformité signalé.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">9.2 Limitation de responsabilité</h3>
          <p>
            Notre responsabilité est limitée au montant payé par le Client pour les Services concernés. 
            Nous ne saurions être tenus responsables des dommages indirects ou imprévisibles.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">9.3 Force majeure</h3>
          <p>
            Nous ne saurions être tenus responsables de l'inexécution de nos obligations 
            en cas de force majeure ou de circonstances indépendantes de notre volonté.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Propriété intellectuelle</h2>
          <p>
            Tous les éléments de la plateforme TypeFlick (logiciels, textes, images, sons, vidéos, bases de données) 
            sont protégés par le droit de la propriété intellectuelle.
          </p>
          <p>
            Le Client obtient uniquement un droit d'usage personnel et non exclusif des Services, 
            sans aucun transfert de propriété intellectuelle.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Données personnelles</h2>
          <p>
            Le traitement des données personnelles dans le cadre des commandes est régi par notre 
            <a href="/legal/politique-confidentialite" className="text-blue-600 hover:underline"> Politique de confidentialité</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Service client</h2>
          <p>
            Notre service client est disponible pour répondre à vos questions :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>Email :</strong> [À COMPLÉTER - Email support]</p>
            <p><strong>Horaires :</strong> Du lundi au vendredi, 9h-18h (hors jours fériés)</p>
            <p><strong>Temps de réponse :</strong> Sous 24h ouvrées</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Médiation et règlement des litiges</h2>
          
          <h3 className="text-xl font-semibold mb-3">13.1 Règlement amiable</h3>
          <p>
            En cas de litige, nous nous efforcerons de trouver une solution amiable. 
            Le Client peut nous contacter via notre service client.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">13.2 Médiation de la consommation</h3>
          <p>
            En cas d'échec du règlement amiable, le Client consommateur peut recourir gratuitement 
            à un médiateur de la consommation :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>Médiateur :</strong> [À COMPLÉTER - Nom du médiateur]</p>
            <p><strong>Site web :</strong> [À COMPLÉTER - Site du médiateur]</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">13.3 Plateforme européenne</h3>
          <p>
            Le Client peut également utiliser la plateforme européenne de règlement en ligne des litiges : 
            <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Droit applicable et juridiction</h2>
          <p>
            Les présentes CGV sont soumises au droit français. 
            En cas de litige, les tribunaux de [À COMPLÉTER - Ville du siège social] seront seuls compétents.
          </p>
          <p>
            Pour les Clients consommateurs, cette clause ne fait pas obstacle au recours aux juridictions 
            du lieu de résidence du consommateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">15. Dispositions finales</h2>
          
          <h3 className="text-xl font-semibold mb-3">15.1 Modification des CGV</h3>
          <p>
            Les présentes CGV peuvent être modifiées à tout moment. 
            Les modifications s'appliquent aux commandes passées après leur publication.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">15.2 Nullité partielle</h3>
          <p>
            Si une clause des présentes CGV était déclarée nulle, les autres clauses resteraient applicables.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">15.3 Archivage</h3>
          <p>
            Les commandes et factures sont archivées sur un support fiable et durable 
            conformément aux obligations légales.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">16. Contact</h2>
          <p>
            Pour toute question concernant les présentes CGV ou vos commandes :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>Email :</strong> [À COMPLÉTER - Email de contact]</p>
            <p><strong>Adresse :</strong> [À COMPLÉTER - Adresse postale]</p>
            <p><strong>Téléphone :</strong> [À COMPLÉTER - Numéro de téléphone]</p>
            <p><strong>RCS :</strong> [À COMPLÉTER - Numéro RCS]</p>
            <p><strong>TVA :</strong> [À COMPLÉTER - Numéro TVA]</p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          <p className="mt-2">
            En passant commande sur TypeFlick, vous acceptez les présentes Conditions Générales de Vente.
          </p>
        </div>
      </div>
    </div>
  )
}

