import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Tv, Monitor, Music, TrendingUp, Users, Download, Eye } from "lucide-react";

interface AdminDashboardProps {
  stats?: {
    movies: number;
    series: number;
    tv: number;
    misc: number;
  };
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const dashboardCards = [
    {
      title: "الأفلام",
      value: stats?.movies || 0,
      icon: Film,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "المسلسلات",
      value: stats?.series || 0,
      icon: Tv,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "التلفزيون",
      value: stats?.tv || 0,
      icon: Monitor,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "المنوعات",
      value: stats?.misc || 0,
      icon: Music,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  const activityCards = [
    {
      title: "إجمالي المشاهدات",
      value: "1.2M",
      icon: Eye,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    },
    {
      title: "التنزيلات",
      value: "856K",
      icon: Download,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      title: "المستخدمين النشطين",
      value: "45.2K",
      icon: Users,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    },
    {
      title: "النمو الشهري",
      value: "+12.5%",
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Content Statistics */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">إحصائيات المحتوى</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardCards.map((card, index) => (
            <Card key={index} className="bg-card border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{card.title}</p>
                    <p className="text-2xl font-bold text-white">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${card.bgColor}`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Activity Statistics */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">إحصائيات النشاط</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activityCards.map((card, index) => (
            <Card key={index} className="bg-card border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{card.title}</p>
                    <p className="text-2xl font-bold text-white">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${card.bgColor}`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">النشاط الأخير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Film className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-white text-sm">تم إضافة فيلم جديد</p>
                  <p className="text-gray-400 text-xs">منذ 5 دقائق</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Tv className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-white text-sm">تم تحديث مسلسل</p>
                  <p className="text-gray-400 text-xs">منذ 15 دقيقة</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-white text-sm">مستخدم جديد انضم</p>
                  <p className="text-gray-400 text-xs">منذ 30 دقيقة</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
