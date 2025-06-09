import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  useGetAllResourcesQuery,
  useDeleteResourceMutation,
  useCreateResourceMutation,
} from "../../redux/features/api/apiSlice";
import Preloader from "../../components/Preloader/Preloader";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Search } from "lucide-react";
import { pageTitle } from "../../helper";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useDebounce } from "use-debounce";
import { Icon } from "@iconify/react";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { errorNotify, successNotify } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const AdminPatients = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    pageTitle("لوحة التحكم");
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: response,
    isLoading,
    error,
  } = useGetAllResourcesQuery(
    searchTerm
      ? `/Search_for_patient/${debouncedSearchTerm}`
      : `/Display_patients?page=${currentPage}`
  );
  console.log(error, "error");
  console.log(error, "response");
  const [
    deletePatient,
    { error: errorDelete, isLoading: LoadingDelete, isSuccess: successDelete },
  ] = useDeleteResourceMutation();

  const [
    approvePatient,
    { error: errorApprove, isLoading: LoadingApprove, isSuccess },
  ] = useCreateResourceMutation();

  useEffect(() => {
    if (successDelete) {
      successNotify("تم حذف  بنجاح");
    }
  }, [successDelete]);

  useEffect(() => {
    if (isSuccess) {
      successNotify("تم تعديل  بنجاح");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (errorApprove || errorDelete) {
      errorNotify(" حدثة مشكلة اثناء  الاجراء ");
    }
  }, [errorApprove, errorDelete]);

  const handleApprovePatient = async (patientId) => {
    try {
      await approvePatient({
        url: "/Patient_approve",
        method: "POST",
        body: { patient_id: patientId },
      });
    } catch (err) {
      console.error("Failed to approve patient:", err);
    }
  };

  const handleDeletePatient = async (patientId) => {
    try {
      await deletePatient(`/Delete_patient/${patientId}`);
      console.log(patientId);
    } catch (err) {
      console.error("Failed to delete patient:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const patients = response?.Data?.data || [];

  return (
    <div className="mx-auto">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-right">إدارة المرضى</h1>
        <form onSubmit={handleSearch} className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="ابحث عن مريض بالاسم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 ring-1 bg-white focus-visible:ring-bgColor text-right"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          {isLoading ? (
            <Icon
              icon="eos-icons:three-dots-loading"
              width="50"
              height="40"
              color="white"
              className="bg-bgColor rounded-md"
            />
          ) : (
            <Button className=" bg-bgColor hover:bg-red-700" type="submit">
              بحث
            </Button>
          )}
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Preloader />
        </div>
      ) : error && error?.status != 404 ? (
        <div className="text-red-500 p-4 text-center">
          {error?.data?.Message}
        </div>
      ) : error?.data?.Message ===
        "No patients found for the given search query." ? (
        <div className="text-center p-8 text-gray-600 text-lg">
          لا يوجد مريض بهذا الاسم
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden w-full">
            <div className="overflow-x-auto w-full">
              <table className="min-w-max divide-y divide-gray-200 w-full">
                <thead className="bg-gray-200 text-textColor text-right text-xs font-medium tracking-wider uppercase">
                  <tr>
                    <th className="px-6 py-3">الاسم</th>
                    <th className="px-6 py-3">رقم الهاتف</th>
                    <th className="px-6 py-3">الرقم الوطني</th>
                    <th className="px-6 py-3">الحالة الاجتماعية</th>
                    <th className="px-6 py-3">الحالة</th>
                    <th className="px-6 py-3">تغيير الحالة</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient, index) => (
                    <motion.tr
                      key={patient.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        // type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: 1.01,
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      }}
                      style={{ originX: 0 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {patient.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {patient.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {patient.national_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {patient.martial_status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            patient.is_approved
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {patient.is_approved ? "تم الموافقة" : "قيد الانتظار"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        {patient.is_approved ? (
                          <ConfirmDialog
                            trigger={
                              <Button
                                disabled={
                                  isLoading || LoadingDelete || LoadingApprove
                                }
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
                            title="تأكيد التجميد"
                            className="bg-red-600 text-white hover:bg-red-700"
                            description="هل أنت متأكد من تجميد هذا المريض؟ لا يمكن التراجع عن هذا الإجراء."
                            onConfirm={() => handleDeletePatient(patient.id)}
                          />
                        ) : (
                          <ConfirmDialog
                            trigger={
                              <Button
                                disabled={
                                  isLoading || LoadingDelete || LoadingApprove
                                }
                                variant="ghost"
                                className="bg-green-600 hover:text-white text-white hover:bg-green-700 ml-4"
                              >
                                {LoadingApprove ? (
                                  <Icon
                                    icon="eos-icons:loading"
                                    width="200"
                                    height="75"
                                    color="white"
                                    className=" rounded-md"
                                  />
                                ) : (
                                  "موافقة"
                                )}
                              </Button>
                            }
                            className="bg-bgColor hover:bg-red-800"
                            title="تأكيد الموافقة"
                            description="هل أنت متأكد من الموافقة على هذا المريض؟"
                            onConfirm={() => handleApprovePatient(patient.id)}
                          />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {!searchTerm && response?.Data && (
            <div className="mt-4">
              <CustomPagination
                currentPage={currentPage}
                totalPages={response.Data.last_page}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPatients;
