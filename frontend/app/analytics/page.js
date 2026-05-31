export default function AnalyticsPage() {

  const metrics = [
    {
      title: "Total Views",
      value: "18.4M",
      change: "+24%",
      note: "Last 30 days",
    },
    {
      title: "Watch Time",
      value: "42.8K hrs",
      change: "+18%",
      note: "Last 30 days",
    },
    {
      title: "Engagement Rate",
      value: "9.6%",
      change: "+3.2%",
      note: "Last 30 days",
    },
    {
      title: "New Subscribers",
      value: "128K",
      change: "+31%",
      note: "Last 30 days",
    },
  ];

  const chartData = [
    { label: "Mon", value: 40 },
    { label: "Tue", value: 65 },
    { label: "Wed", value: 55 },
    { label: "Thu", value: 80 },
    { label: "Fri", value: 95 },
    { label: "Sat", value: 70 },
    { label: "Sun", value: 90 },
  ];

  const topVideos = [
    {
      title: "AI Cat Story Goes Viral",
      views: "4.2M",
      platform: "YouTube Shorts",
    },
    {
      title: "Motivational AI Speech",
      views: "3.1M",
      platform: "Instagram",
    },
    {
      title: "Gaming Meme Compilation",
      views: "2.6M",
      platform: "TikTok",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#172554] text-white pt-24 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">

          <h1 className="text-4xl font-bold mb-4">
            Analytics Dashboard
          </h1>

          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Track your AI-generated content performance, engagement,
            and growth across all social platforms in real time.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">

            <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition">
              Refresh Data
            </button>

            <button className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              Export Report
            </button>

          </div>

        </section>

        {/* Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {metrics.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition"
            >
              <p className="text-gray-400 text-sm">{item.title}</p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>

              <div className="flex items-center justify-between mt-4">

                <span className="text-green-400 text-sm font-medium">
                  {item.change}
                </span>

                <span className="text-gray-500 text-xs">
                  {item.note}
                </span>

              </div>
            </div>
          ))}

        </section>

        {/* Chart Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Chart */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Weekly Performance
            </h2>

            <div className="flex items-end gap-4 h-64">

              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">

                  <div
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-2xl"
                    style={{ height: `${item.value}%` }}
                  />

                  <span className="text-gray-400 text-sm mt-3">
                    {item.label}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* Side Panel */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Insights
            </h2>

            <div className="space-y-5">

              <div className="p-4 rounded-2xl bg-[#0f172a]/60 border border-white/10">
                <p className="text-sm text-gray-400">
                  Best Performing Time
                </p>
                <h3 className="text-xl font-bold mt-1">
                  6 PM - 9 PM
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#0f172a]/60 border border-white/10">
                <p className="text-sm text-gray-400">
                  Top Platform
                </p>
                <h3 className="text-xl font-bold mt-1">
                  YouTube Shorts
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#0f172a]/60 border border-white/10">
                <p className="text-sm text-gray-400">
                  Viral Probability
                </p>
                <h3 className="text-xl font-bold mt-1 text-cyan-400">
                  87%
                </h3>
              </div>

            </div>

          </div>

        </section>

        {/* Top Videos */}
        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Top Performing Videos
          </h2>

          <div className="space-y-4">

            {topVideos.map((video, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-2xl border border-white/10 bg-[#0f172a]/60 hover:bg-[#111827] transition"
              >

                <div>
                  <h3 className="text-lg font-semibold">
                    {video.title}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {video.platform}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-400">
                    {video.views}
                  </p>

                  <p className="text-gray-400 text-sm">
                    views
                  </p>
                </div>

              </div>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}   