import {useContext, useEffect} from "react";
import {useLocation} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import {trackSiteEvent} from "../services/siteOSAPI";

export default function RouteAnalytics() {
  const location = useLocation();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    trackSiteEvent({
      eventType: "navigation",
      eventName: "page_view",
      pagePath: location.pathname,
      userId: user?.id,
      sessionToken: user?.sessionToken,
      clientTs: new Date().toISOString(),
      payload: {
        search: location.search || ""
      }
    });
  }, [location.pathname, location.search, user]);

  return null;
}
