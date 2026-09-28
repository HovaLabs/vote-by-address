import React, { useEffect, useState } from "react";
import google from "./media/google.svg";
import arrow from "./media/arrow.svg";
import { Button, Spacer, Text } from "../design-system";
import * as S from "./SearchStyles";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Footer } from "../Footer";
import { Suggestion, useAddressAutocomplete } from "./useAddressAutocomplete";

const useQuery = () => new URLSearchParams(useLocation().search);

const Search: React.FC = () => {
  const query = useQuery();
  const [address, setAddress] = useState(query.get("address") || "");
  const history = useHistory();
  const error = query.get("error");
  const {
    suggestions,
    selectSuggestion,
    clearSuggestions,
  } = useAddressAutocomplete(address);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isOpen = suggestions.length > 0;

  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  const pickSuggestion = async (suggestion: Suggestion) => {
    setAddress(suggestion.text);
    const fullAddress = await selectSuggestion(suggestion);
    // Don't overwrite anything typed while the full address was loading
    setAddress((current) =>
      current === suggestion.text ? fullAddress : current
    );
  };

  return (
    <S.ContainerOuter>
      <S.Form
        flex="1"
        width="100%"
        height="100%"
        position={{ mobile: "relative", tablet: "absolute" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="stretch"
        padding={{ mobile: "32px", tablet: "32px", desktop: "64px" }}
        onSubmit={(e) => {
          // Add onSubmit handler so users can hit enter to submit form
          e.preventDefault();
          history.push(`/result/${address}`);
        }}
      >
        <Text
          id="label"
          as="label"
          typography={{ mobile: "heading4", tablet: "heading0" }}
        >
          <strong>Enter your full address</strong> to get local election info:
        </Text>

        <S.ContainerInput>
          <S.ContainerAutocomplete>
            <S.Input
              role="combobox"
              aria-labelledby="label"
              aria-autocomplete="list"
              aria-expanded={isOpen}
              aria-controls={isOpen ? "address-suggestions" : undefined}
              aria-activedescendant={
                activeIndex >= 0
                  ? `address-suggestion-${activeIndex}`
                  : undefined
              }
              autoComplete="off"
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              onKeyDown={(event) => {
                if (!isOpen) {
                  return;
                }
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActiveIndex((i) => (i + 1) % suggestions.length);
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActiveIndex((i) => (i <= 0 ? suggestions.length : i) - 1);
                } else if (event.key === "Enter" && activeIndex >= 0) {
                  // Pick the highlighted suggestion instead of submitting the form
                  event.preventDefault();
                  pickSuggestion(suggestions[activeIndex]);
                } else if (event.key === "Escape") {
                  clearSuggestions();
                }
              }}
              onBlur={clearSuggestions}
              value={address}
              placeholder="1600 Pennsylvania Ave., Washington, D.C., 20500"
            />
            {isOpen ? (
              <S.Suggestions>
                <ul
                  id="address-suggestions"
                  role="listbox"
                  aria-labelledby="label"
                >
                  {suggestions.map((suggestion, index) => (
                    <S.Suggestion
                      key={suggestion.id}
                      id={`address-suggestion-${index}`}
                      role="option"
                      aria-selected={index === activeIndex}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(event) => {
                        // Keep focus in the input so onBlur doesn't close the list first
                        event.preventDefault();
                        pickSuggestion(suggestion);
                      }}
                    >
                      <strong>{suggestion.mainText}</strong>
                      {suggestion.secondaryText
                        ? `, ${suggestion.secondaryText}`
                        : ""}
                    </S.Suggestion>
                  ))}
                </ul>
                <S.Attribution>Google Maps</S.Attribution>
              </S.Suggestions>
            ) : null}
          </S.ContainerAutocomplete>
          <Link to={`/result/${address}`}>
            <Button size="mediumSquare" variant="primarySquare">
              <img alt="arror" src={arrow} />
            </Button>
          </Link>
        </S.ContainerInput>
        {error ? (
          <>
            <Spacer height={32} />
            <Text typography="paragraph0" color="error">
              {error}
            </Text>
          </>
        ) : null}
        <Spacer height={32} />
        <S.Google>
          Data courtesy of:
          <Spacer width={12} />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://developers.google.com/civic-information"
          >
            <img alt="google-logo" src={google} />
          </a>
        </S.Google>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://developers.google.com/civic-information"
        >
          Learn more
        </a>
      </S.Form>
      <Footer />
    </S.ContainerOuter>
  );
};

export default Search;
