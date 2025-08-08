import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales - TypeFlick',
  description: 'Mentions légales du site TypeFlick conformément à la législation française',
}

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>
      
      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Identification de l'éditeur</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Dénomination sociale :</strong> [À COMPLÉTER - Nom de votre société]</p>
            <p><strong>Forme juridique :</strong> [À COMPLÉTER - SAS, SARL, etc.]</p>
            <p><strong>Capital social :</strong> [À COMPLÉTER - Montant du capital]</p>
            <p><strong>Siège social :</strong> [À COMPLÉTER - Adresse complète]</p>
            <p><strong>RCS :</strong> [À COMPLÉTER - Numéro RCS et ville]</p>
            <p><strong>SIRET :</strong> [À COMPLÉTER - Numéro SIRET]</p>
            <p><strong>TVA intracommunautaire :</strong> [À COMPLÉTER - Numéro TVA]</p>
            <p><strong>Téléphone :</strong> [À COMPLÉTER - Numéro de téléphone]</p>
            <p><strong>Email :</strong> [À COMPLÉTER - Adresse email de contact]</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Directeur de la publication</h2>
          <p>Le directeur de la publication est : [À COMPLÉTER - Nom et prénom du directeur de publication]</p>
          <p>Contact : [À COMPLÉTER - Email du directeur de publication]</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Hébergement</h2>
          <p><strong>Hébergeur :</strong> Vercel Inc.</p>
          <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
          <p><strong>Site web :</strong> <a href="https://vercel.com" className="text-blue-600 hover:underline">https://vercel.com</a></p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
          <p>
            La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Responsabilité</h2>
          <p>
            Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, 
            mais peut toutefois contenir des inexactitudes ou des omissions.
          </p>
          <p>
            Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, 
            à l'adresse [À COMPLÉTER - Email de contact], en décrivant le problème de la manière la plus précise possible.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Liens hypertextes</h2>
          <p>
            Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet 
            ne sauraient engager la responsabilité de TypeFlick.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Collecte et traitement de données personnelles</h2>
          <p>
            Conformément aux dispositions de la loi n° 78-17 du 6 janvier 1978 modifiée relative à l'informatique, aux fichiers et aux libertés 
            et du Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition 
            au traitement de vos données personnelles.
          </p>
          <p>
            Pour plus d'informations sur la collecte et le traitement de vos données personnelles, 
            consultez notre <a href="/legal/politique-confidentialite" className="text-blue-600 hover:underline">Politique de confidentialité</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Droit applicable et juridiction compétente</h2>
          <p>
            Tout litige en relation avec l'utilisation du site TypeFlick est soumis au droit français. 
            Il est fait attribution exclusive de juridiction aux tribunaux compétents de [À COMPLÉTER - Ville du siège social].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Crédits</h2>
          <p>
            Ce site a été conçu et développé par TypeFlick.
          </p>
          <p>
            Les icônes utilisées proviennent de Lucide React.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </div>
    </div>
  )
}

