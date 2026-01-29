const products = [
  {
    id: 1,
    name: "LeafGrid.in",
    url: "leafgrid.base44.app",
    points: 39192,
    days: "4 days ago",
    desc: "Hydroponic tower app",
  },
  {
    id: 2,
    name: "Anqair",
    url: "anqair.com",
    points: 21069,
    days: "5 days ago",
    desc: "Design → Code",
  },
];

export default function Products() {
  return (
    <div>

      <h1 className="text-2xl font-semibold mb-4">All Products</h1>

      <input
        placeholder="search..."
        className="border px-3 py-2 w-72 rounded mb-4"
      />

      <div className="mb-6 text-sm">
        <span className="text-orange-500 font-semibold">all</span> | trending | winners
      </div>

      <div className="space-y-6">
        {products.map((p, i) => (
          <div
            key={p.id}
            className="grid grid-cols-[1fr_70px] gap-4 items-center"
          >

            <div>
              <h3 className="font-semibold">
                {p.name} <span className="text-gray-500">({p.url})</span>
              </h3>

              <div className="text-xs text-gray-500">
                {i + 1}. {p.points} points | {p.days}
              </div>

              <p className="text-sm">{p.desc}</p>
            </div>

            <div className="border bg-white rounded text-center py-2">
              ▲<div className="font-semibold">{p.points}</div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
