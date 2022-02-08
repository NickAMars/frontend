import Button from "@mui/material/Button";

export default function AddGroupButton({ open }) {
  // opens the model up to use
  const openModal = () => {
    open();
  };
  return (
    <Button variant="outlined" onClick={openModal}>
      Add Group
    </Button>
  );
}
