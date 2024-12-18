"use client"
import { env } from "process";
import { useState } from "react";

// interface SearchProps {
//   searchParams: {
//     keyword? : string
//   }
// }

export default function SearchPage() {
  const [Keyword, setKeyword] = useState("");
  const [range, setRange] = useState("3")
  // const router = useRouter()

  const handleSearch = () => {
    const baseURL = process.env.API_BASEURL;
    const searchURL = `${baseURL}?keyword=${encodeURIComponent(Keyword)}&range=${range}`;
    console.log("検索URL:", searchURL);
    alert("検索URL:"+ searchURL);
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
    </div>
  );
}