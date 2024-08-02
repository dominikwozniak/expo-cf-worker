import { View } from "react-native";
import { useUser } from "@clerk/clerk-expo";

import { Avatar } from "~/shared-components/Avatar";
import { Typography } from "~/shared-components/Typography";

export function UserInfoCard() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <View className="mt-2 flex flex-row items-center gap-4 rounded-2xl bg-gray-light p-4">
      <Avatar src={user?.imageUrl ?? ""} alt={user?.fullName ?? ""} />
      <Typography variant="title" weight="semiBold" color="primary">
        {user?.fullName}
      </Typography>
    </View>
  );
}
