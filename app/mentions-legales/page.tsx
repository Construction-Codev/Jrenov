import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { ShieldCheck, Building2 } from "lucide-react";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Mentions légales",
    description:
      "Mentions légales et informations juridiques relatives à l'entreprise Jrenov (Jason Robba), artisan couvreur à Décines-Charpieu (69).",
    path: "/mentions-legales",
  }),
  robots: {
    index: false, // Recommandé pour éviter d'indexer les pages juridiques
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-10">
        
        {/* Titre */}
        <div className="border-b border-slate-100 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Mentions Légales</h1>
          <p className="text-sm text-slate-500 mt-1">
            En vigueur au 1er janvier 2026 — Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004.
          </p>
        </div>

        {/* 1. Éditeur du site */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-lg">
            <Building2 className="w-5 h-5" />
            <h2>1. Éditeur du site</h2>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 text-sm text-slate-700 space-y-2">
            <p><span className="font-bold text-slate-900">Dénomination commerciale :</span> JRENOV</p>
            <p><span className="font-bold text-slate-900">Exploitant :</span> M. Jason William ROBBA</p>
            <p><span className="font-bold text-slate-900">Statut juridique :</span> Entrepreneur Individuel (EI)</p>
            <p><span className="font-bold text-slate-900">Numéro SIREN :</span> 841 721 236</p>
            <p><span className="font-bold text-slate-900">Numéro SIRET du siège :</span> 841 721 236 00013</p>
            <p><span className="font-bold text-slate-900">Code APE / NAF :</span> 43.91B (Travaux de couverture par éléments)</p>
            <p><span className="font-bold text-slate-900">Date d&apos;immatriculation :</span> 07/05/2018</p>
            <p><span className="font-bold text-slate-900">Adresse du siège social :</span> 48 Ancien Chemin des Marais, 69150 Décines-Charpieu</p>
            <p><span className="font-bold text-slate-900">Téléphone :</span> 04 65 84 88 85</p>
            <p><span className="font-bold text-slate-900">E-mail :</span> contact@jrenov.com</p>
          </div>
        </section>

        {/* 2. Directeur de la publication */}
        <section className="space-y-3 text-sm text-slate-700">
          <h2 className="font-bold text-slate-900 text-base">2. Directeur de la publication</h2>
          <p>Le Directeur de la publication du site est M. Jason ROBBA, en sa qualité d&apos;exploitant 
            de l&apos;entreprise individuel JRENOV.</p>
        </section>

        {/* 3. Hébergement du site */}
        <section className="space-y-3 text-sm text-slate-700">
          <h2 className="font-bold text-slate-900 text-base">3. Hébergement du site</h2>
          <p>
            Le site est hébergé par la société <span className="font-semibold text-slate-900">Vercel Inc.</span><br />
            Adresse : 440 N Barranca Ave #4133 Covina, CA 91723, États-Unis.<br />
            Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">https://vercel.com</a>
          </p>
        </section>

        {/* 4. Assurance & Garantie Décennale */}
        <section className="space-y-3 text-sm text-slate-700">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-base">
            <ShieldCheck className="w-5 h-5" />
            <h2>4. Assurance Professionnelle & Garantie Décennale</h2>
          </div>
          <p>
            L&apos;entreprise JRENOV souscrit une assurance de responsabilité civile professionnelle et une 
            garantie décennale couvrant l&apos;ensemble de ses travaux de couverture, zinguerie et charpente 
            sur la région Auvergne-Rhône-Alpes.
          </p>
        </section>

        {/* 5. Propriété intellectuelle */}
        <section className="space-y-3 text-sm text-slate-700">
          <h2 className="font-bold text-slate-900 text-base">5. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus (textes, images, graphismes, logo, éléments vidéos) présents sur le site{" "}
            <span className="font-semibold text-slate-900">Jrenov</span>{" "}
            est protégé par le droit d&apos;auteur. Toute reproduction, distribution ou représentation totale 
            ou partielle sans l&apos;autorisation expresse de M. Jason ROBBA est strictement interdite.
          </p>
        </section>

        {/* 6. Protection des données (RGPD) */}
        <section className="space-y-3 text-sm text-slate-700">
          <h2 className="font-bold text-slate-900 text-base">6. Données personnelles</h2>
          <p>
            Les informations recueillies via les formulaires de devis et de contact font 
            l&apos;objet d&apos;un traitement informatique destiné exclusivement à la prise de rendez-vous 
            et à la réalisation d&apos;estimations tarifaires par l&apos;entreprise JRENOV. Conformément au 
            Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, 
            de rectification et de suppression de vos données personnelles sur simple demande par mail
            à{" "}
            <a href="mailto:contact@jrenov.com" className="text-amber-600 hover:underline">contact@jrenov.com</a>.
          </p>
        </section>

        {/* 7. Cookies */}
        <section id="cookies" className="space-y-3 text-sm text-slate-700">
          <h2 className="font-bold text-slate-900 text-base">7. Cookies</h2>
          <p>
            Avec votre accord uniquement, le site utilise la balise Google Ads (Google Ireland Ltd) pour mesurer
            si nos annonces mènent à une demande de contact ou de devis. Aucune donnée saisie dans les
            formulaires n&apos;est transmise à Google. Sans acceptation, cette balise n&apos;est pas chargée et
            aucun cookie publicitaire n&apos;est déposé. Votre choix est conservé dans votre navigateur et
            peut être modifié à tout moment via le lien « Gérer mes cookies » en bas de chaque page.
          </p>
        </section>

        {/* Retour */}
        <div className="pt-6 border-t border-slate-100">
          <Link href="/" className="text-amber-600 hover:text-amber-700 font-bold text-sm">
            &larr; Retour à l&apos;accueil
          </Link>
        </div>

      </div>
    </div>
  );
}