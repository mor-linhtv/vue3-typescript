import { defineStore } from "pinia";
import { nanoid } from "nanoid";

export type Notification = {
  id: string;
  type: "warning" | "success" | "error";
  title: string;
  message?: string;
  class?: string;
};

export const useNotificationStore = defineStore({
  id: "notification",
  state: () => ({
    notifications: [] as Notification[],
  }),
  actions: {
    add(notification: Omit<Notification, "id">) {
      this.notifications = [
        ...this.notifications,
        { id: nanoid(), ...notification },
      ];
    },
    dismiss(id: string) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== id
      );
    },
  },
});
