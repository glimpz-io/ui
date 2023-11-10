"use client";

import { Container, Copy, Link, Text } from "@glimpz-io/ui";
import { useReferral } from "@glimpz-io/hooks";
import { BASE_URL } from "@glimpz-io/config";
import { BrandFacebook, BrandTwitter } from "tabler-icons-react";

export default function Page(): JSX.Element {
    const referral = useReferral(true);

    const twitterIcon = () => <BrandTwitter />;
    const facebookIcon = () => <BrandFacebook />;

    const signupUrl = referral ? `${BASE_URL}?referral=${referral}` : null;
    const socialText = signupUrl
        ? encodeURIComponent(
              `Just discovered #Glimpz, a cool app that takes the awkward out of meeting people face-to-face. Can't wait to try it! 🥳\n\nJoin the early access wait list with me: ${signupUrl}`
          )
        : null;

    const twitterLink = socialText ? `https://twitter.com/intent/tweet?text=${socialText}` : null;
    const facebookLink = `https://www.facebook.com/share.php?u=${BASE_URL}`;

    return (
        <Container direction="vertical" size="half">
            <Text type="title" alignment="centre">
                <Text type="highlight">Thank You</Text>, you&apos;re awesome!
            </Text>
            <Text type="p" alignment="centre">
                You&apos;ve now been added to our wait list! In the meantime, share our mission with <Text type="bold">your friends</Text> to increase your chance of gaining early access!
            </Text>
            <Text type="h3" alignment="centre">
                Share your unique code with your friends! (click to copy)
            </Text>
            {signupUrl && <Copy value={signupUrl} />}
            {twitterLink && (
                <Link href={twitterLink} color="lightblue" icon={twitterIcon} size="large" newTab={true}>
                    Share To Twitter
                </Link>
            )}
            <Link href={facebookLink} color="darkblue" icon={facebookIcon} size="large" newTab={true}>
                Share To FaceBook
            </Link>
        </Container>
    );
}
