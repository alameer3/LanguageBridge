import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/movies", label: "الأفلام" },
  { href: "/series", label: "المسلسلات" },
  { href: "/television", label: "التلفزيون" },
  { href: "/miscellaneous", label: "المنوعات" },
];

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-card/90 backdrop-blur-sm sticky top-16 z-40 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-link",
                  location === item.href ? "nav-link-active" : ""
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
