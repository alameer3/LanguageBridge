import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { ArrowRight, Play, Download, Star, Clock, Calendar, Globe, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { Content } from "@shared/schema";
import { QUALITY_OPTIONS } from "@/lib/constants";

export default function ContentDetail() {
  const [match, params] = useRoute("/content/:id");
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { data: content, isLoading, error } = useQuery({
    queryKey: [`/api/content/item/${params?.id}`],
    enabled: !!params?.id,
  });

  if (!match || !params?.id) {
    return <div>Content not found</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="w-full h-96 rounded-lg" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">خطأ في تحميل المحتوى</h1>
            <Link href="/">
              <Button variant="outline">
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة للصفحة الرئيسية
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const qualityOption = QUALITY_OPTIONS.find(q => q.value === content.quality);
  const qualityColor = qualityOption?.color || 'bg-gray-500';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 space-x-reverse mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">الرئيسية</Link>
          <span>/</span>
          <Link href={`/${content.type === 'movie' ? 'movies' : content.type === 'series' ? 'series' : content.type === 'tv' ? 'television' : 'miscellaneous'}`} className="hover:text-foreground">
            {content.type === 'movie' ? 'الأفلام' : content.type === 'series' ? 'المسلسلات' : content.type === 'tv' ? 'التلفزيون' : 'المنوعات'}
          </Link>
          <span>/</span>
          <span className="text-foreground">{content.titleArabic || content.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {isPlaying ? (
                <video 
                  controls 
                  autoPlay 
                  className="w-full h-full"
                  poster={content.posterUrl}
                >
                  <source src={content.videoUrl} type="video/mp4" />
                  متصفحك لا يدعم تشغيل الفيديو
                </video>
              ) : (
                <div className="relative w-full h-full">
                  <img 
                    src={content.posterUrl || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop"} 
                    alt={content.titleArabic || content.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-full"
                      onClick={() => setIsPlaying(true)}
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Content Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{content.titleArabic || content.title}</h1>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold">{content.rating}</span>
                </div>
              </div>

              {content.title !== content.titleArabic && (
                <p className="text-lg text-muted-foreground">{content.title}</p>
              )}

              <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Calendar className="w-4 h-4" />
                  <span>{content.year}</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Globe className="w-4 h-4" />
                  <span>{content.language}</span>
                </div>
                {content.duration && (
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Clock className="w-4 h-4" />
                    <span>{content.duration} دقيقة</span>
                  </div>
                )}
                {content.episodes && (
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Monitor className="w-4 h-4" />
                    <span>{content.episodes} حلقة</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Badge className={`${qualityColor} text-white`}>
                  {content.quality}
                </Badge>
                <Badge variant="outline">
                  {content.resolution}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">القصة</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {content.descriptionArabic || content.description || "لا يوجد وصف متاح حالياً"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poster */}
            <Card>
              <CardContent className="p-4">
                <img 
                  src={content.posterUrl || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop"} 
                  alt={content.titleArabic || content.title}
                  className="w-full rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Download Links */}
            {content.downloadUrl && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">التحميل</h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => window.open(content.downloadUrl, '_blank')}
                    >
                      <Download className="w-4 h-4 ml-2" />
                      تحميل بجودة {content.quality}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      الحجم التقريبي: {content.quality === '4K' ? '8-12 GB' : content.quality === '1080p' ? '2-4 GB' : '1-2 GB'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Technical Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">التفاصيل التقنية</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">النوع:</span>
                    <span>{content.type === 'movie' ? 'فيلم' : content.type === 'series' ? 'مسلسل' : content.type === 'tv' ? 'تلفزيون' : 'منوعات'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الجودة:</span>
                    <span>{content.quality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الدقة:</span>
                    <span>{content.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">اللغة:</span>
                    <span>{content.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">التقييم:</span>
                    <span>{content.rating}/10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}