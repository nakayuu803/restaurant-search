export async function GeoLocation(): Promise<{ latitude: number, longitude: number }> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject("位置情報の取得に失敗しました: " + error.message);
                }
            )
        }
    })
}
