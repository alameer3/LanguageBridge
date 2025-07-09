import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 space-x-reverse mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold">أكاديمية السينما</span>
            </div>
            <p className="text-muted mb-4">
              منصة رائدة لمشاهدة الأفلام والمسلسلات العربية والأجنبية بجودة عالية
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-muted hover:text-accent">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted hover:text-accent">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted hover:text-accent">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted hover:text-accent">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted hover:text-accent">الرئيسية</Link></li>
              <li><Link href="/movies" className="text-muted hover:text-accent">الأفلام</Link></li>
              <li><Link href="/series" className="text-muted hover:text-accent">المسلسلات</Link></li>
              <li><Link href="/television" className="text-muted hover:text-accent">التلفزيون</Link></li>
              <li><Link href="/miscellaneous" className="text-muted hover:text-accent">المنوعات</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted hover:text-accent">مركز المساعدة</a></li>
              <li><a href="#" className="text-muted hover:text-accent">اتصل بنا</a></li>
              <li><a href="#" className="text-muted hover:text-accent">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-muted hover:text-accent">شروط الاستخدام</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-muted">
          <p>&copy; 2024 أكاديمية السينما. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
