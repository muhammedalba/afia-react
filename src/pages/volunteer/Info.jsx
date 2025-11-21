import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditVolunteerModal, tabs } from "@/components/volunteer";
import Preloader from "@/components/Preloader/Preloader";
import {
  updateVolunteerInfo,
  getVolunteerInfo,
} from "@/services/volunteerService";
import Tabs from "@/components/common/Tabs";
import VolunteerProfileCard from "@/components/volunteer/profile/VolunteerProfileCard";

// Tabs configuration
const tabItems = [
  { id: "personal", label: "معلومات شخصية" },
  { id: "evaluations", label: "التقييمات" },
  { id: "ratings", label: "تقييمات المشرفين" },
  { id: "complaints", label: "الشكاوى" },
];

const { PersonalInfoTab, EvaluationsTab, RatingsTab, ComplaintsTab } = tabs;

export default function Info() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [volunteer, setVolunteer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const response = await getVolunteerInfo();

        if (response.volunteer) {
          setVolunteer(response.volunteer);
        }
      } catch (err) {
        console.error("Error fetching volunteer data:", err);
        setError("فشل في تحميل بيانات المتطوع");
        toast.error("فشل في تحميل البيانات");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVolunteerData();
  }, []);

  const handleUpdateVolunteer = async (updatedData) => {
    try {
      setIsLoading(true);
      const response = await updateVolunteerInfo(updatedData);

      if (response.volunteer) {
        setVolunteer((prev) => ({
          ...prev,
          ...response.volunteer,
        }));
      }

      return response;
    } catch (error) {
      console.error("Error updating volunteer:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!volunteer) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700">لا توجد بيانات متاحة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">معلومات المتطوع</h1>
          <p className="mt-2 text-lg text-gray-600">
            View and manage volunteer details and activities
          </p>
        </div>

        {/* Profile Card */}
        <VolunteerProfileCard
          volunteer={volunteer}
          onEditClick={handleEditClick}
        />

        {/* Tabs */}
        <Tabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabItems}
        />

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "personal" && (
            <PersonalInfoTab volunteer={volunteer} />
          )}
          {activeTab === "evaluations" && (
            <EvaluationsTab evaluations={volunteer.evaluations || []} />
          )}
          {activeTab === "ratings" && (
            <RatingsTab ratings={volunteer.supervisor_ratings || []} />
          )}
          {activeTab === "complaints" && (
            <ComplaintsTab complaints={volunteer.complaints || []} />
          )}
        </div>
      </div>

      {/* Edit Volunteer Modal */}
      <EditVolunteerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        volunteer={volunteer}
        onSave={handleUpdateVolunteer}
      />

      {/* Toast Container */}
      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg">
          جاري تحديث البيانات...
        </div>
      )}
    </div>
  );
}
