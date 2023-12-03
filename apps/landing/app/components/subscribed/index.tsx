"use client";

import { useAnalytics, useOrigin, useReferral } from "@glimpzio/hooks";
import { Copy, Link } from "@glimpzio/ui";
import { BrandFacebook, BrandLinkedin, BrandTwitter, Link as LinkIcon } from "tabler-icons-react";

interface IndexProps {
    referral?: string;
}

export default function Index(props: IndexProps): JSX.Element {
    useReferral(props.referral);
    const analytics = useAnalytics();
    const origin = useOrigin();

    if (props.referral) analytics.identify(props.referral);

    const linkIcon = () => <LinkIcon />;
    const twitterIcon = () => <BrandTwitter />;
    const facebookIcon = () => <BrandFacebook />;
    const linkedInIcon = () => <BrandLinkedin />;

    const signupUrl = props.referral && origin ? `${origin}?referral=${props.referral}` : null;
    const signupUrlEncoded = signupUrl ? encodeURIComponent(signupUrl) : null;
    const socialText = signupUrl
        ? encodeURIComponent(
              `Excited to share #Glimpz, an app designed to streamline in-person networking. Looking forward to leveraging its potential! 👔🔗\n\nJoin the early access waitlist with me: ${signupUrl}`
          )
        : null;

    const linkedInLink = "https://www.linkedin.com/company/glimpzio";
    const twitterLink = socialText ? `https://twitter.com/intent/tweet?text=${socialText}` : null;
    const facebookLink = signupUrlEncoded ? `https://www.facebook.com/share.php?u=${signupUrlEncoded}` : null;

    return (
        <>
            {signupUrl && (
                <Copy
                    icon={linkIcon}
                    value={signupUrl}
                    onClick={() => {
                        analytics.track && analytics.track("Copy Code");
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
                    analytics.track && analytics.track("Follow LinkedIn Page");
                }}
            >
                Follow Us On LinkedIn
            </Link>
            {twitterLink && (
                <Link
                    href={twitterLink}
                    color="lightblue"
                    icon={twitterIcon}
                    size="large"
                    newTab={true}
                    onClick={() => {
                        analytics.track && analytics.track("Share Twitter");
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
                        analytics.track && analytics.track("Share Facebook");
                    }}
                >
                    Share To Facebook
                </Link>
            )}
        </>
    );
}
