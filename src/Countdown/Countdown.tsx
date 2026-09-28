import React from "react";
import { Box, Spacer, Text } from "../design-system";
import { Footer } from "../Footer";
import { getNextElection } from "../elections";
import * as S from "./CountdownStyles";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const useNow = (): Date => {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), SECOND);
    return () => window.clearInterval(interval);
  }, []);
  return now;
};

const formatElectionDay = (date: Date): string =>
  new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

export const Countdown: React.FC = () => {
  const now = useNow();
  const election = getNextElection(now);
  const remaining = election.date.getTime() - now.getTime();
  const units = [
    { name: "DAYS", value: Math.floor(remaining / DAY) },
    { name: "HOURS", value: Math.floor((remaining % DAY) / HOUR) },
    { name: "MINUTES", value: Math.floor((remaining % HOUR) / MINUTE) },
    { name: "SECONDS", value: Math.floor((remaining % MINUTE) / SECOND) },
  ];

  return (
    <S.ContainerOuter>
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding={{ mobile: "32px", tablet: "32px", desktop: "64px" }}
      >
        {remaining > 0 ? (
          <>
            <Text
              as="h1"
              typography={{ mobile: "heading4", tablet: "heading0" }}
            >
              Countdown to the <strong>{election.name}</strong>
            </Text>
            <Spacer height={{ mobile: "32px", desktop: "48px" }} />
            <S.Units role="timer">
              {units.map(({ name, value }) => (
                <div key={name}>
                  <S.Value>{String(value).padStart(2, "0")}</S.Value>
                  <Text
                    typography={{ mobile: "paragraph1", tablet: "paragraph0" }}
                  >
                    {name}
                  </Text>
                </div>
              ))}
            </S.Units>
            <Spacer height={{ mobile: "32px", desktop: "48px" }} />
            <Text
              as="p"
              typography={{ mobile: "paragraph0", tablet: "heading6" }}
            >
              Election Day is {formatElectionDay(election.date)}
            </Text>
          </>
        ) : (
          <Text as="h1" typography={{ mobile: "heading4", tablet: "heading0" }}>
            <strong>It&apos;s Election Day.</strong> Go vote!
          </Text>
        )}
      </Box>
      <Footer />
    </S.ContainerOuter>
  );
};
