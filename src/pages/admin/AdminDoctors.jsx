import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";

import {
  useGetAllResourcesQuery,
  useDeleteResourceMutation,
  useCreateResourceMutation,
} from "../../redux/features/api/apiSlice";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Search } from "lucide-react";
import { pageTitle } from "../../helper";
import { useDebounce } from "use-debounce";
import { Icon } from "@iconify/react";
import { successNotify, errorNotify } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const ConfirmDialog = lazy(() =>
  import("../../components/ConfirmDialog/ConfirmDialog")
);
const AddressModal = lazy(() => import("../../components/shared/AddressModal"));
const Preloader = lazy(() => import("../../components/Preloader/Preloader"));
const CustomPagination = lazy(() =>
  import("../../components/Pagination/CustomPagination")
);

const AdminDoctors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    pageTitle("لوحة التحكم");
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const {
    data: response,
    isLoading,
    error,
  } = useGetAllResourcesQuery(
    searchTerm
      ? `/Search_for_doctor/${debouncedSearchTerm}`
      : `/Display_doctors?page=${currentPage}`
  );
 

  const [
    deleteDoctor,
    { isLoading: LoadingDelete, isSuccess: success_delete, error: errorDelete },
  ] = useDeleteResourceMutation();

  const [approveDoctor, { isLoading: LoadingApprove , isSuccess:successApprove}] =
    useCreateResourceMutation();

  useEffect(() => {
    if (success_delete) successNotify("تم تجميد الطبيب بنجاح");
  }, [success_delete]);
  useEffect(() => {
    if (successApprove) successNotify("تم قيول الطبيب بنجاح");
  }, [successApprove]);
  useEffect(() => {
    if (errorDelete) errorNotify(" حدثة مشكلة اثناء  حذف الطبيب");
  }, [errorDelete]);

  const handleApproveDoctor = useCallback(
    async (doctorId) => {
      try {
        await approveDoctor({
          url: "/Doctor_approve",
          method: "POST",
          body: { doctor_id: doctorId },
        });
      } catch (err) {
        console.error("Failed to approve doctor:", err);
      }
    },
    [approveDoctor]
  );

  const handleDeleteDoctor = useCallback(
    async (doctorId) => {
      if (doctorId) {
        try {
          await deleteDoctor(`/Delete_doctor/${doctorId}`).unwrap();
        } catch (err) {
          console.error("Failed to delete doctor:", err);
        }
      }
    },
    [deleteDoctor]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const doctors = useMemo(() => response?.Data?.data || [], [response]);

  return (
    <div className="w-full mx-auto px-4 py-8">
      {LoadingApprove || (LoadingDelete && <Preloader />)}
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-right">إدارة الأطباء</h1>
        <form onSubmit={handleSearch} className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="ابحث عن طبيب بالاسم ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 ring-1 bg-white focus-visible:ring-bgColor text-right"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <Icon
                icon="eos-icons:three-dots-loading"
                width="50"
                height="40"
                color="white"
                className="bg-bgColor rounded-md"
              />
            ) : (
              <Button className="bg-bgColor hover:bg-red-700" type="submit">
                بحث
              </Button>
            )}
          </motion.div>
        </form>
      </div>

      <Suspense fallback={<div className="text-center">...جار التحميل</div>}>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Preloader />
          </div>
        ) :error &&  error?.status !== 404 ? (
          <div className="text-red-500 p-4 text-center">
            {error?.data?.Message}
          </div>
        ) : error?.data?.Message ===
          "No doctor found for the given search query." ? (
          <motion.div
            className="text-center p-8 text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            لا يوجد طبيب بهذا الاسم
          </motion.div>
        ) : (
          <>
            <motion.div
              className="bg-white rounded-lg shadow overflow-hidden w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="overflow-x-auto w-full">
                <table className="min-w-max divide-y divide-gray-200 w-full">
                  <thead className="bg-gray-200 text-textColor text-right text-xs font-medium tracking-wider uppercase">
                    <tr>
                      <th className="px-6 py-3">الاسم</th>
                      <th className="px-6 py-3">رقم الهاتف</th>
                      <th className="px-6 py-3">الرقم الوطني</th>
                      <th className="px-6 py-3">المدينة</th>
                      <th className="px-6 py-3">العنوان</th>
                      <th className="px-6 py-3">الحالة</th>
                      <th className="px-6 py-3">تغيير الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {doctors?.map((doctor, index) => (
                      <motion.tr
                        key={doctor.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                          scale: 1.01,
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        }}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <td className="px-6 py-4 text-right">
                          {doctor.full_name}
                        </td>
                        <td className="px-6 py-4 text-right">{doctor.phone}</td>
                        <td className="px-6 py-4 text-right">
                          {doctor.national_number}
                        </td>
                        <td className="px-6 py-4 text-right">{doctor.city}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button
                            variant="ghost"
                            className="text-blue-600 hover:underline"
                            onClick={() => {
                              setSelectedAddress(doctor.address);
                              setShowAddressModal(true);
                            }}
                          >
                            عرض العنوان
                          </Button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              doctor.is_approved
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {doctor.is_approved
                              ? "تم الموافقة"
                              : "قيد الانتظار"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {doctor.is_approved ? (
                            <ConfirmDialog
                              trigger={
                                <Button
                                  disabled={LoadingDelete}
                                  variant="ghost"
                                  className="bg-bgColor hover:bg-red-700 text-white hover:text-white"
                                >
                                  تجميد
                                </Button>
                              }
                              title="تأكيد الحذف"
                              className="bg-red-600 text-white hover:bg-red-700"
                              description="هل أنت متأكد من تجميد عضوية هذا الطبيب؟ لا يمكن التراجع عن هذا الإجراء."
                              onConfirm={() => handleDeleteDoctor(doctor.id)}
                            />
                          ) : (
                            <ConfirmDialog
                              trigger={
                                <Button
                                  disabled={LoadingApprove || LoadingDelete}
                                  variant="ghost"
                                  className="bg-green-600 hover:text-white text-white hover:bg-green-700 ml-4"
                                >
                                  موافقة
                                </Button>
                              }
                              title="تأكيد الموافقة"
                              className="bg-red-600 text-white hover:bg-red-700"
                              description="هل أنت متأكد من الموافقة على هذا الطبيب؟"
                              onConfirm={() => handleApproveDoctor(doctor.id)}
                            />
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {showAddressModal && (
              <Suspense
                fallback={
                  <div className="text-center p-4">جارٍ التحميل...</div>
                }
              >
                <AddressModal
                  open={showAddressModal}
                  onClose={() => setShowAddressModal(false)}
                  address={selectedAddress}
                />
              </Suspense>
            )}

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
      </Suspense>
    </div>
  );
};

export default AdminDoctors;
