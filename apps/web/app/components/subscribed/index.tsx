"use client";

import { BASE_URL } from "@glimpzio/config";
import { useAnalytics, useReferral } from "@glimpzio/hooks";
import { Copy, Link } from "@glimpzio/ui";
import { BrandFacebook, BrandLinkedin, BrandTwitter, Link as LinkIcon } from "tabler-icons-react";

interface ReferralProps {
    referral?: string;
}

export function Index({ referral }: ReferralProps): JSX.Element {
    useReferral(referral);
    const analytics = useAnalytics();

    if (referral) analytics.identify(referral);

    const linkIcon = () => <LinkIcon />;
    const twitterIcon = () => <BrandTwitter />;
    const facebookIcon = () => <BrandFacebook />;
    const linkedInIcon = () => <BrandLinkedin />;

    const signupUrl = referral ? `${BASE_URL}?referral=${referral}` : null;
    const signupUrlEncoded = signupUrl ? encodeURIComponent(signupUrl) : null;
    const socialText = signupUrl
        ? encodeURIComponent(
              `Excited to share #Glimpz, an app designed to streamline in-person networking. Looking forward to leveraging its potential! 👔🔗\n\nJoin the early access waitlist with me: ${signupUrl}`
          )
        : null;

    const linkedInLink = signupUrlEncoded ? `https://www.linkedin.com/sharing/share-offsite/?url=${signupUrlEncoded}` : null;
    const twitterLink = socialText ? `https://twitter.com/intent/tweet?text=${socialText}` : null;
    const facebookLink = signupUrlEncoded ? `https://www.facebook.com/share.php?u=${signupUrlEncoded}` : null;

    return (
        <>
            {signupUrl && (
                <Copy
                    icon={linkIcon}
                    value={signupUrl}
                    onClick={() => {
                        analytics.track("Copy Code");
                    }}
                />
            )}
            {linkedInLink && (
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
            )}
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
            {facebookLink && (
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
                    Share To Facebook
                </Link>
            )}
        </>
    );
}
