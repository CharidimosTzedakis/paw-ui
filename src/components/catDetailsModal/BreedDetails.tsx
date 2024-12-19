import type { Breed } from "@api/types";
import { snakeToTitleCase, isValidURL } from "@utils/stringUtils";

const omittedProps = ["id", "country_codes", "reference_image_id"];

export default function BreedDetails({ breed }: { breed: Breed }) {
  const keysWithStringValues = Object.keys(breed)
    .filter((key) => typeof breed[key as keyof Breed] === "string")
    .filter((key) => !omittedProps.includes(key))
    .filter((key) => !isValidURL(breed[key as keyof Breed] as string)) as Array<
    keyof Breed
  >;

  const keysWithURLs = Object.keys(breed)
    .filter((key) => typeof breed[key as keyof Breed] === "string")
    .filter((key) => !omittedProps.includes(key))
    .filter((key) => isValidURL(breed[key as keyof Breed] as string)) as Array<
    keyof Breed
  >;

  return (
    <ul>
      {keysWithStringValues.map((key) => {
        const value = breed[key] as string;
        return (
          <li key={key}>
            <strong>{snakeToTitleCase(key)}: </strong>
            {value ? value : "-"}
          </li>
        );
      })}
      {keysWithURLs.map((key) => {
        const value = breed[key] as string;
        return (
          <li key={key}>
            <strong>{snakeToTitleCase(key)}: </strong>
            <a href={value} target="_blank">
              {value}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
