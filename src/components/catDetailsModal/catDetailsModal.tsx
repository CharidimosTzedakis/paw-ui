import { Modal } from "antd";

export default function CatDetailsModal({ id }: { id: string }) {
  return (
    <Modal
      title={`Cat Details - ${id}`}
      open
      footer={null}
      onCancel={() => window.history.back()} // Close modal and navigate back
    >
      <p>Details about the cat...</p>
    </Modal>
  );
}
