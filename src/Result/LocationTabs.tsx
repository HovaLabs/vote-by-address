import React from "react";
import * as S from "./LocationTabsStyles";

type LocationTab = {
  id: string;
  label: string;
  // What the list is, shown above it
  description: string;
  count: number;
  content: React.ReactNode;
};

// Switches between the early vote, drop box, and polling location lists, one at a time
export const LocationTabs: React.FC<{ tabs: LocationTab[] }> = ({ tabs }) => {
  const [selectedId, setSelectedId] = React.useState(tabs[0]?.id);
  const tabRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  // A new address may not have the list that was picked for the last one
  const selected = tabs.find((tab) => tab.id === selectedId) ?? tabs[0];

  if (selected == null) {
    return null;
  }

  const select = (tab: LocationTab) => {
    setSelectedId(tab.id);
    tabRefs.current[tab.id]?.focus();
  };

  // Arrow keys, Home, and End move between tabs, per the WAI-ARIA tabs pattern
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    const nextIndex = {
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowRight: index === last ? 0 : index + 1,
      Home: 0,
      End: last,
    }[event.key];
    if (nextIndex !== undefined) {
      event.preventDefault();
      select(tabs[nextIndex]);
    }
  };

  return (
    <>
      <S.ContainerTabs>
        <S.TabList role="tablist" aria-label="Voting locations">
          {tabs.map((tab, index) => {
            const isSelected = tab.id === selected.id;
            return (
              <S.Tab
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[tab.id] = element;
                }}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                $selected={isSelected}
                onClick={() => select(tab)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {tab.label}
                <S.TabCount $selected={isSelected}>{tab.count}</S.TabCount>
              </S.Tab>
            );
          })}
        </S.TabList>
      </S.ContainerTabs>
      <S.TabPanel
        id={`tabpanel-${selected.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${selected.id}`}
      >
        <S.TabDescription>{selected.description}</S.TabDescription>
        {selected.content}
      </S.TabPanel>
    </>
  );
};
