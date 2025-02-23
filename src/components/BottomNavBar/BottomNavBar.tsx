import { FC } from "react";
import { AppShell, Group, Stack, Text } from "@mantine/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type IconType = "home" | "search" | "person";

export type BottomNavBarProps = {
  currentTabNum: number;
};

type TabItem = {
  tabNum: number;
  title: string;
  iconName: IconType;
  to: string;
};

const tabItems: TabItem[] = [
  { tabNum: 0, title: "ホーム", iconName: "home", to: "/" },
  { tabNum: 1, title: "チャレンジ", iconName: "search", to: "/challenge" },
  { tabNum: 2, title: "マイページ", iconName: "person", to: "/setting" },
];

export const BottomNavBar: FC<BottomNavBarProps> = ({ currentTabNum }) => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <AppShell.Footer>
        <Group grow gap={0}>
          {tabItems.map((item) => (
            <_Stack
              onClick={() => {
                navigate(item.to);
              }}
            >
              <MaterialIcon
                selected={currentTabNum === item.tabNum}
                iconName={item.iconName}
              />
              <Text size="xs">{item.title}</Text>
            </_Stack>
          ))}
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
};

const _Stack = styled(Stack)`
  height: 60px;
  align-items: center;
  justify-content: center;
  gap: 0;
  cursor: pointer;
`;

type MaterialIconProps = {
  selected: boolean;
  iconName: string;
};

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  selected,
  iconName,
}) => {
  return (
    <>
      {selected ? (
        <_Icon className="material-icons" selected={selected}>
          {iconName}
        </_Icon>
      ) : (
        <_Icon className="material-icons-outlined" selected={selected}>
          {iconName}
        </_Icon>
      )}
    </>
  );
};

const _Icon = styled.span<{ selected: boolean }>`
  height: 26px;
  font-size: ${({ selected }) => (selected ? "26px" : "24px")};
`;
