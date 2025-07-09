import { useState } from "react";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import ContentGrid from "@/components/content/content-grid";
import Filters from "@/components/content/filters";
import { CONTENT_TYPES } from "@/lib/constants";

export default function Movies() {
  const [filters, setFilters] = useState({
    category: "",
    genre: "",
    year: "",
    language: "",
    quality: "",
    rating: ""
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      genre: "",
      year: "",
      language: "",
      quality: "",
      rating: ""
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">الأفلام</h1>
          <p className="text-muted">اكتشف مجموعة واسعة من الأفلام العربية والأجنبية</p>
        </div>

        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          contentType={CONTENT_TYPES.MOVIE}
        />

        <ContentGrid
          contentType={CONTENT_TYPES.MOVIE}
          filters={filters}
          title=""
          showViewAll={false}
        />
      </div>

      <Footer />
    </div>
  );
}
