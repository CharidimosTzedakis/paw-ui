import { Modal } from "antd";
import { useLocation } from "wouter";

export default function CatDetailsModal({ id }: { id: string }) {
  const [, setLocation] = useLocation();

  const handleClose = () => {
    setLocation("/");
  };

  return (
    <Modal
      title={`Cat Details - ${id}`}
      open
      footer={null}
      onCancel={handleClose}
    >
      <p>Details about the cat...</p>
    </Modal>
  );
}
