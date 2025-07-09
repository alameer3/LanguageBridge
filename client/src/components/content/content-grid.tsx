import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ContentCard from "./content-card";
import { Content } from "@shared/schema";

interface ContentGridProps {
  contentType: string;
  filters?: any;
  title: string;
  showViewAll?: boolean;
}

export default function ContentGrid({ contentType, filters, title, showViewAll = true }: ContentGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 24;

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/content', contentType, currentPage, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
        ...filters
      });
      
      const response = await fetch(`/api/content/${contentType}?${params}`);
      if (!response.ok) throw new Error('Failed to fetch content');
      return response.json();
    },
  });

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">حدث خطأ في تحميل المحتوى</p>
      </div>
    );
  }

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        {showViewAll && (
          <Button variant="ghost" className="text-accent hover:text-orange-600">
            عرض الكل
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      ) : data?.content?.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {data.content.map((item: Content) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-2 space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </Button>
              
              <div className="flex space-x-1 space-x-reverse">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? "bg-orange-500 hover:bg-orange-600" : ""}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                التالي
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted text-lg">لا توجد نتائج</p>
        </div>
      )}
    </div>
  );
}
