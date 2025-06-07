import React, { useEffect, useState } from "react";
import {
  useGetAllResourcesQuery,
  useDeleteResourceMutation,
  useApproveDonationMutation,
} from "../../redux/features/api/apiSlice";
import Preloader from "../../components/Preloader/Preloader";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Search } from "lucide-react";
import { pageTitle } from "../../helper";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useDebounce } from "use-debounce";
import { Icon } from "@iconify/react";
import AdminDonationsTable from "../../components/Table/DonationsTable";
import { errorNotify, successNotify } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";

const AdminDonations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    pageTitle("لوحة التحكم");
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetAllResourcesQuery(
    `/admin/Display_all_donations?page=${currentPage}`
  );

  const [
    approveDonation,
    {
      isLoading: LoadingApprove,
      error: errorApprove,
      isSuccess: successApprove,
    },
  ] = useApproveDonationMutation();
console.log(errorApprove);

  useEffect(() => {
    if (successApprove) {
      successNotify("تم  تعديل الحالة بنجاح");
    }
  }, [successApprove]);
  useEffect(() => {
    if (errorApprove) {
     errorNotify(" حدثة مشكلة اثناء التعديل");
    }
  }, [errorApprove]);

  const handleCancelDonation = async (donationId) => {
    try {
      console.log(donationId);
      
      await approveDonation(`/Cancel_donation/${donationId}`).unwrap();
    } catch (err) {
      console.error("Failed to delete donation:", err);
    }
  };

  const handleApproveDonation = async (donationId) => {
    try {
      await approveDonation(`/Approve_donation/${donationId}`).unwrap();
    } catch (err) {
      console.error("Failed to approve donation:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-right">إدارة التبرعات</h1>
        <form onSubmit={handleSearch} className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="ابحث عن تبرع بالاسم أو المدينة..."
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

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Preloader />
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 text-center">{error.message}</div>
      ) : data?.Data?.data?.length === 0 ? (
        <div className="text-center p-8 text-gray-600 text-lg">
          لا يوجد تبرعات بهذا الاسم
        </div>
      ) : (
        <>
          <AdminDonationsTable
            donations={data?.Data?.data || []}
            isLoading={isLoading}
            LoadingApprove={LoadingApprove}
            Approve_donation={handleApproveDonation}
            onDelete={handleCancelDonation}
          />

          {!searchTerm && data?.Data && (
            <div className="mt-4">
              <CustomPagination
                currentPage={currentPage}
                totalPages={data?.Data?.last_page}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDonations;
