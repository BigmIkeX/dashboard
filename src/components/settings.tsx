import React, { useState } from "react";
import styled from "styled-components";

import Select, { ValueType } from "react-select";

import { ISearchProviderProps } from "./searchBar";
import selectedTheme, { setTheme, IThemeProps } from "../lib/theme";
import { Button, SubHeadline } from "./elements";

import Modal from "./modal";

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const Table = styled.table`
  font-weight: 400;
  background: none;
  color: ${selectedTheme.mainColor};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${selectedTheme.mainColor};
`;

const TableCell = styled.td`
  background: none;
  padding-top: 0.5rem;
`;

const HeadCell = styled.th`
  font-weight: 700;
  background: none;
`;

const Section = styled.div`
  padding: 1rem 0;
`;

const SectionHeadline = styled(SubHeadline)`
  width: 100%;
  border-bottom: 1px solid ${selectedTheme.accentColor};
  margin-bottom: 0.5rem;
`;

const SelectorStyle: any = {
  container: (base: any): any => ({
    ...base,
    margin: "0 2px",
  }),
  control: (base: any): any => ({
    ...base,
    fontWeight: 500,
    color: selectedTheme.mainColor,
    textTransform: "uppercase",
    width: "12rem",
    background: "none",
    borderRadius: 0,
    border: "1px solid",
    borderColor: selectedTheme.mainColor,
    boxShadow: "none",
    "&:hover": {
      border: "1px solid",
      borderColor: selectedTheme.mainColor
    },
  }),
  dropdownIndicator: (base: any): any => ({
    ...base,
    color: selectedTheme.mainColor,
    "&:hover": {
      color: selectedTheme.mainColor
    }
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base: any): any => ({
    ...base,
    backgroundColor: selectedTheme.backgroundColor,
    border: "1px solid " + selectedTheme.mainColor,
    borderRadius: 0,
    boxShadow: "none",
    margin: "4px 0"
  }),
  option: (base: any): any => ({
    ...base,
    fontWeight: 500,
    color: selectedTheme.mainColor,
    textTransform: "uppercase",
    borderRadius: 0,
    boxShadow: "none",
    backgroundColor: selectedTheme.backgroundColor,
    "&:hover": {
      backgroundColor: selectedTheme.mainColor,
      color: selectedTheme.backgroundColor,
    },
  }),
  singleValue: (base: any): any => ({
    ...base,
    color: selectedTheme.mainColor,
  }),
};

interface ISettingsProps {
  themes: Array<IThemeProps> | undefined;
  providers: Array<ISearchProviderProps> | undefined;
}

/**
 * Handles the settings-modal
 * @param {Array<IThemeProps>} themes - the list of themes a user can select between
 * @param {Array<ISearchProviderProps>} providers - the list of search providers
 */
const Settings = ({ themes, providers }: ISettingsProps) => {
  const [newTheme, setNewTheme] = useState<IThemeProps>();

  if (themes && providers) {
    return (
      <Modal element="icon" icon="settings" title="Settings">
        {themes && (
          <Section>
            <SectionHeadline>Theme:</SectionHeadline>
            <FormContainer>
              <Select
                options={themes}
                defaultValue={selectedTheme}
                onChange={(e: ValueType<IThemeProps, false>) => {
                  if (e !== null && e !== undefined) setNewTheme(e);
                }}
                styles={SelectorStyle}
              />
              <Button onClick={() => setTheme(JSON.stringify(newTheme))}>
                Apply
              </Button>
              <Button onClick={() => window.location.reload()}>Refresh</Button>
            </FormContainer>
          </Section>
        )}
        {providers && (
          <Section>
            <SectionHeadline>Search Providers</SectionHeadline>
            <Table>
              <tbody>
                <TableRow>
                  <HeadCell>Search Provider</HeadCell>
                  <HeadCell>Prefix</HeadCell>
                </TableRow>
                {providers.map((provider, index) => (
                  <TableRow key={provider.name + index}>
                    <TableCell>{provider.name}</TableCell>
                    <TableCell>{provider.prefix}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </Section>
        )}
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default Settings;
