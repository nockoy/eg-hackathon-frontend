import { Skeleton, Stack } from "@mantine/core";

export const SkeletonCard = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "16px",
      border: "1px solid #e9e9e9",
      padding: "16px",
      boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.08)",
    }}
  >
    <Stack w="100%" gap={16}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Stack gap={4}>
          <Skeleton height={24} width={180} />
          <Skeleton height={16} width={200} />
        </Stack>
        <Stack gap={4} align="flex-end" w="fit-content">
          <Skeleton height={32} width={100} />
        </Stack>
      </div>

      <Stack gap={4}>
        <Skeleton height={22} width={160} />
        <Skeleton height={16} radius="xl" />
      </Stack>

      <Stack gap={4}>
        <Skeleton height={22} width={160} />
        <Skeleton height={16} radius="xl" />
      </Stack>

      <Stack justify="left" w="100%" gap={16}>
        <Skeleton height={16} width="80%" />
      </Stack>
    </Stack>
  </div>
);