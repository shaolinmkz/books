import { ReactNode, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    history.listen(() => {
      if(history.action === "PUSH") {
        window.scrollTo(0, 0);
      }
    })
    
  }, [location, history]);

  return <>{children}</>;
};

export default ScrollToTop;
