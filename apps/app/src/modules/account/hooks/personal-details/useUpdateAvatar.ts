import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

export function useUpdateAvatar() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { showAlert } = useAlert();
  const setLoading = useGlobalStore((state) => state.setLoading);

  const handleChangeImage = async () => {
    try {
      const pickedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.75,
        base64: true,
      });

      if (user && !pickedImage.canceled && pickedImage.assets[0]?.base64) {
        setLoading(true);

        const base64 = `data:image/png;base64,${pickedImage.assets[0].base64}`;
        await user.setProfileImage({
          file: base64,
        });
      }
    } catch {
      showAlert({
        title: t("common.error.baseError.title"),
        message: t("common.error.baseError.message"),
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleChangeImage };
}
