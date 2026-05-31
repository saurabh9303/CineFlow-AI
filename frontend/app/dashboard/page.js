import {
  TrendingUp,
  Eye,
  Users,
  PlayCircle,
  Clock3,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Views",
      value: "12.4M",
      growth: "+18%",
      icon: Eye,
    },
    {
      title: "Subscribers",
      value: "84.2K",
      growth: "+9%",
      icon: Users,
    },
    {
      title: "Videos Published",
      value: "1,284",
      growth: "+23%",
      icon: PlayCircle,
    },
    {
      title: "Watch Time",
      value: "18.7K hrs",
      growth: "+14%",
      icon: Clock3,
    },
  ];

  const recentVideos = [
    {
      title: "Funny AI Cat Story",
      views: "2.4M Views",
      status: "Trending",
    },
    {
      title: "Motivational Shorts Edit",
      views: "1.1M Views",
      status: "Published",
    },
    {
      title: "Gaming Meme Compilation",
      views: "894K Views",
      status: "Scheduled",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#172554] text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 lg:p-12">

          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-6">
                AI Powered Dashboard
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Manage Your
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {" "}Social Empire
                </span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                Track analytics, monitor AI automation, publish videos, and scale your content workflow from one unified dashboard.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">

                <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all duration-300">
                  Create New Video
                </button>

                <button className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                  View Reports
                </button>

              </div>

            </div>

            {/* AI Status Card */}
            <div className="w-full lg:w-[380px] rounded-3xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-2xl">

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  AI Performance
                </h2>

                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  Active
                </div>
              </div>

              <div className="space-y-5">

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      Content Generation
                    </span>

                    <span className="text-sm font-medium text-cyan-400">
                      96%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[96%] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      Publishing Queue
                    </span>

                    <span className="text-sm font-medium text-purple-400">
                      74%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[74%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-400">
                      AI Efficiency
                    </p>

                    <h3 className="text-3xl font-bold mt-1">
                      98%
                    </h3>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Sparkles size={28} />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/[0.07] transition-all duration-300"
              >

                <div className="flex items-center justify-between mb-6">

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center">
                    <Icon className="text-cyan-400" size={26} />
                  </div>

                  <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                    <TrendingUp size={16} />
                    {item.growth}
                  </div>

                </div>

                <p className="text-gray-400 text-sm mb-2">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold">
                  {item.value}
                </h2>

              </div>
            );
          })}

        </section>

        {/* Main Content */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

            <div className="flex items-center justify-between mb-8">

              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Recent Videos
                </h2>

                <p className="text-gray-400">
                  Track your latest published and scheduled content.
                </p>
              </div>

              <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-medium hover:scale-105 transition-all duration-300">
                Upload Video
              </button>

            </div>

            <div className="space-y-4">

              {recentVideos.map((video) => (
                <div
                  key={video.title}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-[#0f172a]/60 p-5 hover:bg-[#111827] transition-all duration-300"
                >

                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {video.title}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {video.views}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <span
                      className={`px-4 py-2 rounded-xl text-sm font-medium ${
                        video.status === "Trending"
                          ? "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                          : video.status === "Published"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                    >
                      {video.status}
                    </span>

                    <button className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-sm flex items-center gap-2">
                      View
                      <ArrowUpRight size={16} />
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Quick Actions */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">

                <button className="w-full text-left p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:scale-[1.02] transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-1">
                    Generate AI Script
                  </h3>

                  <p className="text-sm text-gray-400">
                    Create viral short-form content instantly.
                  </p>
                </button>

                <button className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-1">
                    Auto Publish
                  </h3>

                  <p className="text-sm text-gray-400">
                    Schedule uploads to all platforms.
                  </p>
                </button>

                <button className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-1">
                    AI Voiceovers
                  </h3>

                  <p className="text-sm text-gray-400">
                    Generate realistic AI narration.
                  </p>
                </button>

              </div>

            </div>

            {/* Activity */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Recent Activity
              </h2>

              <div className="space-y-5">

                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-2 rounded-full bg-cyan-400" />

                  <div>
                    <p className="font-medium">
                      New video published successfully.
                    </p>

                    <span className="text-sm text-gray-400">
                      5 minutes ago
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-2 rounded-full bg-purple-400" />

                  <div>
                    <p className="font-medium">
                      AI generated 12 new scripts.
                    </p>

                    <span className="text-sm text-gray-400">
                      24 minutes ago
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-2 rounded-full bg-green-400" />

                  <div>
                    <p className="font-medium">
                      Instagram account connected.
                    </p>

                    <span className="text-sm text-gray-400">
                      1 hour ago
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
