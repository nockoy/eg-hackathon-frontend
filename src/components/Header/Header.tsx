import { FC } from "react";
import { Group } from "@mantine/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <_Header>
      <Group justify="center" h="100%">
        <_Logo
          src="/img/committy.svg"
          alt="Committy"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      </Group>
    </_Header>
  );
};

const _Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid
    light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
  z-index: 100;
  background-color: var(--mantine-color-white);
`;

const _Logo = styled.img`
  height: 40px;
`;
