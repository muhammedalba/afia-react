import React from "react";
import { VolunteerInfoCard, InfoItem } from "..";

const PersonalInfoTab = ({ volunteer }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <VolunteerInfoCard title="المعلومات الشخصية">
      <InfoItem label="الاسم الكامل" value={volunteer.full_name} />
      <InfoItem label="اسم المستخدم" value={volunteer.username} />
      <InfoItem
        label="تاريخ الميلاد"
        value={new Date(volunteer.birth_date).toLocaleDateString("ar-EG")}
      />
      <InfoItem label="رقم الهاتف" value={volunteer.phone} />
    </VolunteerInfoCard>

    <VolunteerInfoCard title="المعلومات الأكاديمية">
      <InfoItem label="الجامعة" value={volunteer.university} />
      <InfoItem label="الدرجة العلمية" value={volunteer.academic_degree} />
      <InfoItem label="حالة الدراسة" value={volunteer.study_status} />
      <InfoItem label="سنة الدراسة" value={volunteer.study_year} />
      <InfoItem label="التخصص" value={volunteer.specialization} />
    </VolunteerInfoCard>

    <VolunteerInfoCard title="العنوان" className="md:col-span-2">
      <InfoItem label="العنوان العام" value={volunteer.address_general} />
      <InfoItem label="تفاصيل العنوان" value={volunteer.address_details} />
    </VolunteerInfoCard>

    <VolunteerInfoCard title="معلومات التطوع" className="md:col-span-2">
      <InfoItem label="مكان التطوع" value={volunteer.volunteer_place} />
      <InfoItem label="ملاحظات عامة" value={volunteer.general_notes} />
      <InfoItem
        label="عضو منذ"
        value={new Date(volunteer.created_at).toLocaleDateString("ar-EG")}
      />
    </VolunteerInfoCard>
  </div>
);

export default PersonalInfoTab;
