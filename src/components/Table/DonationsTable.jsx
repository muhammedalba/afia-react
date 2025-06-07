import React, { useState } from "react";
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
import { Icon } from "@iconify/react";

const AdminDonationsTable = ({
  donations,
  onDelete,
  LoadingApprove,
  Approve_donation,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-max divide-y divide-gray-200 w-full">
        <thead className="bg-gray-200 text-textColor text-right text-xs font-medium tracking-wider uppercase">
          <tr>
            <th className="px-6 py-3">المدينة</th>
            <th className="px-6 py-3">عدد الوحدات</th>
            <th className="px-6 py-3">فصيلة الدم</th>
            <th className="px-6 py-3">الحالة</th>
            <th className="px-6 py-3">تاريخ الإنشاء</th>
            <th className="px-6 py-3 text-center">التقرير الطبي</th>
            <th className="px-6 py-3 text-center">حذف</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {donations?.map((donation) => (
            <tr key={donation.id}>
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
                {donation?.status === "approved" ? (
                  <span
                    className={
                      "px-2 py-1 rounded text-white text-xs bg-green-600"
                    }
                  >
                    {donation.status}
                  </span>
                ) : (
                  <ConfirmDialog
                    trigger={
                      <Button
                        disabled={LoadingApprove}
                        variant="ghost"
                        className={`px-2 py-1 rounded text-white text-xs ${
                          donation.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-600"
                        }`}
                      >
                        {LoadingApprove ? (
                          <Icon
                            icon="eos-icons:loading"
                            width="75"
                            height="75"
                            color="white"
                            className="bg-bgColor rounded-md"
                          />
                        ) : (
                          donation.status
                        )}
                      </Button>
                    }
                    title="تأكيد الإجراء"
                    className="bg-red-600 text-white hover:bg-red-700"
                    description="هل أنت متأكد من تغير الحالة ؟ لا يمكن التراجع عن هذا الإجراء."
                    onConfirm={() => Approve_donation(donation.id)}
                  />
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {donation.created_at
                  ? new Date(donation.created_at).toLocaleDateString("ar-EG")
                  : "-"}
              </td>

              {/* التقرير الطبي */}
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {donation.medical_report &&
                donation.medical_report.includes("/medical_report/") ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSelectedImage(
                            `https://lavenderblush-owl-178559.hostingersite.com${donation.medical_report}`
                          )
                        }
                      >
                        عرض التقرير
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-6 h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>التقرير الطبي</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <img
                        src={selectedImage}
                        alt="التقرير الطبي"
                        className="w-full h-auto rounded-md shadow-md mt-4"
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <span className="text-gray-400 italic text-sm">
                    لا يوجد تقرير
                  </span>
                )}
              </td>

              {/* حذف */}
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <ConfirmDialog
                  trigger={
                    <Button
                      disabled={LoadingApprove}
                      variant="ghost"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {LoadingApprove ? (
                        <Icon
                          icon="eos-icons:loading"
                          width="24"
                          height="24"
                          color="white"
                          className="animate-spin"
                        />
                      ) : (
                        "الالغاء"
                      )}
                    </Button>
                  }
                  title="تأكيد الالغاء"
                  className="bg-red-600 text-white hover:bg-red-700"
                  description="هل أنت متأكد من الغاء هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء."
                  onConfirm={() => onDelete && onDelete(donation.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDonationsTable;
