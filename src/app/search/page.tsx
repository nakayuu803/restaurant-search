"use client"
import { useState } from "react";
import { GeoLocation } from "../api/geoLocation";
import { fetchSearchResults, Shop } from "../api/searchResult";

// interface SearchProps {
//   searchParams: {
//     keyword? : string
//   }
// }

export default function SearchPage() {
  const [Keyword, setKeyword] = useState("");
  const [range, setRange] = useState("3")
  const [searchResults, setSearchResults] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter()

  const handleSearch = async() => {
    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const result = await fetchSearchResults(Keyword, range);
      setSearchResults(result);
    }catch(err) {
      setError("検索に失敗したよ");
      console.error(err);
    }finally {
      setLoading(false);
    }
  }
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center shadow-lg rounded-lg overflow-hidden bg-white w-full max-w-2xl mt-4 mx-auto h-15">
        <select 
          className="text-gray-700 px-4 py-2 outline-none  hover:bg-gray-100"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="1">300m</option>
          <option value="2">500m</option>
          <option value="3">1km</option>
          <option value="4">2km</option>
          <option value="5">3km</option>
        </select>

        <div className="border-l border-gray-300 h-8"></div>
        
        <input 
          className="flex-1 px-4 py-2 text-gray-700 outline-none"
          type="text"
          value={Keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="店名、駅名、ジャンルなど"
          />
        <button 
          onClick={handleSearch}
          className="bg-red-600 text-white flex-shrink-0 px-4 py-2 ml-4 rounded-lg rounded-tl-none rounded-bl-none hover:bg-red-700 rounded-tr-lg rounded-br-lg transition w-24 h-15"
        >検索</button>
      </div>
      <div className="flex max-w-2xl mx-auto items-center mt-24">
        <div className="border-l-4 border-red-600 h-8 mr-4"></div>
        <p className="text-lg font-semibold">条件と一致した店舗</p>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <div className="mt-6 rounded-lg max-w-2xl mx-auto">
        {loading && <p>検索中...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {searchResults.map((shop) => (
          <div
          key={shop.id}
          className="flex p-4 mb-4 bg-white shadow-md rounded-lg max-w-2xl mx-auto"
        >
          {/* 左側の画像 */}
          <img
            src={shop.logo_image}
            alt={shop.name}
            className="w-24 h-24 object-cover rounded-lg"
          />

          {/* 右側のテキスト */}
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-bold">{shop.name}</h3>
            <p className="text-sm text-gray-600">
              {shop.genre.name} / {shop.genre.catch}
            </p>
            <p className="text-sm text-gray-600">{shop.access}</p>
            <a
              href={shop.urls.pc}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 underline"
            >
              店舗URL: {shop.urls.pc}
            </a>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}