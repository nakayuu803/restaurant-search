import { parseEnv } from "util";
import { GeoLocation } from "./geoLocation";

export interface Shop {
    id: string;
    name: string;
    logo_image: string;
    address: string;
    genre: {
    name: string;
    catch: string;
    };
    access: string;
    urls: {
    pc: string;
    };
    photo: {
    pc: string;
    };
    open: string;
    close: string;
}

export const fetchSearchResults = async(
    keyword: string,
    range: string
): Promise<Shop[]> => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;
    const apiKey = process.env.NEXT_PUBLIC_APIKEY;
    const { latitude, longitude } = await GeoLocation();
    
    const searchURL = `/api/proxy?keyword=${encodeURIComponent(keyword)}&range=${range}&lat=${latitude}&lng=${longitude}`;

    const respons = await fetch(searchURL);
    const textData = await respons.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(textData, "application/xml");

    const shops = Array.from(xml.getElementsByTagName("shop")).map((shop) => ({
        id: shop.getElementsByTagName("id")[0]?.textContent ?? "",
        name: shop.getElementsByTagName("name")[0]?.textContent ?? "",
        logo_image: shop.getElementsByTagName("logo_image")[0]?.textContent ?? "",
        address: shop.getElementsByTagName("address")[0]?.textContent ?? "",
        genre: {
          name: shop.getElementsByTagName("name")[1]?.textContent ?? "",
          catch: shop.getElementsByTagName("catch")[0]?.textContent ?? "",
        },
        access: shop.getElementsByTagName("access")[0]?.textContent ?? "",
        urls: {
          pc: shop.getElementsByTagName("pc")[0]?.textContent ?? "",
        },
        photo: {
          pc: shop.getElementsByTagName("m")[0]?.textContent ?? "",
        },
        open: shop.getElementsByTagName("open")[0]?.textContent ?? "",
        close: shop.getElementsByTagName("close")[0]?.textContent ?? "",
      }));
    
      return shops;
}