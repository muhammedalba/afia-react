import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const developers = [
  {
    name: "محمد عبد الله",
    role: "مهندس برمجيات واجهات",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    name: "ليلى يوسف",
    role: "مصممة تجربة المستخدم",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    name: "أحمد سامي",
    role: "مطور خلفي",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-bgColor to-pink-500 py-20 text-white text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-bold mb-4">من نحن</h1>
        <p className="max-w-2xl mx-auto text-lg">
          منصة أفيا تسعى إلى توفير خدمات طبية حديثة تشمل الفحوصات والتبرع بالدم بكل سهولة وموثوقية.
        </p>
      </motion.div>

      {/* Vision */}
      <motion.section
        className="py-16 px-4 max-w-7xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">رؤيتنا</h2>
        <p className="text-lg text-center text-gray-700 leading-relaxed">
          أن نكون المنصة الرائدة في الشرق الأوسط لتقديم حلول الرعاية الصحية الرقمية، من خلال تسخير التكنولوجيا لتيسير الوصول إلى الخدمات الطبية.
        </p>
      </motion.section>

      {/* Why Us */}
      <motion.section
        className="py-16 bg-gray-100 px-4 max-w-7xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">لماذا نحن؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "mdi:shield-check",
              title: "أمان وخصوصية عالية",
              desc: "نلتزم بحماية بياناتك بأعلى معايير الأمان.",
            },
            {
              icon: "mdi:headset",
              title: "دعم فني مميز",
              desc: "فريق الدعم لدينا جاهز لمساعدتك على مدار الساعة.",
            },
            {
              icon: "mdi:cellphone-check",
              title: "سهولة الاستخدام",
              desc: "واجهة استخدام بسيطة ومناسبة لجميع الأعمار.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-lg shadow-md p-6 text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Icon icon={item.icon} className="text-4xl text-bgColor mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Developers Section */}
      <motion.section
        className="py-16 px-4 max-w-7xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">فريق المطورين</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src={dev.image}
                alt={dev.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{dev.name}</h3>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Icon icon="mdi:account" className="text-lg text-gray-500" />
                {dev.role}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-16 bg-gray-50 px-4 max-w-7xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">ماذا يقول عملاؤنا؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "سعاد محمد", text: "منصة ممتازة وسهّلت عليّ الوصول إلى التحاليل بدون عناء." },
            { name: "حسين علي", text: "أشعر بالثقة عند استخدام أفيا، الخدمة ممتازة والدقة عالية." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-lg shadow"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Icon icon="mdi:format-quote-open" className="text-3xl text-gray-400 mb-2" />
              <p className="text-gray-700 italic">"{item.text}"</p>
              <h4 className="mt-4 font-semibold text-gray-900">{item.name}</h4>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        className="py-16 px-4 max-w-5xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">الأسئلة الشائعة</h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-semibold flex items-center gap-2 cursor-pointer">
              <Icon icon="mdi:help-circle" className="text-bgColor" />
              هل الخدمة مجانية؟
            </summary>
            <p className="mt-2 text-gray-600">بعض الخدمات مجانية، والبعض الآخر يتطلب رسوم رمزية.</p>
          </details>
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-semibold flex items-center gap-2 cursor-pointer">
              <Icon icon="mdi:blood-bag" className="text-red-500" />
              كيف يمكنني التبرع بالدم؟
            </summary>
            <p className="mt-2 text-gray-600">يمكنك تحديد موعد من خلال المنصة وسنقوم بتوجيهك لأقرب مركز.</p>
          </details>
        </div>
      </motion.section>

      {/* Video Section */}
      <motion.section
        className="py-16 px-4 max-w-5xl mx-auto text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8">شاهد الفيديو التعريفي</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-96 rounded-lg shadow"
            src="https://www.youtube.com/embed/EZ8F0nW6Sxw"
            title="Video"
            allowFullScreen
          ></iframe>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
