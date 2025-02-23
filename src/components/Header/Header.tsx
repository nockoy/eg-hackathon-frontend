import { FC } from "react";
import { Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styled from "styled-components";

export const Header: FC = () => {
  const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);

  return (
    <_Header>
      <Group justify="center" h="100%">
        <_Logo src="/img/committy.svg" alt="Comitty" />
        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
      </Group>
    </_Header>
  );
};

const _Header = styled.header`
  width: 100%;
  height: 60px;
  padding: 0 var(--mantine-spacing-md);
  border-bottom: 1px solid
    light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
`;

const _Logo = styled.img`
  height: 32px;
`;
