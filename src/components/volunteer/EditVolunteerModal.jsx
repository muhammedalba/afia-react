import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import EditVolunteerForm from "./EditVolunteerForm";

const EditVolunteerModal = ({ isOpen, onClose, volunteer, onSave }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    birth_date: "",
    university: "",
    academic_degree: "",
    study_status: "",
    study_year: "",
    specialization: "",
    phone: "",
    address_general: "",
    address_details: "",
    volunteer_place: "",
    general_notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (volunteer) {
      setFormData({
        full_name: volunteer.full_name || "",
        birth_date: volunteer.birth_date
          ? volunteer.birth_date.split("T")[0]
          : "",
        university: volunteer.university || "",
        academic_degree: volunteer.academic_degree || "",
        study_status: volunteer.study_status || "",
        study_year: volunteer.study_year || "",
        specialization: volunteer.specialization || "",
        phone: volunteer.phone || "",
        address_general: volunteer.address_general || "",
        address_details: volunteer.address_details || "",
        volunteer_place: volunteer.volunteer_place || "",
        general_notes: volunteer.general_notes || "",
      });
    }
  }, [volunteer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {});

      await onSave(payload);
      onClose();
    } catch (error) {
      console.error("Error updating volunteer:", error);
      toast.error("حدث خطأ أثناء تحديث البيانات");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تعديل بيانات المتطوع">
      <EditVolunteerForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
};

export default EditVolunteerModal;
