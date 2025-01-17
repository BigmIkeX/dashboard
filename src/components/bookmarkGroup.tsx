import React from "react";
import styled from "styled-components";
import { Item, SubHeadline } from "./elements";
import selectedTheme from "../lib/theme";

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2 1 auto;
  padding: 1rem 0;
`;

const Bookmark = styled.a`
  font-weight: 400;
  text-decoration: none;
  color: ${selectedTheme.accentColor};
  padding-top: 0.75rem;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

export interface IBookmarkProps {
  name: string;
  url: string;
}

export interface IBookmarkGroupProps {
  name: string;
  items: Array<IBookmarkProps>;
}

/**
 * Renders a given bookmark group
 * @param {IBookmarkGroupProps} props - The given props of the bookmark group
 */
export const BookmarkGroup = ({ name, items }: IBookmarkGroupProps) => (
  <Item>
    <GroupContainer>
      <SubHeadline>{name}</SubHeadline>
      {items.map(({ name, url }, idx) => (
        <Bookmark key={[name, idx].join("")} href={url}>
          {name}
        </Bookmark>
      ))}
    </GroupContainer>
  </Item>
);
