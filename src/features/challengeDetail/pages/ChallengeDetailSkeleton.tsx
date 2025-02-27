import { Skeleton, Stack } from "@mantine/core";

export const ChallengeDetailSkeleton = () => (
  <Stack w="100%" gap={32} pt={80} pb={160}>
    <Stack gap={16}>
      <Stack
        gap={12}
        p={16}
        style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}
      >
        <Skeleton height={32} width="70%" mb={8} />

        <Skeleton height={20} width="60%" mb={8} />

        <Skeleton height={20} width="40%" mb={8} />

        <Skeleton height={20} width="50%" mb={8} />

        <Skeleton height={20} width="45%" mb={8} />

        <Skeleton
          height={120}
          width="100%"
          style={{
            backgroundColor: "white",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #eee",
            marginTop: "4px",
          }}
        />
      </Stack>
    </Stack>

    <Stack gap={16}>
      <Skeleton height={100} width="100%" radius="md" />
      <Skeleton height={48} width="100%" radius="xl" />
    </Stack>

    <Stack
      gap={16}
      mt={8}
      p={20}
      style={{
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Skeleton height={28} width="60%" mb={8} />

      {[1, 2, 3].map((_, index) => (
        <Stack
          key={index}
          gap={8}
          p={16}
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
        >
          <Skeleton height={24} width="100%" mb={8} />
          <Skeleton height={16} width="90%" />
          <Skeleton height={16} width="80%" />
        </Stack>
      ))}
    </Stack>
  </Stack>
);
