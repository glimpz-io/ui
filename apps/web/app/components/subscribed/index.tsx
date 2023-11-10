"use client";

import { BASE_URL } from "@glimpz-io/config";
import { useReferral } from "@glimpz-io/hooks";
import { Copy, Link } from "@glimpz-io/ui";
import { BrandTwitter } from "tabler-icons-react";

interface ReferralProps {
    referral?: string;
}

export function Index({ referral }: ReferralProps): JSX.Element {
    useReferral(referral);

    const twitterIcon = () => <BrandTwitter />;

    const signupUrl = referral ? `${BASE_URL}?referral=${referral}` : null;
    const socialText = signupUrl
        ? encodeURIComponent(
              `Just discovered #Glimpz, a cool app that takes the awkward out of meeting people face-to-face. Can't wait to try it! 🥳\n\nJoin the early access wait list with me: ${signupUrl}`
          )
        : null;
    const twitterLink = socialText ? `https://twitter.com/intent/tweet?text=${socialText}` : null;

    return (
        <>
            {signupUrl && <Copy value={signupUrl} />}
            {twitterLink && (
                <Link href={twitterLink} color="lightblue" icon={twitterIcon} size="large" newTab={true}>
                    Share To Twitter
                </Link>
            )}
        </>
    );
}
