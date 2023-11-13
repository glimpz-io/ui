"use client";

import { BASE_URL } from "@glimpz-io/config";
import { useAnalytics, useReferral } from "@glimpz-io/hooks";
import { Copy, Link } from "@glimpz-io/ui";
import { BrandFacebook, BrandLinkedin, BrandTwitter } from "tabler-icons-react";

interface ReferralProps {
    referral?: string;
}

export function Index({ referral }: ReferralProps): JSX.Element {
    useReferral(referral);
    const analytics = useAnalytics();

    if (referral) analytics.identify(referral);

    const twitterIcon = () => <BrandTwitter />;
    const facebookIcon = () => <BrandFacebook />;
    const linkedInIcon = () => <BrandLinkedin />;

    const signupUrl = referral ? `${BASE_URL}?referral=${referral}` : null;
    const socialText = signupUrl
        ? encodeURIComponent(
              `Excited to share #Glimpz, an app designed to streamline in-person networking. Looking forward to leveraging its potential! 👔🔗\n\nJoin the early access wait list with me: ${signupUrl}`
          )
        : null;

    const linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=${BASE_URL}`;
    const twitterLink = socialText ? `https://twitter.com/intent/tweet?text=${socialText}` : null;
    const facebookLink = `https://www.facebook.com/share.php?u=${BASE_URL}`;

    return (
        <>
            {signupUrl && (
                <Copy
                    value={signupUrl}
                    onClick={() => {
                        analytics.track("Copy Code");
                    }}
                />
            )}
            <Link
                href={linkedInLink}
                color="darkblue"
                icon={linkedInIcon}
                size="large"
                newTab={true}
                onClick={() => {
                    analytics.track("Share LinkedIn");
                }}
            >
                Share To LinkedIn
            </Link>
            {twitterLink && (
                <Link
                    href={twitterLink}
                    color="lightblue"
                    icon={twitterIcon}
                    size="large"
                    newTab={true}
                    onClick={() => {
                        analytics.track("Share Twitter");
                    }}
                >
                    Share To Twitter
                </Link>
            )}
            <Link
                href={facebookLink}
                color="indigo"
                icon={facebookIcon}
                size="large"
                newTab={true}
                onClick={() => {
                    analytics.track("Share Facebook");
                }}
            >
                Share To FaceBook
            </Link>
        </>
    );
}
