"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    username: "",
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    autoPublish: false,
    darkMode: true,
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#172554] text-white pt-24 px-4 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">

          <h1 className="text-4xl font-bold mb-4">
            Settings
          </h1>

          <p className="text-gray-400 max-w-2xl">
            Manage your account settings, preferences, and AI automation controls.
          </p>

        </section>

        {/* Profile Settings */}
        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 outline-none focus:border-cyan-500"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 outline-none focus:border-cyan-500"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-400">Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 outline-none focus:border-cyan-500"
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
              />
            </div>

          </div>

          <button className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition">
            Save Profile
          </button>

        </section>

        {/* Preferences */}
        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Preferences
          </h2>

          <div className="space-y-5">

            {/* Notifications */}
            <div className="flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-[#0f172a]/60">
              <div>
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-gray-400 text-sm">
                  Receive updates about your content performance
                </p>
              </div>

              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={() =>
                  setPreferences({
                    ...preferences,
                    notifications: !preferences.notifications,
                  })
                }
                className="w-5 h-5"
              />
            </div>

            {/* Auto Publish */}
            <div className="flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-[#0f172a]/60">
              <div>
                <h3 className="font-semibold">Auto Publish</h3>
                <p className="text-gray-400 text-sm">
                  Automatically publish generated content
                </p>
              </div>

              <input
                type="checkbox"
                checked={preferences.autoPublish}
                onChange={() =>
                  setPreferences({
                    ...preferences,
                    autoPublish: !preferences.autoPublish,
                  })
                }
                className="w-5 h-5"
              />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-[#0f172a]/60">
              <div>
                <h3 className="font-semibold">Dark Mode</h3>
                <p className="text-gray-400 text-sm">
                  Keep UI in dark theme (recommended)
                </p>
              </div>

              <input
                type="checkbox"
                checked={preferences.darkMode}
                onChange={() =>
                  setPreferences({
                    ...preferences,
                    darkMode: !preferences.darkMode,
                  })
                }
                className="w-5 h-5"
              />
            </div>

          </div>

        </section>

        {/* Danger Zone */}
        <section className="rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Danger Zone
          </h2>

          <p className="text-gray-400 mb-6">
            Once you delete your account, there is no going back.
          </p>

          <button className="px-6 py-3 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition">
            Delete Account
          </button>

        </section>

      </div>

    </main>
  );
}