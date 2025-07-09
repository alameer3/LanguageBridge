import { useState } from "react";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import ContentGrid from "@/components/content/content-grid";
import Filters from "@/components/content/filters";
import VideoPlayer from "@/components/content/video-player";
import { CONTENT_TYPES } from "@/lib/constants";
import { Content } from "@shared/schema";

export default function Television() {
  const [filters, setFilters] = useState({
    category: "",
    genre: "",
    year: "",
    language: "",
    quality: "",
    rating: ""
  });
  
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleContentClick = (content: Content) => {
    setSelectedContent(content);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">التلفزيون</h1>
          <p className="text-muted">شاهد أفضل البرامج التلفزيونية والعروض المباشرة</p>
        </div>

        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          contentType={CONTENT_TYPES.TV}
        />

        <ContentGrid
          contentType={CONTENT_TYPES.TV}
          filters={filters}
          title=""
          showViewAll={false}
          onContentClick={handleContentClick}
        />
      </div>

      <Footer />
      
      {/* Video Player Modal */}
      {selectedContent && (
        <VideoPlayer
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  );
}
