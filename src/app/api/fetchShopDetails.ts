// import { ShopIdProps } from "../shop/[id]/page";
import { GeoLocation } from "./geoLocation";

export interface ShopDetails {
    id: string;
    name: string;
    logo_image: string;
    address: string;
    genre: {
        name: string;
        catch: string;
    };
    budget_memo: string;
    catch: string;
    access: string;
    urls: {
        pc: string;
    };
    photo: {
        pc: string;
    };
    open: string;
    close: string;
    parking: string;
}

export const fetchShopDetails = async(
    shopId: string,
): Promise<ShopDetails | null> => {
    const searchURL = `/api/proxy?id=${shopId}`;

    try{
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
        budget_memo: shop.getElementsByTagName("budget_memo")[0]?.textContent ?? "",
        catch: shop.getElementsByTagName("catch")[0]?.textContent ?? "",
        access: shop.getElementsByTagName("access")[0]?.textContent ?? "",
        urls: {
          pc: shop.getElementsByTagName("pc")[0]?.textContent ?? "",
        },
        photo: {
          pc: shop.getElementsByTagName("l")[0]?.textContent ?? "",
        },
        open: shop.getElementsByTagName("open")[0]?.textContent ?? "",
        close: shop.getElementsByTagName("close")[0]?.textContent ?? "",
        parking: shop.getElementsByTagName("parking")[0]?.textContent ?? "",
      }));

      return shops.length > 0 ? shops[0] : null;

    }catch (error) {
      console.error("shopDetailsのfetchに失敗したよ");
      return null;
    }
}