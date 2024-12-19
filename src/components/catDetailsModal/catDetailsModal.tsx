import { useState, useEffect } from "react";
import { Modal, Image } from "antd";
import { useLocation } from "wouter";
import theCatAPI from "@api/catApiClient";
import type { Image as CatImage, Breed } from "@api/types";
import BreedDetails from "./BreedDetails";
import classes from "./catDetailsModal.module.scss";

export default function CatDetailsModal({ id }: { id: string }) {
  const [, setLocation] = useLocation();
  const [catImage, setCatImage] = useState<CatImage>();
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    setLocation("/");
  };

  useEffect(() => {
    theCatAPI.images
      .getImage(id)
      .then((image) => {
        setCatImage(image);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <Modal
      title="Cat details"
      className={classes.catDetailsModal}
      loading={isLoading}
      open
      footer={null}
      onCancel={handleClose}
      style={{ top: 20 }}
      width={800}
    >
      <Image src={catImage?.url} />
      {catImage?.breeds?.map((breed) => {
        return (
          <div>
            <BreedDetails breed={breed as Breed} />
          </div>
        );
      })}
    </Modal>
  );
}
