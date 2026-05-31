export default function ManualModePage() {
  const drafts = [
    {
      title: "Funny Cat Story",
      platform: "YouTube Shorts",
      status: "Draft",
    },
    {
      title: "AI Productivity Reel",
      platform: "Instagram",
      status: "Editing",
    },
    {
      title: "Gaming Meme Clip",
      platform: "TikTok",
      status: "Ready",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#172554] text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 lg:p-12">

          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
                Manual Content Control
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Create & Edit
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}Content Manually
                </span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                Customize every part of your workflow — scripts, visuals, voiceovers, and publishing — with full manual control.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">

                <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 transition-all duration-300">
                  Create New Project
                </button>

                <button className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                  Open Library
                </button>

              </div>

            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-[380px] rounded-3xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-6 shadow-2xl">

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  Editing Session
                </h2>

                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                  Live
                </div>
              </div>

              <div className="space-y-5">

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      Script Progress
                    </span>

                    <span className="text-sm font-medium text-cyan-400">
                      78%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[78%] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      Video Rendering
                    </span>

                    <span className="text-sm font-medium text-purple-400">
                      54%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[54%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">
                      Active Project
                    </p>

                    <h3 className="text-lg font-semibold mt-1">
                      Viral Meme Video
                    </h3>
                  </div>

                  <button className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                    Editing
                  </button>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Main Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Panel */}
          <div className="lg:col-span-2 space-y-6">

            {/* Editor */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Content Editor
                  </h2>

                  <p className="text-gray-400">
                    Write and manage your scripts manually.
                  </p>
                </div>

                <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-medium hover:scale-105 transition-all duration-300">
                  Save Draft
                </button>
              </div>

              <div className="space-y-5">

                <input
                  type="text"
                  placeholder="Enter project title..."
                  className="w-full rounded-2xl bg-[#0f172a]/70 border border-white/10 px-5 py-4 outline-none focus:border-cyan-500 transition-all duration-300"
                />

                <textarea
                  rows={10}
                  placeholder="Write your video script here..."
                  className="w-full rounded-2xl bg-[#0f172a]/70 border border-white/10 px-5 py-4 outline-none focus:border-cyan-500 transition-all duration-300 resize-none"
                />

                <div className="flex flex-wrap gap-4">

                  <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-medium hover:scale-105 transition-all duration-300">
                    Generate AI Ideas
                  </button>

                  <button className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    Preview Script
                  </button>

                  <button className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    Export Project
                  </button>

                </div>

              </div>

            </div>

            {/* Drafts */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Recent Drafts
                  </h2>

                  <p className="text-gray-400">
                    Continue editing your saved projects.
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                {drafts.map((draft) => (
                  <div
                    key={draft.title}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-[#0f172a]/60 p-5 hover:bg-[#111827] transition-all duration-300"
                  >

                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {draft.title}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        {draft.platform}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">

                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${
                          draft.status === "Ready"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : draft.status === "Editing"
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }`}
                      >
                        {draft.status}
                      </span>

                      <button className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-sm">
                        Open
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Tools */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                AI Tools
              </h2>

              <div className="space-y-4">

                <button className="w-full text-left p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 hover:scale-[1.02] transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-1">
                    AI Script Writer
                  </h3>

                  <p className="text-sm text-gray-400">
                    Generate engaging short-form scripts.
                  </p>
                </button>

                <button className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-1">
                    AI Thumbnail Creator
                  </h3>

                  <p className="text-sm text-gray-400">
                    Design thumbnails instantly with AI.
                  </p>
                </button>

                <button className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-1">
                    AI Voice Generator
                  </h3>

                  <p className="text-sm text-gray-400">
                    Create realistic voiceovers in seconds.
                  </p>
                </button>

              </div>

            </div>

            {/* Publishing */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Publishing
              </h2>

              <div className="space-y-4">

                <div className="rounded-2xl bg-[#0f172a]/70 border border-white/10 p-5">
                  <p className="text-gray-400 text-sm mb-2">
                    Connected Platforms
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm border border-red-500/20">
                      YouTube
                    </span>

                    <span className="px-3 py-2 rounded-xl bg-pink-500/10 text-pink-400 text-sm border border-pink-500/20">
                      Instagram
                    </span>

                    <span className="px-3 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">
                      TikTok
                    </span>
                  </div>
                </div>

                <button className="w-full px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-medium hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/20">
                  Publish Content
                </button>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
