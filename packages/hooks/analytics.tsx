"use client";

import mixpanel, { Mixpanel } from "mixpanel-browser";
import { createContext, useContext } from "react";

export const contextAnalytics = createContext<Mixpanel | undefined>(undefined);

interface Props {
    children: any;
    mixpanelToken: string;
}

export function AnalyticsProvider({ children, mixpanelToken }: Props): JSX.Element {
    mixpanel.init(mixpanelToken, { track_pageview: true, debug: true, persistence: "localStorage" });

    return <contextAnalytics.Provider value={mixpanel}>{children}</contextAnalytics.Provider>;
}

export function useAnalytics() {
    const analytics = useContext(contextAnalytics);
    if (!analytics) throw Error("analytics context not yet initialized");

    return analytics;
}
