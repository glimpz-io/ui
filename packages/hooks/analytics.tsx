"use client";

import mixpanel, { Mixpanel } from "mixpanel-browser";
import Script from "next/script";
import { createContext, useContext } from "react";

export const contextAnalytics = createContext<Mixpanel | undefined>(undefined);

interface Props {
    children: any;
    mixpanelToken: string;
    facebookId: string;
}

export function AnalyticsProvider({ children, mixpanelToken, facebookId }: Props): JSX.Element {
    mixpanel.init(mixpanelToken, { track_pageview: true, debug: true, persistence: "localStorage" });

    return (
        <contextAnalytics.Provider value={mixpanel}>
            <head>
                <Script strategy="lazyOnload">
                    {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${facebookId}');
                    fbq('track', 'PageView');
                    `}
                </Script>
            </head>
            <>{children}</>
        </contextAnalytics.Provider>
    );
}

export function useAnalytics() {
    const analytics = useContext(contextAnalytics);

    function track(eventName: string, options?: Object) {
        if (!analytics) throw Error("analytics context not yet initialized");

        analytics.track(eventName, options);
        // @ts-ignore
        fbq("trackCustom", eventName, options);
    }

    function identify(userId: string) {
        analytics!.identify(userId);
    }

    return { track, identify };
}
