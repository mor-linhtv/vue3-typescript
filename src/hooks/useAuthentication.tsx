import type { AuthUser } from "@/features/auth";
import { getCookie, removeToken } from "@/utils/storage";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

interface State {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

export function useAuthentication() {
  const router = useRouter();
  const state = reactive<State>({
    isAuthenticated: false,
    user: null,
  });

  function checkAuthentication() {
    state.isAuthenticated = !!getCookie("jwt");
  }
  checkAuthentication();

  function logout() {
    removeToken();
    state.isAuthenticated = false;
    state.user = null;
    router.push("/login");
  }

  return {
    ...toRefs(state),
    logout,
  };
}
