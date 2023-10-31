import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { userState } from "../stores/userState";
import AppLayout from "../layouts/AppLayout";
import Footer from "../contents/FooterContent";
import GlobalCss from "../components/GlobalCss";
import Header from "../contents/HeaderContent";
import LoginWrapper from "../components/LoginWrapper";
import SideBar from "../contents/SideBarContent";

const AppView = () => {
  const user = useSyncExternalStore(userState.subscribe, userState.get);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  const fetchUserData = async () => {
    setLoading(true);
    await userState.fetchUserData();
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await userState.logoutUser();
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
    ref.current = setInterval(fetchUserData, 5 * 60 * 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);

  return (
    <>
      <GlobalCss />;
      <AppLayout
        sidebar={<SideBar />}
        header={<Header user={user} handleLogout={handleLogout} />}
        content={
          <LoginWrapper
            user={user}
            loading={loading}
            fetchUserData={fetchUserData}
          >
            <Outlet />
          </LoginWrapper>
        }
        footer={<Footer />}
      />
    </>
  );
};

export default AppView;