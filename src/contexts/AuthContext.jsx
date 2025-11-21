import  { createContext, useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";

// إنشاء السياق
const AuthContext = createContext(null);

// مكون AuthProvider
const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // تحميل بيانات المستخدم من الكوكيز عند التحميل الأولي
  useEffect(() => {
    const token = cookies.get("access_token");
    const userData = cookies.get("user");

    if (token && userData) {
      setUser({ ...userData, token });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (responseData) => {
    try {
      const { user: userData, access_token } = responseData;

      // حفظ بيانات المستخدم والرمز في الكوكيز
      const expires = new Date();
      expires.setDate(expires.getDate() + 7); // انتهاء الصلاحية بعد أسبوع

      cookies.set("access_token", access_token);
      cookies.set("user", userData, { path: "/", expires });

      setUser({ ...userData, token: access_token });
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    try {
      // حذف الكوكيز
      cookies.remove("access_token", { path: "/" });
      cookies.remove("user", { path: "/" });

      // إعادة تعيين حالة المستخدم
      setUser(null);
      setIsAuthenticated(false);

      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// خطاف useAuth
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
