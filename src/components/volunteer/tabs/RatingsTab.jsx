import React from "react";
import { VolunteerInfoCard, InfoItem } from "..";

const RatingsTab = ({ ratings = [] }) => (
  <div className="grid grid-cols-1 gap-6">
    {ratings.length > 0 ? (
      ratings.map((rating) => (
        <VolunteerInfoCard
          key={rating.id}
          title={`تقييم المشرف #${rating.supervisor_id}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem
              label="درجة النشاط"
              value={`${rating.activity_score}/10`}
            />
            <InfoItem
              label="درجة السلوك"
              value={`${rating.behavior_score}/10`}
            />
            <InfoItem
              label="درجة التحفيز"
              value={`${rating.motivation_score}/10`}
            />
            <InfoItem
              label="المهارات العلمية"
              value={`${rating.scientific_skill_score}/10`}
            />
            <InfoItem
              label="درجة العدالة"
              value={`${rating.fairness_score}/5`}
            />
            <InfoItem
              label="جودة الفريق"
              value={`${rating.team_quality_score}/5`}
            />
            <InfoItem
              label="توزيع المهام"
              value={`${rating.tasks_distribution_fairness}/5`}
            />
            <InfoItem
              label="وقت المشرف"
              value={`${rating.general_supervisor_time}/5`}
            />
            <InfoItem label="سلوك الإدارة" value={rating.management_behavior} />
            <div className="col-span-full">
              <InfoItem label="الإيجابيات والسلبيات" value={rating.pros_cons} />
            </div>
            <div className="col-span-full">
              <InfoItem label="المساحة الممنوحة" value={rating.space_given} />
            </div>
            <div className="col-span-full">
              <InfoItem
                label="الاستماع والمقترحات"
                value={rating.listening_and_suggestions}
              />
            </div>
          </div>
        </VolunteerInfoCard>
      ))
    ) : (
      <div className="text-center py-12 bg-white rounded-xl shadow">
        <p className="text-gray-500">لا توجد تقييمات للمشرفين</p>
      </div>
    )}
  </div>
);

export default RatingsTab;
