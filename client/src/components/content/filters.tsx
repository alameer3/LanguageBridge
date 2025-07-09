import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LANGUAGES, GENRES, YEARS, RATINGS, QUALITY_OPTIONS } from "@/lib/constants";

interface FiltersProps {
  filters: {
    category?: string;
    genre?: string;
    year?: string;
    language?: string;
    quality?: string;
    rating?: string;
  };
  onFilterChange: (key: string, value: string) => void;
  contentType: string;
}

export default function Filters({ filters, onFilterChange, contentType }: FiltersProps) {
  const getCategoryOptions = () => {
    switch (contentType) {
      case 'movie':
        return [
          { value: 'عربي', label: 'عربي' },
          { value: 'أجنبي', label: 'أجنبي' },
          { value: 'هندي', label: 'هندي' },
          { value: 'تركي', label: 'تركي' },
          { value: 'آسيوي', label: 'آسيوي' }
        ];
      case 'series':
        return [
          { value: 'عربي', label: 'عربي' },
          { value: 'أجنبي', label: 'أجنبي' },
          { value: 'هندي', label: 'هندي' },
          { value: 'تركي', label: 'تركي' },
          { value: 'آسيوي', label: 'آسيوي' }
        ];
      case 'tv':
        return [
          { value: 'البرامج التلفزيونية', label: 'البرامج التلفزيونية' },
          { value: 'البرامج الوثائقية', label: 'البرامج الوثائقية' },
          { value: 'المسرحيات', label: 'المسرحيات' },
          { value: 'المصارعة الحرة', label: 'المصارعة الحرة' }
        ];
      case 'misc':
        return [
          { value: 'القران الكريم', label: 'القران الكريم' },
          { value: 'اسلاميات و اناشيد', label: 'اسلاميات و اناشيد' },
          { value: 'الكتب و الابحاث', label: 'الكتب و الابحاث' },
          { value: 'رياضة', label: 'رياضة' },
          { value: 'الصور و الخلفيات', label: 'الصور و الخلفيات' },
          { value: 'فيديو كليب', label: 'فيديو كليب' },
          { value: 'موسيقى', label: 'موسيقى' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="mb-8 p-6 bg-card rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Select value={filters.category} onValueChange={(value) => onFilterChange('category', value)}>
          <SelectTrigger className="filter-select">
            <SelectValue placeholder="القسم" />
          </SelectTrigger>
          <SelectContent>
            {getCategoryOptions().map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.genre} onValueChange={(value) => onFilterChange('genre', value)}>
          <SelectTrigger className="filter-select">
            <SelectValue placeholder="التصنيف" />
          </SelectTrigger>
          <SelectContent>
            {GENRES.map((genre) => (
              <SelectItem key={genre.value} value={genre.value}>
                {genre.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.year} onValueChange={(value) => onFilterChange('year', value)}>
          <SelectTrigger className="filter-select">
            <SelectValue placeholder="سنة الإنتاج" />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((year) => (
              <SelectItem key={year.value} value={year.value}>
                {year.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.language} onValueChange={(value) => onFilterChange('language', value)}>
          <SelectTrigger className="filter-select">
            <SelectValue placeholder="اللغة" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((language) => (
              <SelectItem key={language.value} value={language.value}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.quality} onValueChange={(value) => onFilterChange('quality', value)}>
          <SelectTrigger className="filter-select">
            <SelectValue placeholder="الجودة" />
          </SelectTrigger>
          <SelectContent>
            {QUALITY_OPTIONS.map((quality) => (
              <SelectItem key={quality.value} value={quality.value}>
                {quality.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.rating} onValueChange={(value) => onFilterChange('rating', value)}>
          <SelectTrigger className="filter-select">
            <SelectValue placeholder="التقييم" />
          </SelectTrigger>
          <SelectContent>
            {RATINGS.map((rating) => (
              <SelectItem key={rating.value} value={rating.value}>
                {rating.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
