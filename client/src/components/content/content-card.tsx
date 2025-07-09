import { Star, Download, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Content } from "@shared/schema";
import { QUALITY_OPTIONS } from "@/lib/constants";

interface ContentCardProps {
  content: Content;
  onClick?: (content: Content) => void;
}

export default function ContentCard({ content, onClick }: ContentCardProps) {
  const qualityOption = QUALITY_OPTIONS.find(q => q.value === content.quality);
  const qualityColor = qualityOption?.color || 'bg-gray-500';

  return (
    <div 
      className="content-card group"
      onClick={() => onClick?.(content)}
    >
      <div className="relative">
        <img 
          src={content.posterUrl || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop"} 
          alt={content.titleArabic || content.title}
          className="content-card-image"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quality badge */}
        <Badge className={`quality-badge ${qualityColor}`}>
          {content.quality}
        </Badge>

        {/* Rating badge */}
        <div className="rating-badge">
          <span className="text-yellow-400 text-sm">{content.rating}</span>
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
        </div>

        {/* Hover actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-4 space-x-reverse">
            <button className="p-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white transition-colors">
              <Play className="w-6 h-6" />
            </button>
            {content.downloadUrl && (
              <button className="p-3 bg-gray-600 hover:bg-gray-500 rounded-full text-white transition-colors">
                <Download className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm mb-1 line-clamp-1">
          {content.titleArabic || content.title}
        </h3>
        <p className="text-muted text-xs">
          {content.year} • {content.language}
          {content.episodes && ` • ${content.episodes} حلقة`}
        </p>
      </div>
    </div>
  );
}
