import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import Preloader from "../Preloader/Preloader";

// حالة التبرع
const DonationStatus = ({ status }) => {
  const isApproved = status === "approved";
  return (
    <span
      className={`px-2 py-1 rounded text-sm ${
        isApproved
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-yellow-800"
      }`}
    >
      {isApproved ? "مقبول" : "بانتظار الموافقة"}
    </span>
  );
};

// التقرير الطبي مع حركة لطيفة عند فتح الصورة
const MedicalReportViewer = ({ reportUrl, onOpen }) => {
  if (!reportUrl?.includes("/medical_report/")) {
    return <span className="text-gray-400 italic text-sm">لا يوجد تقرير</span>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => onOpen(reportUrl)}>
          عرض التقرير
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-6 h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>التقرير الطبي</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={reportUrl}
          alt="التقرير الطبي"
          className="w-full h-auto rounded-md shadow-md mt-4"
        />
      </DialogContent>
    </Dialog>
  );
};

// زر تعديل الحالة
const StatusActionButton = ({ status, onConfirm, loading }) => {
  const isApproved = status === "approved";
  return (
    <ConfirmDialog
      trigger={
        <Button
          disabled={loading}
          variant="ghost"
          className={
            isApproved
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }
        >
          {isApproved ? "الغاء" : "قبول"}
        </Button>
      }
      title={isApproved ? "تأكيد الإلغاء" : "قبول الطلب"}
      description={
        isApproved
          ? "هل أنت متأكد من الغاء هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء."
          : "هل أنت متأكد من قبول الطلب ؟ لا يمكن التراجع عن هذا الإجراء."
      }
      className={
        isApproved
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      }
      onConfirm={onConfirm}
    />
  );
};

const AdminDonationsTable = ({
  donations,
  onDelete,
  LoadingApprove,
  Approve_donation,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="overflow-x-auto w-full">
      {LoadingApprove && <Preloader />}
      <table className="min-w-max divide-y divide-gray-200 w-full">
        <thead className="bg-gray-200 text-textColor text-right text-xs font-medium tracking-wider uppercase">
          <tr>
            <th className="px-6 py-3">المدينة</th>
            <th className="px-6 py-3">عدد الوحدات</th>
            <th className="px-6 py-3">فصيلة الدم</th>
            <th className="px-6 py-3">الحالة</th>
            <th className="px-6 py-3">تاريخ الإنشاء</th>
            <th className="px-6 py-3 text-center">التقرير الطبي</th>
            <th className="px-6 py-3 text-center">تعديل الحالة</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {donations?.map((donation, index) => {
            const reportUrl = donation.medical_report
              ? `https://lavenderblush-owl-178559.hostingersite.com${donation.medical_report}`
              : null;

            return (
              <motion.tr
                key={donation.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
                style={{ originX: 0 }}
                transition={{ delay: index * 0.3,stiffness: 100, duration: 0.5 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {donation.city || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {donation.units_needed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {donation.blood_type?.toUpperCase() || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <DonationStatus status={donation.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {donation.created_at
                    ? new Date(donation.created_at).toLocaleDateString("ar-EG")
                    : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <MedicalReportViewer
                    reportUrl={reportUrl}
                    onOpen={setSelectedImage}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <StatusActionButton
                    status={donation.status}
                    loading={LoadingApprove}
                    onConfirm={() =>
                      donation.status === "approved"
                        ? onDelete(donation.id)
                        : Approve_donation(donation.id)
                    }
                  />
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDonationsTable;
