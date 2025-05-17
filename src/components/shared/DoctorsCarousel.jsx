import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import author1 from "../../assets/author1.jpg";
import author2 from "../../assets/author2.jpg";
import author3 from "../../assets/author3.jpg";
const doctors = [
  {
    image: author1,
    name: "د. أحمد محمد",
    specialty: "أخصائي القلب",
    experience: "15 سنة خبرة",
    description: "خبرة واسعة في علاج أمراض القلب والأوعية الدموية",
  },
  {
    image: author2,
    name: "د. سارة أحمد",
    specialty: "أخصائية طب الأطفال",
    experience: "12 سنة خبرة",
    description: "متخصصة في رعاية الأطفال وعلاج الأمراض الشائعة",
  },
  {
    image: author3,
    name: "د.محمد علي",
    specialty: "أخصائي العظام",
    experience: "10 سنة خبرة",
    description: "خبرة في جراحات العظام والمفاصل",
  },
  {
    image: author1,
    name: "د. خالد محمود",
    specialty: "أخصائي الجراحة",
    experience: "18 سنة خبرة",
    description: "خبرة في العمليات الجراحية المعقدة",
  },
  {
    image: author2,
    name: "د. نورا أحمد",
    specialty: "أخصائية النساء",
    experience: "14 سنة خبرة",
    description: "متخصصة في طب النساء والتوليد",
  },
  {
    image: author3,
    name: "د. عمر حسن",
    specialty: "أخصائي المخ والأعصاب",
    experience: "16 سنة خبرة",
    description: "خبرة في علاج أمراض المخ والأعصاب",
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const DoctorsSlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const doctorsPerPage = 3;

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 1 + doctorsPerPage - 1 < doctors.length
        ? prevIndex + 1
        : prevIndex
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const visibleDoctors = doctors.slice(startIndex, startIndex + doctorsPerPage);

  return (
    <div className="py-16 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            فريقنا الطبي
          </h2>
          <p className="text-lg text-gray-600">
            أفضل الأطباء المتخصصين في مختلف المجالات
          </p>
        </div>

        <div className="relative">
          {/* أزرار التنقل */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 z-10 rounded-r hover:bg-blue-700"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 z-10 rounded-l hover:bg-blue-700"
          >
            ▶
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence initial={false}>
              {visibleDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="relative h-80">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-1">{doctor.name}</h3>
                      <p className="text-lg">{doctor.specialty}</p>
                      <p className="text-sm">{doctor.experience}</p>
                      <p className="text-sm mt-1">{doctor.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsSlider;
