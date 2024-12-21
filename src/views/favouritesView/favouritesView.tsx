import { useEffect, useState } from "react";
import theCatAPI from "@api/catApiClient";
import { Image } from "antd";
import type { Favourite as FavouriteImage } from "@api/types";

export default function FavouritesView() {
  const [favouriteImages, setFavouriteImages] = useState<FavouriteImage[]>([]);

  useEffect(() => {
    theCatAPI.favourites.getFavourites().then((favouriteImages) => {
      console.log(favouriteImages);
      setFavouriteImages([...favouriteImages]);
    });
  }, []);

  return (
    <div>
      {favouriteImages.map((item) => (
        <Image key={item.image.id} src={item.image.url} />
      ))}
    </div>
  );
}
