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

const AdminExaminationsTable = ({ examinations, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-max divide-y divide-gray-200 w-full">
        <thead className="bg-gray-200 text-textColor text-right text-xs font-medium tracking-wider uppercase">
          <tr>
            <th className="px-6 py-3">اسم المريض</th>
            <th className="px-6 py-3">وصف الحالة</th>
            <th className="px-6 py-3">التاريخ</th>
            <th className="px-6 py-3">الأدوية</th>
            <th className="px-6 py-3">ملاحظات</th>
            <th className="px-6 py-3 text-center">عرض التقرير</th>
            <th className="px-6 py-3 text-center">تفاصيل الفحص</th>
            <th className="px-6 py-3 text-center">حذف</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {examinations.map((exam) => (
            <tr key={exam.id}>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {exam.patient?.full_name || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
              
                {exam.description_of_status ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDetails(exam)}
                      >
                        وصف الحالة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md  text-end h-[90vh]">
                      <DialogHeader className="p-0 m-0 block">
                        <DialogTitle className="p-0 m-0"> </DialogTitle>
                        <DialogDescription className="p-0 m-0"></DialogDescription>
                        <div className=" text-gray-800 text-start pt-6">
                          <p>
                            <strong>وصف الحالة: </strong> {exam.notes}
                          </p>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {exam.time || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
           
                {exam.medications_taken ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDetails(exam)}
                      >
                        الأدوية
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md  text-end h-[90vh]">
                      <DialogHeader className="p-0 m-0 block">
                        <DialogTitle className="p-0 m-0"> </DialogTitle>
                        <DialogDescription className="p-0 m-0"></DialogDescription>
                        <div className=" text-gray-800 text-start pt-6">
                          <p>
                            <strong>الأدوية: </strong> {exam.notes}
                          </p>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {exam.notes ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDetails(exam)}
                      >
                        ملاحظات
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md  text-end h-[90vh]">
                      <DialogHeader className="p-0 m-0 block">
                        <DialogTitle className="p-0 m-0"> </DialogTitle>
                        <DialogDescription className="p-0 m-0"></DialogDescription>
                        <div className=" text-gray-800 text-start pt-6">
                          <p>
                            <strong>ملاحظات: </strong> {exam.notes}
                          </p>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ) : (
                  "-"
                )}
              </td>

              {/* عمود عرض التقرير */}
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {exam.report ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSelectedImage(
                            `https://lavenderblush-owl-178559.hostingersite.com${exam.report}`
                          )
                        }
                      >
                        عرض التقرير
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-6 h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>تقرير الفحص</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <img
                        src={selectedImage}
                        alt="تقرير الفحص"
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

              {/* عمود تفاصيل الفحص */}
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDetails(exam)}
                    >
                      تفاصيل الفحص
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md p-6 text-right h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>تفاصيل الفحص</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 mt-4 text-gray-800">
                      <p>
                        <strong>التاريخ: </strong>{" "}
                        {selectedDetails?.time || "-"}
                      </p>
                      <p>
                        <strong>تاريخ مرضي:</strong>{" "}
                        {selectedDetails?.sick_history || "-"}
                      </p>
                      <p>
                        <strong>الأدوية:</strong>{" "}
                        {selectedDetails?.medications_taken || "-"}
                      </p>
                      <p>
                        <strong>ملاحظات:</strong>{" "}
                        {selectedDetails?.notes || "-"}
                      </p>
                      <p>
                        <strong>تاريخ الحساسية الدوائية:</strong>{" "}
                        {selectedDetails?.history_of_drug_allergy || "-"}
                      </p>
                      <p>
                        <strong>التاريخ الجراحي:</strong>{" "}
                        {selectedDetails?.surgical_history || "-"}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </td>

              {/* عمود حذف */}
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete && onDelete(exam.id)}
                >
                  حذف
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminExaminationsTable;
