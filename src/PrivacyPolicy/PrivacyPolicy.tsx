import React from "react";
import { Box, Spacer, Stack, Text } from "../design-system";
import { Footer } from "../Footer";

export const PrivacyPolicy: React.FC = () => (
  <Stack direction="vertical" space="32px" padding="32px">
    <Box>
      <a href="/">← Back to website</a>
    </Box>
    <Text as="h1" typography="heading3">
      Privacy Policy
    </Text>
    <Text typography="heading4">
      Your privacy is critically important to us.
    </Text>
    <Box>
      It is Hova Labs's policy to respect your privacy regarding any information
      we may collect while operating our website. This Privacy Policy applies to
      votebyaddress.com (hereinafter, "us", "we", or "votebyaddress.com"). We
      respect your privacy and are committed to protecting personally
      identifiable information you may provide us through the Website. We have
      adopted this privacy policy ("Privacy Policy") to explain what information
      may be collected on our Website, how we use this information, and under
      what circumstances we may disclose the information to third parties. This
      Privacy Policy applies only to information we collect through the Website
      and does not apply to our collection of information from other sources.
    </Box>
    <Box>
      This Privacy Policy, together with the Terms and conditions posted on our
      Website, set forth the general rules and policies governing your use of
      our Website. Depending on your activities when visiting our Website, you
      may be required to agree to additional terms and conditions.
    </Box>
    <Spacer height="16px" />
    <Text typography="heading3">Website Visitors</Text>
    <Box>
      Like most website operators, Hova Labs collects non-personally-identifying
      information of the sort that web browsers and servers typically make
      available, such as the browser type, language preference, referring site,
      and the date and time of each visitor request. Hova Labs's purpose in
      collecting non-personally identifying information is to better understand
      how Hova Labs's visitors use its website. From time to time, Hova Labs may
      release non-personally-identifying information in the aggregate, e.g., by
      publishing a report on trends in the usage of its website.
    </Box>
    <Box>
      Hova Labs also collects potentially personally-identifying information
      like Internet Protocol (IP) addresses for logged in users and for users
      leaving comments on http://votebyaddress.com blog posts. Hova Labs only
      discloses logged in user and commenter IP addresses under the same
      circumstances that it uses and discloses personally-identifying
      information as described below.
    </Box>
    <Spacer height="16px" />
    <Text typography="heading3">
      Gathering of Personally-Identifying Information
    </Text>
    <Box>
      Certain visitors to Hova Labs's websites choose to interact with Hova Labs
      in ways that require Hova Labs to gather personally-identifying
      information. The amount and type of information that Hova Labs gathers
      depends on the nature of the interaction. For example, we ask visitors who
      sign up for a blog at http://votebyaddress.com to provide a username and
      email address.
    </Box>
    <Spacer height="16px" />
    <Text typography="heading3">Security</Text>
    <Box>
      The security of your Personal Information is important to us, but remember
      that no method of transmission over the Internet, or method of electronic
      storage is 100% secure. While we strive to use commercially acceptable
      means to protect your Personal Information, we cannot guarantee its
      absolute security.
    </Box>
    <Spacer height="16px" />
    <Text typography="heading3">Links To External Sites</Text>
    <Box>
      Our Service may contain links to external sites that are not operated by
      us. If you click on a third party link, you will be directed to that third
      party's site. We strongly advise you to review the Privacy Policy and
      terms and conditions of every site you visit.
    </Box>
    <Box>
      We have no control over, and assume no responsibility for the content,
      privacy policies or practices of any third party sites, products or
      services.
    </Box>
    <Spacer height="16px" />
    <Text typography="heading3">Aggregated Statistics</Text>
    <Box>
      Hova Labs may collect statistics about the behavior of visitors to its
      website. Hova Labs may display this information publicly or provide it to
      others. However, Hova Labs does not disclose your personally-identifying
      information.
    </Box>
    <Spacer height="16px" />
    <Text typography="heading3">Cookies</Text>
    <Box>
      To enrich and perfect your online experience, Hova Labs uses "Cookies",
      similar technologies and services provided by others to display
      personalized content, appropriate advertising and store your preferences
      on your computer.
    </Box>
    <Box>
      A cookie is a string of information that a website stores on a visitor's
      computer, and that the visitor's browser provides to the website each time
      the visitor returns. Hova Labs uses cookies to help Hova Labs identify and
      track visitors, their usage of http://votebyaddress.com, and their website
      access preferences. Hova Labs visitors who do not wish to have cookies
      placed on their computers should set their browsers to refuse cookies
      before using Hova Labs's websites, with the drawback that certain features
      of Hova Labs's websites may not function properly without the aid of
      cookies.
    </Box>
    <Box>
      By continuing to navigate our website without changing your cookie
      settings, you hereby acknowledge and agree to Hova Labs's use of cookies.
    </Box>
    <Spacer height="16px" />
    <Text typography="heading3">Privacy Policy Changes</Text>
    <Box>
      Although most changes are likely to be minor, Hova Labs may change its
      Privacy Policy from time to time, and in Hova Labs's sole discretion. Hova
      Labs encourages visitors to frequently check this page for any changes to
      its Privacy Policy. Your continued use of this site after any change in
      this Privacy Policy will constitute your acceptance of such change.
    </Box>
    <Footer />
  </Stack>
);
