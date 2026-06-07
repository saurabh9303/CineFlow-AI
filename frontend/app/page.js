export default function HomePage() {
  const stats = [
    { value: "10K+", label: "Videos Generated" },
    { value: "50K+", label: "AI Scripts Created" },
    { value: "1M+", label: "Words Generated" },
    { value: "99.9%", label: "Platform Uptime" },
  ];

  const features = [
    "AI Script Writing",
    "AI Video Creation",
    "Voice Generation",
    "Thumbnail Creation",
    "YouTube Publishing",
    "Content Library",
    "Analytics Dashboard",
    "Automation Workflows",
  ];

  const roadmap = [
    "Short Videos",
    "Long Videos",
    "Instagram Publishing",
    "Facebook Publishing",
    "AI Agents",
    "Team Workspaces",
    "Advanced Analytics",
    "Content Automation",
  ];

  const Section = ({ children, className = "" }) => (
    <section className={`py-24 px-6 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );

  const Card = ({ children, className = "" }) => (
    <div
      className={`
        bg-white/5 border border-white/10
        backdrop-blur-xl rounded-2xl
        shadow-lg hover:shadow-blue-500/10
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );

  const Button = ({ children, primary, className = "" }) => (
    <button
      className={`
        px-6 py-3 rounded-xl font-semibold transition
        ${primary
          ? "bg-gradient-to-r from-blue-500 to-violet-500 hover:scale-105"
          : "bg-white/5 border border-white/10 hover:bg-white/10"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );

  return (
    <main className="min-h-screen text-white bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#172554] overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute bottom-20 left-1/2 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      {/* HERO */}
      <Section className="min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm">
              🚀 AI Content Creation Platform
            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-bold leading-tight">
              Create, Automate &
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Publish Content
              </span>
            </h1>

            <p className="mt-6 text-slate-300 max-w-xl">
              Generate scripts, videos, voiceovers and publish across platforms
              from one powerful AI workspace.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <Button primary>Start Creating</Button>
              <Button>Watch Demo</Button>
            </div>
          </div>

          <Card className="overflow-hidden">
            <video autoPlay muted loop playsInline className="w-full">
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </Card>

        </div>
      </Section>

      {/* STATS */}
      <Section>
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Card key={s.label} className="p-8 text-center">
              <h3 className="text-4xl font-bold">{s.value}</h3>
              <p className="mt-2 text-slate-400">{s.label}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* DASHBOARD */}
      <Section>
        <div className="text-center">
          <h2 className="text-5xl font-bold">
            Everything You Need
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              In One Workspace
            </span>
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
            Manage content creation, publishing, analytics and automation in one place.
          </p>
        </div>

        <Card className="mt-16 overflow-hidden">
          <img src="/dashboard-poster.png" alt="Dashboard" className="w-full" />
        </Card>
      </Section>

      {/* WORKFLOW */}
      <Section>
        <h2 className="text-center text-5xl font-bold">
          From Idea to Published Content
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {["💡 Idea", "📝 Generate", "🎬 Produce", "🚀 Publish"].map((step) => (
            <Card key={step} className="p-10 text-center hover:-translate-y-2">
              <h3 className="text-2xl font-semibold">{step}</h3>
            </Card>
          ))}
        </div>
      </Section>

      {/* FEATURES */}
      <Section>
        <h2 className="text-center text-5xl font-bold">Powerful Features</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((f) => (
            <Card key={f} className="p-6 hover:bg-white/10 hover:-translate-y-1">
              <h3 className="font-semibold">{f}</h3>
            </Card>
          ))}
        </div>
      </Section>

      {/* ROADMAP */}
      <Section>
        <h2 className="text-center text-5xl font-bold">Built For The Future</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {roadmap.map((r) => (
            <Card key={r} className="p-6 flex justify-between items-center">
              <span>{r}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-300">
                Soon
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <Card className="p-16 max-w-5xl mx-auto rounded-[32px]">
          <h2 className="text-5xl font-bold">Start Building With AI Today</h2>
          <p className="mt-6 text-slate-400">
            Create faster. Publish smarter. Scale effortlessly.
          </p>
          <div className="mt-10">
            <Button primary>Get Started</Button>
          </div>
        </Card>
      </Section>

    </main>
  );
}