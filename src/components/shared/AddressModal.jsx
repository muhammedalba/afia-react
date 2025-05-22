import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
    } from "@/components/ui/dialog";

const AddressModal = ({ open, onClose, address }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-right">
        <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
          <h3 className="text-lg font-bold text-bgColor">عنوان الطبيب</h3>
        </DialogHeader>
        <p className="text-sm text-gray-700">
          {address || "لا يوجد عنوان متاح"}
        </p>
      </DialogContent>
    </Dialog>
  );
};
export default AddressModal;
