import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation - TypeFlick',
  description: 'Conditions générales d\'utilisation du service TypeFlick pour la création de vidéos musicales',
}

export default function ConditionsGeneralesUtilisationPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
      
      <div className="prose prose-gray max-w-none">
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-sm text-blue-800 mb-0">
            Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation du service TypeFlick. 
            En utilisant notre service, vous acceptez ces conditions dans leur intégralité.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Définitions</h2>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Service :</strong> La plateforme TypeFlick accessible à l'adresse [À COMPLÉTER - URL du site]</li>
            <li><strong>Utilisateur :</strong> Toute personne physique ou morale utilisant le Service</li>
            <li><strong>Compte :</strong> Espace personnel créé par l'Utilisateur sur le Service</li>
            <li><strong>Contenu :</strong> Tous éléments (textes, images, sons, vidéos) mis en ligne par l'Utilisateur</li>
            <li><strong>Nous/Notre :</strong> [À COMPLÉTER - Nom de la société], éditeur du Service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Objet du service</h2>
          <p>
            TypeFlick est une plateforme en ligne permettant aux utilisateurs de créer des vidéos musicales automatisées 
            à partir de fichiers audio et d'images, avec des fonctionnalités de personnalisation et de publication 
            sur différentes plateformes sociales.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Fonctionnalités principales</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Création de vidéos musicales à partir de templates</li>
            <li>Upload et traitement de fichiers audio et images</li>
            <li>Personnalisation des métadonnées (titre, description, hashtags)</li>
            <li>Export en différents formats (16:9, 1:1, 9:16)</li>
            <li>Gestion des collaborateurs sur les projets</li>
            <li>Intégration avec les plateformes de publication</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Conditions d'accès</h2>
          
          <h3 className="text-xl font-semibold mb-3">3.1 Capacité juridique</h3>
          <p>
            Le Service est accessible à toute personne physique majeure ou mineure avec l'autorisation de ses représentants légaux, 
            ainsi qu'aux personnes morales disposant de la capacité juridique.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Inscription</h3>
          <p>
            L'utilisation du Service nécessite la création d'un Compte. L'Utilisateur s'engage à :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fournir des informations exactes, complètes et à jour</li>
            <li>Maintenir la confidentialité de ses identifiants de connexion</li>
            <li>Notifier immédiatement toute utilisation non autorisée de son Compte</li>
            <li>Être responsable de toutes les activités effectuées depuis son Compte</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Prérequis techniques</h3>
          <p>
            L'accès au Service nécessite une connexion Internet et un navigateur web compatible. 
            L'Utilisateur est responsable de son équipement et de sa connexion Internet.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Utilisation du service</h2>
          
          <h3 className="text-xl font-semibold mb-3">4.1 Utilisation conforme</h3>
          <p>L'Utilisateur s'engage à utiliser le Service de manière conforme à sa destination et aux présentes CGU.</p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Interdictions</h3>
          <p>Il est strictement interdit :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>D'utiliser le Service à des fins illégales ou non autorisées</li>
            <li>De porter atteinte aux droits de propriété intellectuelle de tiers</li>
            <li>De diffuser des contenus illicites, diffamatoires, violents ou pornographiques</li>
            <li>De tenter de contourner les mesures de sécurité du Service</li>
            <li>D'utiliser des robots, scripts ou autres moyens automatisés non autorisés</li>
            <li>De perturber le fonctionnement du Service ou des serveurs</li>
            <li>De collecter des données personnelles d'autres utilisateurs</li>
            <li>De créer de faux comptes ou d'usurper l'identité d'autrui</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Suspension et résiliation</h3>
          <p>
            En cas de violation des présentes CGU, nous nous réservons le droit de suspendre ou résilier 
            l'accès au Service, sans préavis ni indemnité.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Contenu utilisateur</h2>
          
          <h3 className="text-xl font-semibold mb-3">5.1 Responsabilité du contenu</h3>
          <p>
            L'Utilisateur est seul responsable du Contenu qu'il met en ligne sur le Service. 
            Il garantit disposer de tous les droits nécessaires sur ce Contenu.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Licence d'utilisation</h3>
          <p>
            En mettant en ligne du Contenu, l'Utilisateur nous accorde une licence non exclusive, 
            gratuite et mondiale pour utiliser, reproduire, modifier et distribuer ce Contenu 
            dans le cadre de la fourniture du Service.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Modération</h3>
          <p>
            Nous nous réservons le droit de modérer, supprimer ou refuser tout Contenu qui ne respecterait pas 
            les présentes CGU ou la législation en vigueur.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.4 Sauvegarde</h3>
          <p>
            Il appartient à l'Utilisateur de sauvegarder son Contenu. Nous ne saurions être tenus responsables 
            de la perte de données.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Propriété intellectuelle</h2>
          
          <h3 className="text-xl font-semibold mb-3">6.1 Propriété du Service</h3>
          <p>
            Le Service, son code source, ses bases de données, ses interfaces et tous les éléments qui le composent 
            sont protégés par le droit d'auteur et restent notre propriété exclusive.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Licence d'utilisation</h3>
          <p>
            Nous accordons à l'Utilisateur une licence personnelle, non exclusive, non cessible et révocable 
            d'utilisation du Service pour ses besoins propres.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Marques</h3>
          <p>
            Les marques, logos et signes distinctifs reproduits sur le Service sont protégés et ne peuvent être utilisés 
            sans autorisation préalable écrite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Disponibilité du service</h2>
          
          <h3 className="text-xl font-semibold mb-3">7.1 Obligation de moyens</h3>
          <p>
            Nous nous engageons à fournir le Service avec diligence et selon les règles de l'art, 
            étant précisé que pèse sur nous une obligation de moyens, à l'exclusion de toute obligation de résultat.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Interruptions</h3>
          <p>
            Le Service peut être interrompu pour des raisons de maintenance, mise à jour, ou en cas de force majeure. 
            Nous nous efforcerons de minimiser ces interruptions et d'informer les Utilisateurs en amont.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.3 Évolutions</h3>
          <p>
            Nous nous réservons le droit de faire évoluer, modifier ou supprimer, sans préavis, 
            tout ou partie du Service pour des raisons techniques ou commerciales.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Données personnelles</h2>
          <p>
            Le traitement des données personnelles est régi par notre 
            <a href="/legal/politique-confidentialite" className="text-blue-600 hover:underline"> Politique de confidentialité</a>, 
            qui fait partie intégrante des présentes CGU.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Responsabilité et garanties</h2>
          
          <h3 className="text-xl font-semibold mb-3">9.1 Limitation de responsabilité</h3>
          <p>
            Notre responsabilité ne saurait être engagée pour :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Les dommages indirects, immatériels ou imprévisibles</li>
            <li>La perte de données, de profits ou d'opportunités commerciales</li>
            <li>Les dysfonctionnements dus à l'équipement de l'Utilisateur</li>
            <li>Les actes de tiers ou les cas de force majeure</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">9.2 Plafonnement</h3>
          <p>
            En tout état de cause, notre responsabilité est limitée au montant des sommes effectivement payées 
            par l'Utilisateur au cours des 12 mois précédant le fait générateur du dommage.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">9.3 Garanties de l'Utilisateur</h3>
          <p>
            L'Utilisateur garantit qu'il dispose de tous les droits nécessaires sur le Contenu qu'il met en ligne 
            et s'engage à nous indemniser de tout recours de tiers à ce titre.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Force majeure</h2>
          <p>
            Nous ne saurions être tenus responsables de tout retard ou inexécution consécutif à la survenance d'un cas de force majeure 
            habituellement reconnu par la jurisprudence française.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Modification des CGU</h2>
          <p>
            Les présentes CGU peuvent être modifiées à tout moment. Les modifications entrent en vigueur dès leur publication sur le Service. 
            L'utilisation continue du Service après modification vaut acceptation des nouvelles conditions.
          </p>
          <p>
            En cas de modification substantielle, nous nous efforcerons d'informer les Utilisateurs par email ou par un avis sur le Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Résiliation</h2>
          
          <h3 className="text-xl font-semibold mb-3">12.1 Résiliation par l'Utilisateur</h3>
          <p>
            L'Utilisateur peut résilier son Compte à tout moment depuis les paramètres de son compte 
            ou en nous contactant directement.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">12.2 Résiliation par nos soins</h3>
          <p>
            Nous pouvons résilier l'accès au Service en cas de violation des présentes CGU, 
            avec un préavis de 30 jours sauf en cas de violation grave.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">12.3 Effets de la résiliation</h3>
          <p>
            La résiliation entraîne la suppression du Compte et de toutes les données associées, 
            sous réserve des obligations légales de conservation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Droit applicable et juridiction</h2>
          <p>
            Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation 
            ou à leur exécution relève de la compétence exclusive des tribunaux de [À COMPLÉTER - Ville du siège social].
          </p>
          <p>
            Avant tout recours contentieux, les parties s'efforceront de résoudre leur différend à l'amiable. 
            En cas d'échec, la médiation pourra être envisagée.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Dispositions diverses</h2>
          
          <h3 className="text-xl font-semibold mb-3">14.1 Intégralité</h3>
          <p>
            Les présentes CGU constituent l'intégralité de l'accord entre les parties concernant l'utilisation du Service.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">14.2 Nullité partielle</h3>
          <p>
            Si une disposition des présentes CGU était déclarée nulle ou inapplicable, 
            les autres dispositions resteraient en vigueur.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">14.3 Renonciation</h3>
          <p>
            Le fait de ne pas exercer un droit prévu par les présentes CGU ne constitue pas une renonciation à ce droit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">15. Contact</h2>
          <p>
            Pour toute question concernant les présentes CGU, vous pouvez nous contacter :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>Email :</strong> [À COMPLÉTER - Email de contact]</p>
            <p><strong>Adresse :</strong> [À COMPLÉTER - Adresse postale]</p>
            <p><strong>Téléphone :</strong> [À COMPLÉTER - Numéro de téléphone]</p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          <p className="mt-2">
            En utilisant le service TypeFlick, vous acceptez les présentes Conditions Générales d'Utilisation.
          </p>
        </div>
      </div>
    </div>
  )
}

