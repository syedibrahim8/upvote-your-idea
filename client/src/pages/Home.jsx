import { useState } from "react";
import LogoLoop from "../components/LogoLoop";


// Notice
const techLogos = [
  { node: <span>1. Submit your product.</span> },
  { node: <span>2. Product with high vote wins.</span> },
  { node: <span>3. Contest starts 25–26 January.</span> },
];


// Products
const products = [
  {
    id: 1,
    name: "LeafGrid.in (Application)",
    url: "leafgrid.base44.app",
    points: 39192,
    days: "4 days ago",
    desc: "Hydroponic tower management app.",
    winner: true,
  },
  {
    id: 2,
    name: "Anqair",
    url: "anqair.com",
    points: 21069,
    days: "5 days ago",
    desc: "Design → Code at the speed of thought",
  },
  {
    id: 3,
    name: "hifz.online",
    url: "hifz.online",
    points: 2393,
    days: "5 days ago",
    desc: "Learn Quran online.",
  },
  {
    id: 4,
    name: "FinishDSA",
    url: "finishdsa.com",
    points: 16,
    days: "5 days ago",
    desc: "DSA practice platform.",
  },
  {
    id: 5,
    name: "Trueskin",
    url: "trueskin.app",
    points: 14,
    days: "5 days ago",
    desc: "Best collagen masks",
  },
  {
    id: 6,
    name: "Feel by goodmind",
    url: "feelbygoodmind.vercel.app",
    points: 12,
    days: "5 days ago",
    desc: "Flagship event app.",
  },
];


export default function Home() {

  const [tab, setTab] = useState("all");


  // Filter logic
  const trending = [...products].sort((a, b) => b.points - a.points);
  const winners = products.filter(p => p.winner);


  const getList = () => {
    if (tab === "trending") return trending;
    if (tab === "winners") return winners;
    return products;
  };

  const list = getList();


  return (
    <div className="min-h-screen bg-[#faf9f7] text-gray-900">

      <div className="max-w-4xl mx-auto px-4 py-8">


        {/* NOTICE BAR */}
        <div className="border border-gray-200 bg-white h-12 mb-6 overflow-hidden flex items-center px-2">

          <LogoLoop
            logos={techLogos}
            speed={20}
            direction="left"
            logoHeight={18}
            gap={40}
          />

        </div>


        {/* SEARCH */}
        <input
          type="text"
          placeholder="search products..."
          className="border border-gray-300 px-3 py-2 w-72 rounded mb-4 focus:outline-none"
        />


        {/* TABS */}
        <div className="mb-6 text-sm flex gap-3 items-center">

          {["all", "trending", "winners"].map((t, i) => (
            <div key={t} className="flex items-center gap-3">

              <button
                onClick={() => setTab(t)}
                className={`capitalize transition ${
                  tab === t
                    ? "text-orange-500 font-semibold"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {t}
              </button>

              {i < 2 && <span className="text-gray-400">|</span>}

            </div>
          ))}

        </div>


        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-5">

          {tab === "winners" ? "Hall of Fame" : "Top Products"}

        </h2>


        {/* PRODUCT LIST */}
        <div className="space-y-6">


          {list.length === 0 && (
            <p className="text-gray-500">
              No products found.
            </p>
          )}


          {list.map((item, index) => (

            <div
              key={item.id}
              className="flex justify-between gap-4 pb-5 border-b border-gray-200"
            >


              {/* LEFT INFO */}
              <div className="flex-1">

                <h3 className="font-semibold text-base">

                  {item.name}

                  <span className="text-sm text-gray-500 ml-1">
                    ({item.url})
                  </span>

                </h3>


                <div className="text-xs text-gray-500 my-1 flex items-center gap-2 flex-wrap">

                  <span>
                    {index + 1}. {item.points} points
                  </span>

                  <span>|</span>

                  <span>{item.days}</span>

                  <span>|</span>

                  <span className="cursor-pointer hover:underline">
                    share
                  </span>

                  {item.winner && (
                    <span className="text-orange-500 ml-1">
                      ★ winner
                    </span>
                  )}

                </div>


                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.desc}
                </p>

              </div>


              {/* RIGHT VOTE */}
              <div className="min-w-[64px] h-fit border border-gray-200 bg-white rounded text-center py-2 cursor-pointer hover:border-orange-400 transition">

                <div className="text-sm">▲</div>

                <div className="font-semibold text-sm">
                  {item.points}
                </div>

              </div>

            </div>

          ))}

        </div>


      </div>

    </div>
  );
}
