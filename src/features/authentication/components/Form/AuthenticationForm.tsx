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
import { ReactNode, useContext, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import api from "../../../../api/axios";
import { UserContext } from "../../../../contexts/UserContext";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export const AuthenticationForm = (props: PaperProps) => {
  const { setUser } = useContext(UserContext);
  const { signInWithGoogle, signIn, signUp, loading } = useAuth();
  const [type, toggle] = useToggle(["login", "register"]);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

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
    setError(null); // エラーをリセット

    if (type === "login") {
      try {
        const signInResult = await signIn(values.email, values.password);
        if (!signInResult.success) {
          setError(
            signInResult.message ||
              "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
          );
          notifications.show({
            title: "ログインエラー",
            message: signInResult.message || "ログインに失敗しました",
            color: "red",
          });
          return;
        }

        try {
          const res = await api.get(`/auth/login?email=${values.email}`);
          console.log(res);

          setUser({
            userId: res.data.id,
            nickname: res.data.name,
          });

          notifications.show({
            title: "ログイン成功",
            message: "ようこそ！",
            color: "green",
          });

          navigate("/");
        } catch (error) {
          console.error("APIエラー:", error);
          setError(
            "サーバーとの通信に失敗しました。しばらく経ってからお試しください。"
          );
          notifications.show({
            title: "サーバーエラー",
            message: "サーバーとの通信に失敗しました",
            color: "red",
          });
        }
      } catch (error) {
        console.error("認証エラー:", error);
        setError(
          "認証中にエラーが発生しました。しばらく経ってからお試しください。"
        );
        notifications.show({
          title: "認証エラー",
          message: "認証中にエラーが発生しました",
          color: "red",
        });
      }
    } else {
      try {
        const signUpResult = await signUp(values.email, values.password);
        if (!signUpResult.success) {
          setError(
            signUpResult.message ||
              "アカウント作成に失敗しました。別のメールアドレスをお試しください。"
          );
          notifications.show({
            title: "登録エラー",
            message: signUpResult.message || "アカウント作成に失敗しました",
            color: "red",
          });
          return;
        }

        try {
          const res = await api.post("/auth/signup", {
            email: values.email,
            name: values.nickname,
          });
          console.log(res);

          setUser({
            userId: res.data.id,
            nickname: res.data.name,
          });

          notifications.show({
            title: "登録成功",
            message: "アカウントが作成されました！",
            color: "green",
          });

          navigate("/");
        } catch (error) {
          console.error("APIエラー:", error);
          setError(
            "サーバーとの通信に失敗しました。しばらく経ってからお試しください。"
          );
          notifications.show({
            title: "サーバーエラー",
            message: "サーバーとの通信に失敗しました",
            color: "red",
          });
        }
      } catch (error) {
        console.error("認証エラー:", error);
        setError(
          "認証中にエラーが発生しました。しばらく経ってからお試しください。"
        );
        notifications.show({
          title: "認証エラー",
          message: "認証中にエラーが発生しました",
          color: "red",
        });
      }
    }
  });

  const handleGoogleSignIn = async () => {
    setError(null); // エラーをリセット

    try {
      const googleResult = await signInWithGoogle();
      if (!googleResult.success) {
        setError(googleResult.message || "Googleログインに失敗しました。");
        notifications.show({
          title: "Googleログインエラー",
          message: googleResult.message || "Googleログインに失敗しました",
          color: "red",
        });
        return;
      }

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

          notifications.show({
            title: "ログイン成功",
            message: "ようこそ！",
            color: "green",
          });

          navigate("/");
        } catch {
          // ログインに失敗した場合（ユーザーが存在しない場合）
          console.log("サインアップを試みます");

          try {
            // サインアップを試みる
            const signupRes = await api.post("/auth/signup", {
              email: email,
              name: name,
            });

            setUser({
              userId: signupRes.data.id,
              nickname: signupRes.data.name,
            });

            notifications.show({
              title: "登録成功",
              message: "アカウントが作成されました！",
              color: "green",
            });

            navigate("/");
          } catch (signupError) {
            console.error("サインアップエラー:", signupError);
            setError(
              "アカウント作成に失敗しました。しばらく経ってからお試しください。"
            );
            notifications.show({
              title: "サインアップエラー",
              message: "アカウント作成に失敗しました",
              color: "red",
            });
          }
        }
      }
    } catch (error) {
      console.error("Google認証エラー:", error);
      setError(
        "Google認証中にエラーが発生しました。しばらく経ってからお試しください。"
      );
      notifications.show({
        title: "Google認証エラー",
        message: "Google認証中にエラーが発生しました",
        color: "red",
      });
    }
  };

  return (
    <_Paper radius="md" p="xl" withBorder {...props}>
      <_TextWrapper>
        <_Logo src="/img/committy_round.svg" alt="Committy" />
      </_TextWrapper>

      {error && <ErrorMessage>{error}</ErrorMessage>}

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

const ErrorMessage = styled.div`
  color: #fa5252;
  background-color: #fff5f5;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 14px;
  text-align: center;
`;
