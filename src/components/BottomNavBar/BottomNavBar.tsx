import { FC } from "react";
import { AppShell, Group, Stack, Text } from "@mantine/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type IconType = "home" | "add_circle" | "groups" | "settings";

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
  { tabNum: 1, title: "新規目標", iconName: "add_circle", to: "/new-commit" },
  { tabNum: 2, title: "コミュニティ", iconName: "groups", to: "/community" },
  { tabNum: 3, title: "マイページ", iconName: "settings", to: "/setting" },
];

export const BottomNavBar: FC<BottomNavBarProps> = ({ currentTabNum }) => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <AppShell.Footer>
        <_SafeArea>
          <Group grow gap={0}>
            {tabItems.map((item) => (
              <_Stack
                key={item.tabNum}
                onClick={() => {
                  navigate(item.to);
                }}
              >
                <MaterialIcon
                  selected={currentTabNum === item.tabNum}
                  iconName={item.iconName}
                />
                <Text
                  size="xs"
                  style={{
                    fontWeight:
                      currentTabNum === item.tabNum ? "bold" : "normal",
                    color: currentTabNum === item.tabNum ? "#FF9D00" : "normal",
                  }}
                >
                  {item.title}
                </Text>
              </_Stack>
            ))}
          </Group>
        </_SafeArea>
      </AppShell.Footer>
    </AppShell>
  );
};

const _SafeArea = styled.div`
  padding-bottom: calc(env(safe-area-inset-bottom) * 0.2);
`;

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
  color: ${({ selected }) => (selected ? "#FF9D00" : "normal")};
`;
