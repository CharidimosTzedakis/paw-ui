import { Link } from "wouter";
import type { Breed } from "@api/types";
import { snakeToTitleCase, isValidURL } from "@utils/stringUtils";

const omittedProps = ["id", "country_codes", "reference_image_id"];

const BreedProperty = ({
  breedId,
  propKey,
  value,
}: {
  breedId: string;
  propKey: string;
  value: string;
}) => {
  return (
    <li key={propKey}>
      <strong>{snakeToTitleCase(propKey)}: </strong>
      {propKey === "name" ? (
        <Link to={`../../breeds/${breedId}`}>{value}</Link>
      ) : (
        value || "-"
      )}
    </li>
  );
};

const isEntryWithValueType =
  (type: string) =>
  (entry: [keyof Breed, Breed[keyof Breed]]): entry is [keyof Breed, string] =>
    typeof entry[1] === type;

export default function BreedDetails({ breed }: { breed: Breed }) {
  const breedPropsWithText = Object.entries(breed)
    .filter(isEntryWithValueType("string"))
    .filter(([key]) => !omittedProps.includes(key));
  const breedPropsWithURLs = breedPropsWithText.filter((entry) =>
    isValidURL(entry[1]),
  );

  return (
    <ul>
      {breedPropsWithText.map(([key, value]) => {
        return (
          <BreedProperty
            breedId={breed["id"]}
            key={key}
            propKey={key}
            value={value}
          />
        );
      })}
      {breedPropsWithURLs.map(([key, value]) => {
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
