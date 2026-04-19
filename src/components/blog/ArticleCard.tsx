import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  post: BlogPost;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
        {/* Cover Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charbon/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex gap-2 mb-3">
            {post.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider text-or font-medium bg-or/10 px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-semibold text-charbon group-hover:text-cuir transition-colors duration-300 mb-2 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-pierre leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-pierre-light">
              <Calendar size={12} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <span className="text-xs uppercase tracking-wider text-cuir font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
              Lire
              <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
