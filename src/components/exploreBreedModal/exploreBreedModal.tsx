import { Modal } from "antd";
import { useLocation } from "wouter";

export default function ExploreBreedModal({ breedId }: { breedId: string }) {
  const [, setLocation] = useLocation();

  return (
    <Modal
      open
      title="breed modal"
      footer={null}
      onCancel={() => {
        setLocation("/");
      }}
      style={{ top: 20 }}
      width={800}
    >
      {breedId}
    </Modal>
  );
}
