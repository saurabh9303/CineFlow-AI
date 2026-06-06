"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const connectYoutube = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/api/integrations/youtube/connect",
        {
          credentials: "include"
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.message);

        return;
      }

      window.location.href = data.authUrl;

    } catch (error) {

      console.error(error);

      alert("Something went wrong");

    }

  };

  return (

    <main className="min-h-screen bg-[#0f172a] text-white pt-24 px-4">

      <div className="max-w-4xl mx-auto space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="text-gray-400">
            Manage your connected accounts.
          </p>

        </div>

        {/* Account Overview */}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Account Overview
          </h2>

          <p>
            <span className="text-gray-400">
              Name:
            </span>{" "}
            {user?.name}
          </p>

          <p>
            <span className="text-gray-400">
              Email:
            </span>{" "}
            {user?.email}
          </p>

        </div>

        {/* Social Accounts */}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Social Accounts
          </h2>

          {/* YouTube */}

          <div className="flex items-center justify-between border border-white/10 rounded-xl p-4">

            <div>

              <h3 className="font-medium">
                YouTube
              </h3>

              {
                user?.socialAccounts?.youtube?.connected ? (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        YT
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {user?.socialAccounts?.youtube?.channelTitle}
                      </p>

                      <p className="text-sm text-gray-400 truncate">
                        {user?.socialAccounts?.youtube?.channelHandle}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                      Connected
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-bold">
                        YT
                      </span>
                    </div>

                    <span className="text-gray-400">
                      Not Connected
                    </span>
                  </div>
                )
              }

            </div>

            <button
              onClick={connectYoutube}
              disabled={loading}
              className="px-4 py-2 cursor-pointer bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {
                loading
                  ? "Connecting..."
                  : user?.socialAccounts?.youtube?.connected
                    ? "Reconnect"
                    : "Connect"
              }
            </button>

          </div>

          {/* Instagram */}

          <div className="flex items-center justify-between border border-white/10 rounded-xl p-4 mt-4">

            <div>

              <h3 className="font-medium">
                Instagram
              </h3>

              {
                user?.socialAccounts?.instagram?.connected
                  ? (
                    <p className="text-green-400 text-sm">
                      Connected
                    </p>
                  )
                  : (
                    <p className="text-gray-400 text-sm">
                      Not Connected
                    </p>
                  )
              }

            </div>

            <button
              className="px-4 py-2 bg-pink-600 rounded-lg opacity-50 cursor-not-allowed"
            >
              Coming Soon
            </button>

          </div>

          {/* Facebook */}

          <div className="flex items-center justify-between border border-white/10 rounded-xl p-4 mt-4">

            <div>

              <h3 className="font-medium">
                Facebook
              </h3>

              {
                user?.socialAccounts?.facebook?.connected
                  ? (
                    <p className="text-green-400 text-sm">
                      Connected
                    </p>
                  )
                  : (
                    <p className="text-gray-400 text-sm">
                      Not Connected
                    </p>
                  )
              }

            </div>

            <button
              className="px-4 py-2 bg-blue-600 rounded-lg opacity-50 cursor-not-allowed"
            >
              Coming Soon
            </button>

          </div>

        </div>

      </div>

    </main>

  );

}