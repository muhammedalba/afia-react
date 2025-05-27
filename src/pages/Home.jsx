import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import aboutImg from "../assets/about-img.jpg";
import callBg from "../assets/blockqoute-bg.jpg";
import client1 from "../assets/2_20250421_142057_٠٠٠١.png";
import client2 from "../assets/blog1.jpg";
import client3 from "../assets/blog2.jpg";
import { Icon } from "@iconify/react";
import DoctorsSection from "../components/shared/DoctorsCarousel";
import { Link } from "react-router-dom";

const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, target, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold text-bgColor mb-2">
      {count}+
    </div>
  );
};

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);

  const heroSlides = [
    {
      image: client1,
      title: "مركز عافية الطبي",
      description:
        "نقدم أفضل الخدمات الطبية بأحدث التقنيات وأعلى معايير الجودة",
    },
    {
      image: client2,
      title: "رعاية صحية متكاملة",
      description: "فريق طبي متخصص على مدار الساعة لرعايتكم",
    },
    {
      image: client3,
      title: "تطبيق عافية الخيري",
      description: "نستخدم أحدث الخدمات ... نقدم خدمات طبية مجانبة ",
    },
  ];
  const socialMedia = [
    {
      Icon: "bi:facebook",
      link: "https://www.facebook.com/dr.khaled.jomaa?mibextid=ZbWKwL",
      title: "ميديا لايف-Medlife",
      description: "لمتابعه كل ما هو جديد ",
    },
    {
      Icon: "bi:facebook",
      link: "https://www.facebook.com/profile.php?id=61555371066770&mibextid=ZbWKwL",
      title: " أثر ميديالايف-Athar Medlife ",
      description:
        "مشروع طبي انساني أطلقته مؤسسة Med-life (ميدلايف) الطبية التطوعية الخيرية",
    },
    {
      Icon: "bi:facebook",
      link: "medical-icon:i-cardiology",
      title: " انضم لكروبنا ",
      description:
        "مجموعة طبية يديرها 350 اطباء بشريين و اسنان و صيادلة و العديد من الاختصاصات الطبية الاخرى - يهدف الى نشر التوعية",
    },
    {
      Icon: "fa-brands:facebook-messenger",
      link: "https://www.facebook.com/messages/t/8092123430799877/",
      title: "  راسلنا على مسنجر ",
      description: " لا تتردد في التواصل معنا ",
    },
    {
      Icon: "line-md:instagram",
      link: "https://www.instagram.com/med.life4ever/?igsh=ZW5pcmphdWl4dXpo#",
      title: "  تابعنا على انستغرام ",
      description: "تابعنا لتلقي كل ما هو جديد",
    },
    {
      Icon: "line-md:instagram",
      link: "https://www.instagram.com/medlife_trends/?igsh=czdrdTJ0OGs1eGtt#",
      title: "  صفحه اتجاهات الحياة الطبية ",
      description: "لمعرفة اتجاهات الحياة الطبية",
    },
    {
      Icon: "line-md:instagram",
      link: "medical-icon:i-cardiology",
      title: " انضم لكروبنا ",
      description:
        "مشروع انساني يهدف لمساعده المرضى المحتاجين تابع لمؤسسة ميدلايف الطبية التطوعيه  ",
    },
    {
      Icon: "mingcute:whatsapp-line",
      link: "https://www.whatsapp.com/channel/0029VaG0tkGC1FuHOx5In32r",
      title: "  راسلنا ع الواتس ",
      description: " تواصل معنا على الواتس اب",
    },
    {
      Icon: "line-md:telegram",
      link: "https://t.me/medlife0",
      title: "   قناة التلغرام ",
      description: " تابعنا ع تلغرام لمعرفة كل ما هو جديد",
    },
    {
      Icon: "bi:facebook",
      link: "https://t.me/Medlife2024bot",
      title: " بوت الاستشارات الطبية ",
      description: " للاستشارة الطبية  مبسطة وسريعه  بكل  سرية واهتمام ",
    },
    {
      Icon: "line-md:youtube",
      link: "https://www.youtube.com/c/MedLifekjomaa",
      title: "  قناة اليوتيوب ",
      description: " تابعنا على اليوتيوب ليصلك كل جديد",
    },
    {
      Icon: "ic:sharp-tiktok",
      link: "https://www.youtube.com/c/MedLifekjomaa",
      title: "  قناة التيك توك ",
      description: " تابعنا على التيك توك ليصلك كل جديد",
    },
  ];
  const Departments = socialMedia.map((e, i) => {
    return (
      <Link
        key={i}
        to={e.link}
        className="bg-white p-6 rounded-lg shadow-lg text-center hover:translate-y-2 transition-all"
      >
        <div className=" rounded-lg flex items-center justify-center mb-4">
          <Icon color="fc4c55" icon={e.Icon} width="50" height="50" />
        </div>
        <h3 className="text-xl font-semibold mb-2 hover:text-bgColor"> {e.title}</h3>
        <p className="text-gray-600">{e.description}</p>
      </Link>
    );
  });
  // Hero carousel effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <div className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHero ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#fa3f482a]"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="text-right text-white">
                    <h1 className="text-5xl text-bgColor  font-bold mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-textColor  mb-8">
                      {slide.description}
                    </p>
                    <button className="bg-bgColor text-minColor px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                      نزل تطبيقنا الان{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-2 transition-colors ${
                index === currentHero ? "bg-bgColor" : "bg-white/50"
              }`}
              onClick={() => setCurrentHero(index)}
            />
          ))}
        </div>
      </div>

      {/* Quick Services */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-bgColor rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">مواعيد سريعة</h3>
              <p className="text-gray-600">احجز موعدك بسهولة وسرعة</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-bgColor rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">طوارئ 24/7</h3>
              <p className="text-gray-600">خدمة طوارئ على مدار الساعة</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-bgColor rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">تحاليل طبية</h3>
              <p className="text-gray-600">معمل تحاليل متكامل</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-bgColor rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">متابعة دورية</h3>
              <p className="text-gray-600">متابعة صحية منتظمة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Section with Multi-Card Carousel */}

      {/* <DoctorsSection /> */}

      {/* About Section with Animated Stats */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={aboutImg}
                alt="عن المستشفى"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="text-right">
              {/* <h2 className="text-3xl font-bold text-gray-900 mb-2">
                عن بوت الاستشارات الطبيه
              </h2> */}
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                بوت الاستشارات الطبية-من ميديالايف الى صحتكم
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                انطلاقا من ايماننا بان
                <strong className="text-gray-950">
                  {" "}
                  المعلومه الطبيه الصحيحه قد تغير حياه الانسان
                </strong>{" "}
                <strong  className="text-gray-950">اطلقنا بوت الاستشارات الطبيه</strong> مطلع عام 2025
                كمنصه تفاعليه مجانيه تهدف الى ايصال النصيحه الطبيه الامنه لكل من
                يحتاجها يضم البوت اليوم{" "}
                <strong  className="text-gray-950">فريقا من 30 طبيبا وطبيبا</strong> طبيا{" "}
                <strong  className="text-gray-950"> يعملون ضمن 20 اختصاصا </strong> متنوعا ليقدموا استشارات
                سريعه مبسطه بكل احترام وسريه واهتمام ومنذ انطلاقته قدم البوت
                اكثر من 250 استشاره طبيه كانت بدايه طبيه لمسار نأمل ان يتسع
                ليشمل كل من يبحث عن اجابه مطمئنه او توجيه اولي سليم نحن في مؤسسه{" "}
                <strong  className="text-gray-950">ميديا لايف الطبيه الخيريه</strong> نؤمن بان الطب رساله
                والتكنولوجيا وسيله لخدمه الانسان ولهذا ولد هذا البوت من القلب
                وبالعلم ولكل من يحتاجه{" "}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <AnimatedCounter target={2025} />
                  <div className="text-gray-600"> اطلق عام </div>
                </div>
                <div className="text-center">
                  <AnimatedCounter target={30} />
                  <div className="text-gray-600">طبيب متخصص</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter target={250} />
                  <div className="text-gray-600">استشاره طبيه </div>
                </div>
                <div className="text-center">
                  <AnimatedCounter target={20} />
                  <div className="text-gray-600"> اختصاص طبي</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      {/* <div
        className="relative py-20"
        style={{
          backgroundImage: `url(${callBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#fa3f4871]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl text-minColor font-bold mb-6">
            للحالات الطارئة
          </h2>
          <p className="text-xl mb-8">نحن متواجدون على مدار الساعة لمساعدتك</p>
          <div className="text-4xl font-bold mb-4">1234-567-890</div>
          <button className="bg-bgColor text-minColor px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 hover:text-bgColor transition-colors">
            اتصل بنا الآن
          </button>
        </div>
      </div> */}

      {/* Departments */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              منصات الفريق
            </h2>
            <p className="text-lg text-gray-600">يمكنك متابعتنا على منصاتنا </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Departments}
          </div>
        </div>
      </div>
    </div>
  );
}
