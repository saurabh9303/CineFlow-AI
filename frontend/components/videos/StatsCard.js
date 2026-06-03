"use client";

export default function StatsCard({
   title,
   value,
}) {

   return (

      <div
         className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-5
            hover:border-cyan-500/30
            transition-all
            duration-300
         "
      >

         <p
            className="
               text-sm
               text-zinc-400
               mb-2
            "
         >
            {title}
         </p>

         <h3
            className="
               text-3xl
               font-bold
               tracking-tight
            "
         >
            {value}
         </h3>

      </div>

   );

}