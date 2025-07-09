import { Film, Tv, Monitor, Music } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import ContentGrid from "@/components/content/content-grid";
import { CONTENT_TYPES } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />
        
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />

        {/* Central content */}
        <div className="relative z-10 text-center">
          <div className="hero-logo">
            <div className="hero-logo-inner">
              <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            أكاديمية السينما
          </h1>
          
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            استمتع بمشاهدة أحدث الأفلام والمسلسلات العربية والأجنبية بجودة عالية
          </p>
          
          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link href="/movies" className="quick-nav-card">
              <Film className="w-8 h-8 text-accent mb-3 mx-auto" />
              <p className="font-semibold">الأفلام</p>
            </Link>
            
            <Link href="/series" className="quick-nav-card">
              <Tv className="w-8 h-8 text-accent mb-3 mx-auto" />
              <p className="font-semibold">المسلسلات</p>
            </Link>
            
            <Link href="/television" className="quick-nav-card">
              <Monitor className="w-8 h-8 text-accent mb-3 mx-auto" />
              <p className="font-semibold">التلفزيون</p>
            </Link>
            
            <Link href="/miscellaneous" className="quick-nav-card">
              <Music className="w-8 h-8 text-accent mb-3 mx-auto" />
              <p className="font-semibold">المنوعات</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="section-bg">
        <div className="container mx-auto px-4">
          <ContentGrid
            contentType={CONTENT_TYPES.MOVIE}
            title="أحدث الأفلام"
            showViewAll={true}
          />
        </div>
      </section>

      {/* Featured Series */}
      <section className="section-bg-alt">
        <div className="container mx-auto px-4">
          <ContentGrid
            contentType={CONTENT_TYPES.SERIES}
            title="أحدث المسلسلات"
            showViewAll={true}
          />
        </div>
      </section>

      {/* TV Shows */}
      <section className="section-bg">
        <div className="container mx-auto px-4">
          <ContentGrid
            contentType={CONTENT_TYPES.TV}
            title="برامج التلفزيون"
            showViewAll={true}
          />
        </div>
      </section>

      {/* Miscellaneous */}
      <section className="section-bg-alt">
        <div className="container mx-auto px-4">
          <ContentGrid
            contentType={CONTENT_TYPES.MISC}
            title="المنوعات"
            showViewAll={true}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
