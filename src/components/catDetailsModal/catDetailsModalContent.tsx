import { Image, Typography } from "antd";
import BreedDetails from "@components/catDetailsModal/breedDetails";
import type { Breed } from "@api/types";
import classes from "@components/catDetailsModal/catDetailsModal.module.scss";

const { Title, Text } = Typography;

export default function CatDetailsModalContent({
  url,
  breeds,
}: {
  url: string | undefined;
  breeds: Breed[] | undefined;
}) {
  return (
    <>
      <Image
        src={url}
        alt={
          breeds?.[0].name
            ? `image cat of breed ${breeds[0].name}`
            : "cat image"
        }
      />
      <Title level={3} className={classes.breedInfoTitle}>
        Breed information
      </Title>
      {breeds && breeds.length > 0 ? (
        breeds.map((breed) => (
          <div key={breed.id}>
            <BreedDetails breed={breed as Breed} />
          </div>
        ))
      ) : (
        <Text>No breed information available for this cat.</Text>
      )}
    </>
  );
}
