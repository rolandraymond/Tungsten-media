import { createContext, useContext, useEffect, useCallback, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface TrackingContextType {
  trackEvent: (eventName: string, data?: Record<string, unknown>) => void;
}

const TrackingContext = createContext<TrackingContextType>({
  trackEvent: () => {},
});

export const TrackingProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const trackEvent = useCallback((eventName: string, data?: Record<string, unknown>) => {
    console.log(`[Analytics] ${eventName}`, { path: location.pathname, ...data, timestamp: Date.now() });
    // TODO: Connect to GTM / Meta Pixel / GA4
    // window.dataLayer?.push({ event: eventName, ...data });
  }, [location.pathname]);

  useEffect(() => {
    trackEvent("pageview", { path: location.pathname });
  }, [location.pathname, trackEvent]);

  return (
    <TrackingContext.Provider value={{ trackEvent }}>
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = () => useContext(TrackingContext);
