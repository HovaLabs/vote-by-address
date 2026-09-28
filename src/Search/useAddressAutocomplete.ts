import React from "react";

// Minimal types for the parts of the Places API (New) we use.
// https://developers.google.com/maps/documentation/javascript/place-autocomplete-data
type FormattableText = { text: string };

type PlacePrediction = {
  placeId: string;
  text: FormattableText;
  mainText: FormattableText | null;
  secondaryText: FormattableText | null;
  toPlace: () => {
    fetchFields: (options: { fields: string[] }) => Promise<unknown>;
    formattedAddress?: string | null;
  };
};

type PlacesLibrary = {
  AutocompleteSessionToken: new () => unknown;
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions: (request: {
      input: string;
      sessionToken: unknown;
      includedPrimaryTypes: string[];
      includedRegionCodes: string[];
    }) => Promise<{
      suggestions: { placePrediction: PlacePrediction | null }[];
    }>;
  };
};

declare global {
  interface Window {
    google?: { maps?: { places?: PlacesLibrary } };
    initGooglePlaces?: () => void;
  }
}

export type Suggestion = {
  id: string;
  text: string;
  mainText: string;
  secondaryText: string;
  prediction: PlacePrediction;
};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""; // needs Maps JavaScript API + Places API (New) enabled
const DEBOUNCE_MS = 200;
const MIN_INPUT_LENGTH = 3;

let placesPromise: Promise<PlacesLibrary> | null = null;

// Loads the Google Maps script once, the first time someone types an address
const loadPlaces = (): Promise<PlacesLibrary> => {
  if (placesPromise) {
    return placesPromise;
  }
  placesPromise = new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve(window.google.maps.places);
      return;
    }
    window.initGooglePlaces = () => {
      if (window.google?.maps?.places) {
        resolve(window.google.maps.places);
      } else {
        reject(new Error("Places library missing"));
      }
    };
    const params = new URLSearchParams({
      key: GOOGLE_MAPS_API_KEY,
      libraries: "places",
      loading: "async",
      callback: "initGooglePlaces",
    });
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.onerror = () => {
      placesPromise = null;
      script.remove();
      reject(new Error("Failed to load Google Maps"));
    };
    document.head.appendChild(script);
  });
  return placesPromise;
};

const toSuggestion = (prediction: PlacePrediction): Suggestion => ({
  id: prediction.placeId,
  text: prediction.text.text,
  mainText: prediction.mainText?.text ?? prediction.text.text,
  secondaryText: prediction.secondaryText?.text ?? "",
  prediction,
});

// Suggests US street addresses as the user types. Does nothing without an API
// key, so the input falls back to a plain text field.
export const useAddressAutocomplete = (
  input: string
): {
  suggestions: Suggestion[];
  selectSuggestion: (suggestion: Suggestion) => Promise<string>;
  clearSuggestions: () => void;
} => {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  // A session groups the keystrokes for one address lookup so Google bills it as one
  const sessionToken = React.useRef<unknown>(null);
  // Input that shouldn't trigger a lookup: the prefilled value and picked suggestions
  const ignoredInput = React.useRef(input);

  React.useEffect(() => {
    if (
      !GOOGLE_MAPS_API_KEY ||
      input === ignoredInput.current ||
      input.trim().length < MIN_INPUT_LENGTH
    ) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      try {
        const places = await loadPlaces();
        if (!sessionToken.current) {
          sessionToken.current = new places.AutocompleteSessionToken();
        }
        const response = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
          {
            input,
            sessionToken: sessionToken.current,
            includedPrimaryTypes: ["street_address", "premise", "subpremise"],
            includedRegionCodes: ["us"],
          }
        );
        if (!cancelled) {
          setSuggestions(
            response.suggestions
              .map(({ placePrediction }) => placePrediction)
              .filter((p): p is PlacePrediction => p != null)
              .map(toSuggestion)
          );
        }
      } catch (ex) {
        console.error("address autocomplete fail", ex);
        if (!cancelled) {
          setSuggestions([]);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [input]);

  // Resolves a suggestion to its full formatted address (with zip code), which
  // also ends the billing session
  const selectSuggestion = React.useCallback(
    async (suggestion: Suggestion): Promise<string> => {
      ignoredInput.current = suggestion.text;
      setSuggestions([]);
      sessionToken.current = null;
      let address = suggestion.text;
      try {
        const place = suggestion.prediction.toPlace();
        await place.fetchFields({ fields: ["formattedAddress"] });
        address = place.formattedAddress || suggestion.text;
      } catch (ex) {
        console.error("address details fail", ex);
      }
      ignoredInput.current = address;
      return address;
    },
    []
  );

  const clearSuggestions = React.useCallback(() => setSuggestions([]), []);

  return { suggestions, selectSuggestion, clearSuggestions };
};
