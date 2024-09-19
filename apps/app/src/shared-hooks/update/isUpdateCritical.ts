/* eslint-disable */
// @ts-nocheck

import type {
  CurrentlyRunningInfo,
  UpdateCheckResult,
  UpdateInfo,
} from "expo-updates";

export function isUpdateCritical(
  updateInfo: UpdateInfo | UpdateCheckResult,
  currentlyRunning: CurrentlyRunningInfo,
) {
  const criticalIndexCurrent =
    currentlyRunning.manifest?.extra?.expoClient?.extra?.criticalIndex ?? 0;
  const criticalIndexUpdate =
    updateInfo.manifest?.extra?.expoClient?.extra?.criticalIndex ?? 0;
  return criticalIndexUpdate > criticalIndexCurrent;
}
