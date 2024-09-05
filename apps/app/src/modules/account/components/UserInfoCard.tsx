import { TouchableOpacity } from "react-native";
import { useUser } from "@clerk/clerk-expo";

import { useUpdateAvatar } from "~/modules/account/hooks/personal-details/useUpdateAvatar";
import { Avatar } from "~/shared-components/Avatar";
import { Typography } from "~/shared-components/Typography";

export function UserInfoCard() {
  const { user } = useUser();
  const { handleChangeImage } = useUpdateAvatar();

  if (!user) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleChangeImage}
      className="mt-2 flex flex-row items-center gap-4 rounded-2xl bg-gray-light p-4"
    >
      <Avatar
        src={user.hasImage ? user.imageUrl : undefined}
        alt={user.fullName ?? ""}
      />
      <Typography variant="title" weight="semiBold" color="primary">
        {user.fullName}
      </Typography>
    </TouchableOpacity>
  );
}
