import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { useAuth } from "../../contexts/AuthContext";
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

// 🐢 Lazy-loaded Components
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

  const [deleteDoctor, { isLoading: LoadingDelete }] =
    useDeleteResourceMutation();

  const [approveDoctor, { isLoading: LoadingApprove }] =
    useCreateResourceMutation();

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
      try {
        await deleteDoctor(`/Delete_doctor/${doctorId}`);
      } catch (err) {
        console.error("Failed to delete doctor:", err);
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
    <div className="w-full  mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-right">إدارة الأطباء</h1>
        <form onSubmit={handleSearch} className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="ابحث عن طبيب بالاسم أو رقم الهاتف أو الرقم القومي..."
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
            <Button className="bg-bgColor hover:bg-red-700" type="submit">
              بحث
            </Button>
          )}
        </form>
      </div>

      <Suspense fallback={<div className="text-center">...جار التحميل</div>}>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Preloader />
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 text-center">{error.message}</div>
        ) : doctors.length === 0 ? (
          <div className="text-center p-8 text-gray-600 text-lg">
            لا يوجد طبيب بهذا الاسم
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
                      <th className="px-6 py-3">المدينة</th>
                      <th className="px-6 py-3">العنوان</th>
                      <th className="px-6 py-3">الحالة</th>
                      <th className="px-6 py-3">حذف</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
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
                          {!doctor.is_approved && (
                            <span className="block mt-2">
                              <ConfirmDialog
                                trigger={
                                  <Button
                                    disabled={LoadingApprove}
                                    variant="ghost"
                                    className="bg-indigo-500 hover:text-white text-white hover:bg-indigo-600 ml-4"
                                  >
                                    {LoadingApprove ? (
                                      <Icon
                                        icon="eos-icons:loading"
                                        width="200"
                                        height="75"
                                        color="white"
                                        className="rounded-md"
                                      />
                                    ) : (
                                      "موافقة"
                                    )}
                                  </Button>
                                }
                                title="تأكيد الموافقة"
                                description="هل أنت متأكد من الموافقة على هذا الطبيب؟"
                                onConfirm={() => handleApproveDoctor(doctor.id)}
                              />
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
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
                            description="هل أنت متأكد من حذف هذا الطبيب؟ لا يمكن التراجع عن هذا الإجراء."
                            onConfirm={() => handleDeleteDoctor(doctor.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
