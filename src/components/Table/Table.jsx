import React from "react";
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
import { motion } from "framer-motion";

const DialogView = ({ triggerText, contentTitle, content }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm">
        {triggerText}
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-md text-end h-[90vh]">
      <DialogHeader>
        <DialogTitle>{contentTitle}</DialogTitle>
        <DialogDescription />
        <div className="text-gray-800 text-start pt-6 overflow-auto max-h-[60vh] whitespace-pre-wrap">
          {content}
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

const AdminExaminationsTable = ({ examinations, onDelete, LoadingDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="overflow-x-auto w-full"
    >
      <motion.table
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{ duration: 0.5 }}
        className="min-w-max divide-y divide-gray-200 w-full"
      >
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
          {examinations?.map((exam, index) => (
            <motion.tr
              key={`${exam.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5,stiffness: 100, delay: index * 0.05 }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
              style={{ originX: 0 }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {exam.patient?.full_name || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {exam.description_of_status ? (
                  <DialogView
                    triggerText="وصف الحالة"
                    contentTitle="وصف الحالة"
                    content={<p>{exam.description_of_status}</p>}
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {exam.time || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {exam.medications_taken ? (
                  <DialogView
                    triggerText="الأدوية"
                    contentTitle="الأدوية"
                    content={<p>{exam.medications_taken}</p>}
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {exam.notes ? (
                  <DialogView
                    triggerText="ملاحظات"
                    contentTitle="ملاحظات"
                    content={<p>{exam.notes}</p>}
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {exam.report ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        عرض التقرير
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-6 h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>تقرير الفحص</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <motion.img
                        src={`https://lavenderblush-owl-178559.hostingersite.com${exam.report}`}
                        alt="تقرير الفحص"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
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
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      تفاصيل الفحص
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md p-6 text-right h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>تفاصيل الفحص</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3 mt-4 text-gray-800"
                    >
                      <p>
                        <strong>التاريخ: </strong> {exam.time || "-"}
                      </p>
                      <p>
                        <strong>تاريخ مرضي:</strong> {exam.sick_history || "-"}
                      </p>
                      <p>
                        <strong>الأدوية:</strong>{" "}
                        {exam.medications_taken || "-"}
                      </p>
                      <p>
                        <strong>ملاحظات:</strong> {exam.notes || "-"}
                      </p>
                      <p>
                        <strong>تاريخ الحساسية الدوائية:</strong>{" "}
                        {exam.history_of_drug_allergy || "-"}
                      </p>
                      <p>
                        <strong>التاريخ الجراحي:</strong>{" "}
                        {exam.surgical_history || "-"}
                      </p>
                    </motion.div>
                  </DialogContent>
                </Dialog>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <ConfirmDialog
                  trigger={
                    <Button
                      disabled={LoadingDelete}
                      variant="ghost"
                      className="bg-bgColor hover:bg-red-700 text-white hover:text-white"
                    >
                      {LoadingDelete ? (
                        <Icon
                          icon="eos-icons:loading"
                          width="75"
                          height="75"
                          color="white"
                          className="bg-bgColor rounded-md"
                        />
                      ) : (
                        "حذف"
                      )}
                    </Button>
                  }
                  title="تأكيد الحذف"
                  className="bg-red-600 text-white hover:bg-red-700"
                  description="هل أنت متأكد من حذف ؟ لا يمكن التراجع عن هذا الإجراء."
                  onConfirm={() => onDelete && onDelete(exam.id)}
                />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default AdminExaminationsTable;
