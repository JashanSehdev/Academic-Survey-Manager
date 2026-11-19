"use client";

import { getErrorMessage } from "@/api/api";
import { RoleEnum } from "@/enum/user.enum";
import { loginUserAsync } from "@/features/auth/handle-auth/auth.action";
import { useAppDispatch } from "@/features/store";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export default function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function login(identifier: string, password: string) {
    try {
      setLoading(true);
      const result = await dispatch(
        loginUserAsync({ identifier, password }),
      ).unwrap();
      enqueueSnackbar("Login Successful", { variant: "success" });
      if (result.role === RoleEnum.ADMIN) {
        router.push("/admin/create-survey");
      } else {
        router.push("/"); 
      }
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  return { login, loading };
}
