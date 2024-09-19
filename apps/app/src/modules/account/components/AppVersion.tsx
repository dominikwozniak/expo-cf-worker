import * as Application from "expo-application";

import { Typography } from "~/shared-components/Typography";

export function AppVersion() {
  const appVersion = Application.nativeApplicationVersion;
  const buildVersion = Application.nativeBuildVersion;

  return (
    <Typography className="py-4 text-center">
      Version {appVersion} ({buildVersion})
    </Typography>
  );
}
