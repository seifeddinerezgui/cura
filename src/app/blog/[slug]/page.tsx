import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Calendar, User, ArrowLeft } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { mockBlogPosts } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Article non trouvé' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Mock article content
  const articleContent = getArticleContent(post.slug);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <AnimatedSection>
          <nav className="flex items-center gap-2 text-xs text-pierre mb-8">
            <Link href="/" className="hover:text-cuir transition-colors">
              Accueil
            </Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-cuir transition-colors">
              Journal
            </Link>
            <ChevronRight size={12} />
            <span className="text-charbon truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection className="mb-10">
          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider text-or font-medium bg-or/10 px-2.5 py-1 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charbon leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-pierre">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Cover Image */}
        <AnimatedSection className="mb-12">
          <div className="relative h-[300px] md:h-[450px] rounded-sm overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </AnimatedSection>

        {/* Content */}
        <AnimatedSection>
          <article className="prose prose-lg max-w-none">
            <div
              className="text-pierre leading-relaxed space-y-6 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-charbon [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:text-base [&>blockquote]:border-l-4 [&>blockquote]:border-or [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-cuir [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2"
              dangerouslySetInnerHTML={{ __html: articleContent }}
            />
          </article>
        </AnimatedSection>

        {/* Back */}
        <AnimatedSection className="mt-16 pt-8 border-t border-pierre-light/20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-cuir hover:text-cuir-dark transition-colors"
          >
            <ArrowLeft size={16} />
            Retour au journal
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}

function getArticleContent(slug: string): string {
  const articles: Record<string, string> = {
    'art-tannage-vegetal-tunisie': `
      <p>Le tannage végétal est l'un des plus anciens procédés de transformation du cuir jamais inventés par l'homme. En Tunisie, cette tradition millénaire continue de vivre dans les tanneries historiques de la médina de Tunis, où chaque jour, des artisans perpétuent des gestes ancestraux.</p>
      
      <h2>Un Héritage Millénaire</h2>
      <p>Contrairement au tannage au chrome, industriel et rapide, le tannage végétal nécessite patience et expertise. Les peaux sont trempées dans des bains de tanins naturels extraits d'écorces d'arbres — chêne, mimosa, châtaignier — pendant plusieurs semaines, parfois plusieurs mois.</p>
      <p>Ce processus lent confère au cuir des propriétés uniques : une texture chaleureuse au toucher, une capacité exceptionnelle à développer une patine avec le temps, et une durabilité remarquable.</p>

      <blockquote>« Le cuir tanné végétalement est un matériau vivant. Il vieillit comme un bon vin français, en devenant meilleur avec le temps. » — Maître Hassan, artisan CURA</blockquote>

      <h2>Le Processus Artisanal</h2>
      <p>Dans nos ateliers, le processus de tannage se décompose en plusieurs étapes :</p>
      <ul>
        <li><strong>Le trempage :</strong> Les peaux brutes sont nettoyées et préparées dans des bains d'eau de chaux.</li>
        <li><strong>L'épilage :</strong> Les poils sont retirés mécaniquement pour révéler le grain du cuir.</li>
        <li><strong>Le tannage :</strong> Immersion progressive dans des solutions de tanins végétaux de concentration croissante.</li>
        <li><strong>Le corroyage :</strong> Le cuir est assoupli, teinté et nourri avec des huiles naturelles.</li>
        <li><strong>Le séchage :</strong> Séchage lent à l'air libre pour préserver les qualités du cuir.</li>
      </ul>

      <h2>Pourquoi Choisir le Cuir Tanné Végétalement ?</h2>
      <p>Au-delà de ses qualités esthétiques, le cuir tanné végétalement est un choix responsable. Sans chrome ni produits chimiques nocifs, il est biodégradable et respectueux de l'environnement. Chaque pièce CURA représente un engagement envers la durabilité et la préservation d'un patrimoine artisanal inestimable.</p>
    `,
    'entretenir-cuir-artisanal': `
      <p>Votre pièce en cuir CURA est conçue pour durer des années, voire des décennies. Voici nos conseils pour en prendre soin et révéler toute sa beauté au fil du temps.</p>

      <h2>Le Nettoyage Régulier</h2>
      <p>Utilisez un chiffon doux et légèrement humide pour essuyer la surface du cuir. Évitez les produits chimiques agressifs qui pourraient altérer la patine naturelle. Pour les taches légères, un peu de savon de Marseille dilué dans de l'eau tiède fait des merveilles.</p>

      <h2>L'Hydratation</h2>
      <p>Le cuir est un matériau naturel qui a besoin d'être nourri régulièrement. Appliquez un baume pour cuir naturel ou de l'huile de jojoba tous les 2 à 3 mois. Massez délicatement en mouvements circulaires et laissez absorber pendant la nuit.</p>

      <blockquote>« Un cuir bien entretenu est un cuir qui raconte son histoire. Les marques du temps ajoutent du caractère à chaque pièce. » — L'équipe CURA</blockquote>

      <h2>Protection Contre l'Eau</h2>
      <p>Bien que nos cuirs soient naturellement résistants, il est préférable d'éviter une exposition prolongée à l'eau. En cas de pluie, essuyez immédiatement avec un chiffon sec et laissez sécher à l'air libre, loin de toute source de chaleur directe.</p>

      <h2>Le Rangement</h2>
      <p>Rangez vos articles en cuir dans un endroit frais et sec. Pour les sacs, rembourrez-les avec du papier de soie pour conserver leur forme. Évitez les sacs plastiques hermétiques — le cuir a besoin de respirer.</p>
    `,
    'artisans-cura-maitre-hassan': `
      <p>Dans l'ombre fraîche de son atelier niché au cœur de la médina de Tunis, Maître Hassan manie l'alène avec une précision que seules quarante années de pratique peuvent conférer. Ses mains racontent l'histoire du cuir tunisien.</p>

      <h2>Les Débuts d'une Passion</h2>
      <p>« J'ai commencé à l'âge de douze ans, comme apprenti chez mon oncle », raconte Hassan en caressant une peau de vachette d'un brun profond. « À l'époque, tout le quartier résonnait du bruit des marteaux et des ciseaux. Nous étions une trentaine d'ateliers rien que dans cette rue. »</p>
      <p>Aujourd'hui, Hassan est l'un des derniers maîtres maroquiniers de la médina. Son atelier, hérité de trois générations, est un trésor vivant de savoir-faire artisanal.</p>

      <blockquote>« Chaque peau me parle. Je sens ses forces et ses faiblesses sous mes doigts. Mon travail, c'est de révéler la beauté que la nature y a déposée. »</blockquote>

      <h2>Un Savoir-Faire Irremplaçable</h2>
      <p>Maître Hassan peut identifier la qualité d'un cuir rien qu'au toucher. Il coupe chaque pièce à la main, sans patron, guidé par une mémoire gestuelle perfectionnée au fil des décennies. Ses coutures, régulières comme un battement de cœur, sont réalisées au point sellier — la technique la plus noble et la plus durable de la maroquinerie.</p>

      <h2>CURA, Une Renaissance</h2>
      <p>Quand l'équipe CURA l'a approché pour collaborer, Hassan a vu une opportunité de transmettre son art. « Les jeunes d'aujourd'hui veulent de la qualité, du vrai. Avec CURA, mon savoir-faire trouve un nouveau souffle. Chaque sac, chaque ceinture que je fabrique, c'est un pont entre le passé et l'avenir. »</p>
    `,
  };

  return articles[slug] || '<p>Contenu à venir...</p>';
}
