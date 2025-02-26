import {
  Anchor,
  Button,
  // Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useToggle } from "@mantine/hooks";
import { GoogleButton } from "../Button/GoogleButton";
import styled from "styled-components";
import { ReactNode, useContext } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import api from "../../../../api/axios";
import { UserContext } from "../../../../contexts/UserContext";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthenticationForm = (props: PaperProps) => {
  const { setUser } = useContext(UserContext);
  const { signInWithGoogle, signIn, signUp, loading } = useAuth();
  const [type, toggle] = useToggle(["login", "register"]);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      nickname: "",
      password: "",
      // terms: true, // TODO: 利用規約を作成する
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "6文字以上で入力してください" : null,
    },
  });

  const onSubmit = form.onSubmit(async (values) => {
    if (type === "login") {
      try {
        await signIn(values.email, values.password);
        const res = await api.get(`/auth/login?email=${values.email}`);
        console.log(res);

        setUser({
          userId: res.data.id,
          nickname: res.data.name,
        });
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const res = await api.post("/auth/signup", {
          email: values.email,
          name: values.nickname,
        });
        await signUp(values.email, values.password);
        console.log(res);

        setUser({
          userId: res.data.id,
          nickname: res.data.name,
        });
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  });

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();

      // Firebase authから直接現在のユーザー情報を取得
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser && currentUser.email) {
        const email = currentUser.email;
        const name = currentUser.displayName || "";

        try {
          // まずログインを試みる
          const res = await api.get(`/auth/login?email=${email}`);

          setUser({
            userId: res.data.id,
            nickname: res.data.name,
          });
          navigate("/");
        } catch  {
          // ログインに失敗した場合（ユーザーが存在しない場合）
          console.log("サインアップを試みます");

          // サインアップを試みる
          const signupRes = await api.post("/auth/signup", {
            email: email,
            name: name,
          });

          setUser({
            userId: signupRes.data.id,
            nickname: signupRes.data.name,
          });
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Google認証エラー:", error);
    }
  };

  return (
    <_Paper radius="md" p="xl" withBorder {...props}>
      <_TextWrapper>
        <_Logo src="/img/committy_round.svg" alt="Committy" />
      </_TextWrapper>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={handleGoogleSignIn}>
          Googleでログイン
        </GoogleButton>
      </Group>

      <Divider label="または" labelPosition="center" my="lg" />

      <form onSubmit={onSubmit}>
        <Stack>
          {type === "register" && (
            <TextInput
              required
              label="ニックネーム"
              size="md"
              placeholder=""
              value={form.values.nickname}
              onChange={(event) =>
                form.setFieldValue("nickname", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="メールアドレス"
            size="md"
            placeholder=""
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="パスワード"
            size="md"
            placeholder=""
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password && "6文字以上で入力してください"}
            radius="md"
          />

          {/* 利用規約 */}
          {/* {type === "register" && (
            <Checkbox
              label="利用規約に同意する"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )} */}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "アカウントをお持ちの方はログイン"
              : "アカウントを作成"}
          </Anchor>
          <Button type="submit" radius="xl" disabled={loading}>
            {type === "register" ? "登録" : "ログイン"}
          </Button>
        </Group>
      </form>
    </_Paper>
  );
};

const _Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const _TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface PaperPropsWithChildren extends PaperProps {
  children: ReactNode;
}

const _Paper = styled(Paper)<PaperPropsWithChildren>`
  width: 100%;
  max-width: 340px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
