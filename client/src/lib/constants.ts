export const CONTENT_TYPES = {
  MOVIE: 'movie',
  SERIES: 'series',
  TV: 'tv',
  MISC: 'misc'
} as const;

export const QUALITY_OPTIONS = [
  { value: '4K', label: '4K', color: 'bg-purple-500' },
  { value: '1080p', label: '1080p', color: 'bg-blue-500' },
  { value: '720p', label: '720p', color: 'bg-green-500' },
  { value: '480p', label: '480p', color: 'bg-yellow-500' },
  { value: 'HD', label: 'HD', color: 'bg-red-500' }
];

export const LANGUAGES = [
  { value: 'العربية', label: 'العربية' },
  { value: 'الإنجليزية', label: 'الإنجليزية' },
  { value: 'الهندية', label: 'الهندية' },
  { value: 'التركية', label: 'التركية' },
  { value: 'الفرنسية', label: 'الفرنسية' },
  { value: 'الإسبانية', label: 'الإسبانية' },
  { value: 'الكورية', label: 'الكورية' },
  { value: 'اليابانية', label: 'اليابانية' }
];

export const GENRES = [
  { value: 'اكشن', label: 'اكشن' },
  { value: 'كوميديا', label: 'كوميديا' },
  { value: 'دراما', label: 'دراما' },
  { value: 'رعب', label: 'رعب' },
  { value: 'رومانسي', label: 'رومانسي' },
  { value: 'خيال علمي', label: 'خيال علمي' },
  { value: 'إثارة', label: 'إثارة' },
  { value: 'مغامرة', label: 'مغامرة' },
  { value: 'جريمة', label: 'جريمة' },
  { value: 'حربي', label: 'حربي' },
  { value: 'تاريخي', label: 'تاريخي' },
  { value: 'فانتازيا', label: 'فانتازيا' },
  { value: 'غموض', label: 'غموض' },
  { value: 'عائلي', label: 'عائلي' },
  { value: 'أطفال', label: 'أطفال' }
];

export const YEARS = Array.from({ length: 30 }, (_, i) => ({
  value: (2025 - i).toString(),
  label: (2025 - i).toString()
}));

export const RATINGS = [
  { value: '1', label: '+1' },
  { value: '2', label: '+2' },
  { value: '3', label: '+3' },
  { value: '4', label: '+4' },
  { value: '5', label: '+5' },
  { value: '6', label: '+6' },
  { value: '7', label: '+7' },
  { value: '8', label: '+8' },
  { value: '9', label: '+9' }
];
