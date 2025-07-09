import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { insertContentSchema, Content } from "@shared/schema";
import { CONTENT_TYPES, LANGUAGES, QUALITY_OPTIONS } from "@/lib/constants";

export default function ContentManagement() {
  const [selectedType, setSelectedType] = useState('movie');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    titleArabic: '',
    description: '',
    descriptionArabic: '',
    type: 'movie',
    year: new Date().getFullYear(),
    language: '',
    quality: '',
    resolution: '',
    rating: '0.0',
    duration: 0,
    episodes: 0,
    posterUrl: '',
    videoUrl: '',
    downloadUrl: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contentData, isLoading } = useQuery({
    queryKey: ['/api/content', selectedType],
    queryFn: async () => {
      const response = await fetch(`/api/content/${selectedType}?limit=100`);
      if (!response.ok) throw new Error('Failed to fetch content');
      return response.json();
    },
  });

  const addContentMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to add content');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({ title: "تم إضافة المحتوى بنجاح" });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "حدث خطأ", description: "فشل في إضافة المحتوى", variant: "destructive" });
    }
  });

  const updateContentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof formData }) => {
      const response = await fetch(`/api/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update content');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({ title: "تم تحديث المحتوى بنجاح" });
      setEditingContent(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "حدث خطأ", description: "فشل في تحديث المحتوى", variant: "destructive" });
    }
  });

  const deleteContentMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete content');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({ title: "تم حذف المحتوى بنجاح" });
    },
    onError: () => {
      toast({ title: "حدث خطأ", description: "فشل في حذف المحتوى", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      titleArabic: '',
      description: '',
      descriptionArabic: '',
      type: 'movie',
      year: new Date().getFullYear(),
      language: '',
      quality: '',
      resolution: '',
      rating: '0.0',
      duration: 0,
      episodes: 0,
      posterUrl: '',
      videoUrl: '',
      downloadUrl: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContent) {
      updateContentMutation.mutate({ id: editingContent.id, data: formData });
    } else {
      addContentMutation.mutate(formData);
    }
  };

  const handleEdit = (content: Content) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      titleArabic: content.titleArabic,
      description: content.description || '',
      descriptionArabic: content.descriptionArabic || '',
      type: content.type,
      year: content.year,
      language: content.language,
      quality: content.quality,
      resolution: content.resolution,
      rating: content.rating,
      duration: content.duration || 0,
      episodes: content.episodes || 0,
      posterUrl: content.posterUrl || '',
      videoUrl: content.videoUrl || '',
      downloadUrl: content.downloadUrl || ''
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المحتوى؟')) {
      deleteContentMutation.mutate(id);
    }
  };

  const filteredContent = contentData?.content?.filter((item: Content) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.titleArabic.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">إدارة المحتوى</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 ml-2" />
              إضافة محتوى جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-card">
            <DialogHeader>
              <DialogTitle className="text-white">إضافة محتوى جديد</DialogTitle>
            </DialogHeader>
            <ContentForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isLoading={addContentMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 space-x-reverse">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="movie">الأفلام</SelectItem>
            <SelectItem value="series">المسلسلات</SelectItem>
            <SelectItem value="tv">التلفزيون</SelectItem>
            <SelectItem value="misc">المنوعات</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في المحتوى..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Content List */}
      <Card className="bg-card border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">قائمة المحتوى</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-400">جاري التحميل...</p>
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">لا يوجد محتوى</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContent.map((item: Content) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <img
                      src={item.posterUrl || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&h=150&fit=crop"}
                      alt={item.titleArabic}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{item.titleArabic}</h3>
                      <p className="text-gray-400 text-sm">{item.year} • {item.language}</p>
                      <p className="text-gray-500 text-xs">{item.quality} • {item.rating}⭐</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingContent && (
        <Dialog open={!!editingContent} onOpenChange={() => setEditingContent(null)}>
          <DialogContent className="max-w-2xl bg-card">
            <DialogHeader>
              <DialogTitle className="text-white">تعديل المحتوى</DialogTitle>
            </DialogHeader>
            <ContentForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isLoading={updateContentMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function ContentForm({
  formData,
  setFormData,
  onSubmit,
  isLoading
}: {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">العنوان (إنجليزي)</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="titleArabic">العنوان (عربي)</Label>
          <Input
            id="titleArabic"
            value={formData.titleArabic}
            onChange={(e) => setFormData({ ...formData, titleArabic: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">الوصف (إنجليزي)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="descriptionArabic">الوصف (عربي)</Label>
        <Textarea
          id="descriptionArabic"
          value={formData.descriptionArabic}
          onChange={(e) => setFormData({ ...formData, descriptionArabic: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="type">النوع</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="movie">فيلم</SelectItem>
              <SelectItem value="series">مسلسل</SelectItem>
              <SelectItem value="tv">تلفزيون</SelectItem>
              <SelectItem value="misc">منوعات</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="year">السنة</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            required
          />
        </div>

        <div>
          <Label htmlFor="language">اللغة</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="quality">الجودة</Label>
          <Select value={formData.quality} onValueChange={(value) => setFormData({ ...formData, quality: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUALITY_OPTIONS.map((quality) => (
                <SelectItem key={quality.value} value={quality.value}>
                  {quality.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="resolution">الدقة</Label>
          <Select value={formData.resolution} onValueChange={(value) => setFormData({ ...formData, resolution: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4K">4K</SelectItem>
              <SelectItem value="1080p">1080p</SelectItem>
              <SelectItem value="720p">720p</SelectItem>
              <SelectItem value="480p">480p</SelectItem>
              <SelectItem value="360p">360p</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="rating">التقييم</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">المدة (بالدقائق)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <Label htmlFor="episodes">عدد الحلقات</Label>
          <Input
            id="episodes"
            type="number"
            value={formData.episodes}
            onChange={(e) => setFormData({ ...formData, episodes: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="posterUrl">رابط الملصق</Label>
        <Input
          id="posterUrl"
          type="url"
          value={formData.posterUrl}
          onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="videoUrl">رابط الفيديو</Label>
        <Input
          id="videoUrl"
          type="url"
          value={formData.videoUrl}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="downloadUrl">رابط التنزيل</Label>
        <Input
          id="downloadUrl"
          type="url"
          value={formData.downloadUrl}
          onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-2 space-x-reverse">
        <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600">
          {isLoading ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </div>
    </form>
  );
}
