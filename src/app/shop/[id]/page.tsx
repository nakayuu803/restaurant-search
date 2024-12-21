"use client"
import { fetchShopDetails, ShopDetails } from "@/app/api/fetchShopDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ShopDetailsPage() {
    const { id } = useParams();
    const [shopDetails, setShopDetails] = useState<ShopDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    // fetchする定数
    const loadShopDetails = async () => {
        setError(null);
        setShopDetails(null);
        if (typeof id !== "string") {
            setError("無効なIDです");
            return;
        }

        try {
            const details = await fetchShopDetails(id);
            setShopDetails(details);
        } catch (err) {
            setError("検索に失敗したよ");
            console.error(err);
        }
    };

    useEffect(() => {
        loadShopDetails();
    }, [id]);

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    if (!shopDetails) {
        return <div className="p-4">ロード中...</div>;
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="rounded-lg p-6 max-w-5xl w-full">
                <div className="flex items-center mb-6">
                    <img
                        src={shopDetails.logo_image}
                        alt={shopDetails.name}
                        className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="ml-4 flex flex-col justify-center">
                        <div className="flex mb-2">
                        <div className="border-l-4 border-red-600 h-8 mr-4"></div>
                        <h1 className="text-2xl font-bold">{shopDetails.name}</h1>
                        </div>
                        <p className="text-gray-600">{`${shopDetails.genre.name} / ${shopDetails.genre.catch}`}</p>
                    </div>
                    
                </div>

                <div className="bg-white">
                <div className="mb-6 bg-white p-6 flex justify-start">
                    <img
                        src={shopDetails.photo.pc}
                        alt={shopDetails.name}
                        className=" max-h-[calc(100vh-50px)] object-contain rounded-md"
                    />
                </div>

                <div className="p-6">
                    <div className="flex justify-start mb-4">
                        <div className="border-l-4 border-red-600 h-8 mr-4"></div>
                        <p className="text-lg font-semibold">店舗の情報</p>
                    </div>
                    <table className="min-w-full table-auto border-collapse border border-gray-300 ">
                        <tbody>
                            <tr className="border-b border-gray-300">
                                <td className="font-bold py-2 px-4 bg-gray-100 border border-gray-300 rounded-tl-lg">{`住所:`}</td>
                                <td className="py-2 px-4">{shopDetails.address}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <td className="font-bold py-2 px-4 bg-gray-100 border border-gray-300">{`営業時間:`}</td>
                                <td className="py-2 px-4">{shopDetails.open}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <td className="font-bold py-2 px-4 bg-gray-100 border border-gray-300">{`交通アクセス:`}</td>
                                <td className="py-2 px-4">{shopDetails.access}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <td className="font-bold py-2 px-4 bg-gray-100 border border-gray-300">{`店舗URL:`}</td>
                                <td className="py-2 px-4">
                                    <a href={shopDetails.urls.pc} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                        {shopDetails.urls.pc}
                                    </a>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <td className="font-bold py-2 px-4 bg-gray-100 border border-gray-300">{`料金備考:`}</td>
                                <td className="py-2 px-4">{shopDetails.budget_memo}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <td className="font-bold py-2 px-4 bg-gray-100 border border-gray-300">{`駐車場:`}</td>
                                <td className="py-2 px-4">{shopDetails.parking}</td>
                            </tr>
                            <tr>
                                <td className="font-bold py-2 px-4 bg-gray-100 border border-gray-300 rounded-bl-lg">{`お店のキャッチ:`}</td>
                                <td className="py-2 px-4">{shopDetails.catch}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
};

