import React from "react";
import FormInput from "./form/FormInput";
import Button from "./Button";

const ACADEMIC_DEGREES = [
  { value: "Bachelor", label: "بكالوريوس" },
  { value: "Master", label: "ماجستير" },
  { value: "PhD", label: "دكتوراه" },
  { value: "Diploma", label: "دبلوم" },
];

const STUDY_STATUSES = [
  { value: "Studying", label: "يُدرس حالياً" },
  { value: "Graduated", label: "خريج" },
  { value: "Postponed", label: "مؤجل" },
];

const EditVolunteerForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="الاسم الكامل"
          name="full_name"
          value={formData.full_name}
          onChange={onChange}
        />

        <FormInput
          label="تاريخ الميلاد"
          name="birth_date"
          type="date"
          value={formData.birth_date}
          onChange={onChange}
        />

        <FormInput
          label="الجامعة"
          name="university"
          value={formData.university}
          onChange={onChange}
        />

        <FormInput
          label="الدرجة العلمية"
          name="academic_degree"
          type="select"
          value={formData.academic_degree}
          onChange={onChange}
          options={ACADEMIC_DEGREES}
        />

        <FormInput
          label="حالة الدراسة"
          name="study_status"
          type="select"
          value={formData.study_status}
          onChange={onChange}
          options={STUDY_STATUSES}
        />

        <FormInput
          label="سنة الدراسة"
          name="study_year"
          value={formData.study_year}
          onChange={onChange}
        />

        <FormInput
          label="التخصص"
          name="specialization"
          value={formData.specialization}
          onChange={onChange}
        />

        <FormInput
          label="رقم الهاتف"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
        />

        <FormInput
          label="العنوان العام"
          name="address_general"
          value={formData.address_general}
          onChange={onChange}
        />

        <FormInput
          label="تفاصيل العنوان"
          name="address_details"
          value={formData.address_details}
          onChange={onChange}
        />

        <FormInput
          label="مكان التطوع"
          name="volunteer_place"
          value={formData.volunteer_place}
          onChange={onChange}
        />

        <div className="md:col-span-2">
          <FormInput
            label="ملاحظات عامة"
            name="general_notes"
            type="textarea"
            value={formData.general_notes}
            onChange={onChange}
            rows="3"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          إلغاء
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>
    </form>
  );
};

export default EditVolunteerForm;
