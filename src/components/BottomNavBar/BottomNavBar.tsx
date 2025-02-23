import { FC } from "react";
import { AppShell, Group, Stack, Text } from "@mantine/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type ActiveTab = "home" | "search" | "person";

export type BottomNavBarProps = {
  activeTab: ActiveTab;
};

export const BottomNavBar: FC<BottomNavBarProps> = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <AppShell.Footer>
        <Group grow gap={0}>
          <_Stack
            onClick={() => {
              navigate("/");
            }}
          >
            <MaterialIcon activeTab={activeTab} iconName="home" />
            <Text size="xs">ホーム</Text>
          </_Stack>
          <_Stack
            onClick={() => {
              navigate("/search");
            }}
          >
            <MaterialIcon activeTab={activeTab} iconName="search" />
            <Text size="xs">チャレンジ</Text>
          </_Stack>
          <_Stack
            onClick={() => {
              navigate("/setting");
            }}
          >
            <MaterialIcon activeTab={activeTab} iconName="person" />
            <Text size="xs">マイページ</Text>
          </_Stack>
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
  activeTab: ActiveTab;
  iconName: string;
};

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  activeTab,
  iconName,
}) => {
  const isSelected = activeTab === iconName;

  return (
    <>
      {isSelected ? (
        <_Icon className="material-icons" selected={isSelected}>
          {iconName}
        </_Icon>
      ) : (
        <_Icon className="material-icons-outlined" selected={isSelected}>
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
