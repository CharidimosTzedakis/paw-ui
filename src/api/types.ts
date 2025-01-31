import { Image, Favourite } from "@thatapicompany/thecatapi/dist/types";
import { Breed as AvailableBreedsEnumType } from "@thatapicompany/thecatapi/dist";

type Weight = {
  imperial: string;
  metric: string;
};

type Breed = Record<string, string | number | object | Weight> & { id: string };

export type { Image, Favourite, Breed, AvailableBreedsEnumType };
