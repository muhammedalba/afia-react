import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { pageTitle } from "../../helper";
import medLifeImg from "../../assets/medLife.png";
import { motion, useAnimation } from "framer-motion";
import img from "../../assets/muhammed.jpg";
const developers = [
  {
    name: "م. خولة محمد",
    role: " قائدة الفريق التقني",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    socialMedia: {
      whatsapp: "",
      linkedin: "",
    },
  },
  {
    name: "م. صبحي الأبواحمد",
    role: " Back-End Developer",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    socialMedia: {
      whatsapp: "",
      linkedin: "",
    },
  },
  {
    name: "م. عرين حسن",
    role: "Front-End Developer",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    socialMedia: {
      whatsapp: "",
      linkedin: "",
    },
  },
  {
    name: "م. ليلى الدروبي",
    role: "UI/UX Designer",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    socialMedia: {
      whatsapp: "",
      linkedin: "",
    },
  },
  {
    name: "م. محمد البهلة",
    role: "Front-End Developer",
    image: img,
    socialMedia: {
      whatsapp: "tel:+4917672749594",
      linkedin: "https://www.linkedin.com/in/muhammed-albahlee",
    },
  },
  {
    name: "م. محمود المقداد",
    role: "Front-End Developer",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    socialMedia: {
      whatsapp: "",
      linkedin: "",
    },
  },
  {
    name: "م. خالد الحميدات ",
    role: "Back-End Developer",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    socialMedia: {
      whatsapp: "",
      linkedin: "",
    },
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    pageTitle(" من نحن");
  }, []);
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-bgColor to-pink-500 py-10 text-white text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <img className="m-auto" width="200" src={medLifeImg} alt="medLife" />
        <h1 className="text-4xl  font-bold mb-4 flex items-stretch justify-center">
          <Icon color="white" width={"50"} icon={"ix:about"} />
          من نحن
        </h1>
        <p className="max-w-2xl mx-auto text-xl">
          مؤسسة ميدلايف الطبية الخيرية مؤسسة ميدلايف الطبية الخيرية هي مؤسسة غير
          ربحية مرخصة أصولًا من وزارة الشؤون الاجتماعية والعمل بموجب قرار
          الإشهار رقم 1899 بتاريخ 2023/8/29، تهدف الى نشر الوعي الطبي و تُعنى
          بتقديم الخدمات الطبية والصحية للمحتاجين، وتسعى إلى تعزيز الوصول
          للرعاية الصحية للفئات الأكثر ضعفًا في المجتمع. منذ تأسيسها، التزمت
          المؤسسة برسالة واضحة: "الطب رسالة إنسانية قبل أن يكون مهنة". ومن هذا
          المنطلق، تعمل ميدلايف على تطوير مبادرات نوعية تمزج بين الطب
          والتكنولوجيا لخدمة الإنسان
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
        <h2 className="text-3xl font-bold text-bgColor  flex items-center justify-center mb-8">
          <Icon
            color="fc4c56"
            width={"50"}
            icon={"hugeicons:computer-programming-01"}
          />
          القسم التقني
        </h2>
        <p className="text-lg text-center text-gray-700 leading-relaxed">
          إيمانًا منا بأهمية التكنولوجيا في تسهيل حياة الناس، أُنشئ القسم التقني
          في مؤسسة ميدلايف ليكون الذراع الرقمي الذي يُترجم القيم الإنسانية
          للمؤسسة إلى أدوات رقمية ذكية تخدم المرضى والأطباء على حد سواء. جاء
          تطبيق "عافية" كثمرة جهدٍ جماعي بُذل بمحبة وحرص على أن تكون الخدمة
          الصحية أقرب وأسهل لكل محتاج.
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
        <h2 className="text-3xl font-bold text-center text-bgColor mb-8">
          لماذا نحن؟
        </h2>
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
              <Icon
                icon={item.icon}
                className="text-4xl text-bgColor mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Developers Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-bold flex items-center justify-center text-bgColor mb-2">
          <Icon color="fc4c56" width={"50"} icon={"hugeicons:developer"} />
          فريق المطورين
        </h2>
        <h2 className="text-center text-2xl py-5">
          تم تطوير تطبيق "عافية" بأيادٍ مؤمنة برسالة الخير، من قبل فريق تقني
          تطوعي عمل بإخلاص ومحبة
        </h2>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-8 w-fit animate-marquee p-5 pause-marquee"
            style={{ whiteSpace: "nowrap" }}
          >
            {[...developers, ...developers].map((dev, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center w-80 flex-shrink-0"
              >
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">{dev.name}</h3>
                <p className="text-bgColor flex items-center justify-center gap-2">
                  <Icon icon="mdi:account" className="text-lg text-bgColor" />
                  {dev.role}
                </p>
                <div className="flex items-center justify-center gap-x-2 hover:scale-105">
                  <a className="" href={dev.socialMedia.whatsapp}>
                    <Icon
                      width="30"
                      icon="mdi:whatsapp"
                      className="text-lg hover:text-bgColor hover:scale-110 text-green-700"
                    />
                  </a>
                  <a className="" href={dev.socialMedia.linkedin}>
                    <Icon
                      width="30"
                      icon="mingcute:linkedin-fill"
                      className="text-lg hover:text-bgColor hover:scale-110 text-blue-800"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <motion.section
        className="py-16 bg-gray-50 px-4 max-w-7xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl text-bgColor font-bold flex items-center justify-center mb-8">
          <Icon color="fc4c56" width={"50"} icon={"entypo:users"} />
          ماذا يقول عملاؤنا؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "سعاد محمد",
              text: "منصة ممتازة وسهّلت عليّ الوصول إلى التحاليل بدون عناء.",
            },
            {
              name: "حسين علي",
              text: "أشعر بالثقة عند استخدام أفيا، الخدمة ممتازة والدقة عالية.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-lg shadow"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Icon
                icon="mdi:format-quote-open"
                className="text-3xl text-gray-400 mb-2"
              />
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
        <h2 className="text-3xl font-bold text-center text-bgColor mb-8">
          الأسئلة الشائعة
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-semibold flex items-center gap-2 cursor-pointer">
              <Icon icon="mdi:help-circle" className="text-bgColor" />
              هل الخدمة مجانية؟
            </summary>
            <p className="mt-2 text-gray-600">
              بعض الخدمات مجانية، والبعض الآخر يتطلب رسوم رمزية.
            </p>
          </details>
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-semibold flex items-center gap-2 cursor-pointer">
              <Icon icon="mdi:blood-bag" className="text-red-500" />
              كيف يمكنني التبرع بالدم؟
            </summary>
            <p className="mt-2 text-gray-600">
              يمكنك تحديد موعد من خلال المنصة وسنقوم بتوجيهك لأقرب مركز.
            </p>
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
        <h2 className="text-3xl text-bgColor font-bold mb-8">
          شاهد الفيديو التعريفي
        </h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="m-auto w-full sm:w-[70%]"
            height="480"
            src="https://www.youtube.com/embed/T9HXoUmdJhA"
            title="التعاطف: الرابط الإنساني للعناية بالمرضى"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
