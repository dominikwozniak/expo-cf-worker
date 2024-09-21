import type { ViewProps } from "react-native";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";

import { Typography } from "~/shared-components/Typography";
import { cn } from "~/utils/classnames";

interface AvatarProps extends ViewProps {
  src?: string;
  alt?: string;
}

export function Avatar({ src, alt, className, ...props }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const fallbackText = useMemo(() => {
    if (!alt) return "";

    const words = alt.trim().split(" ").filter(Boolean);

    if (words.length === 0) return "";
    if (words.length === 1) return words[0]?.charAt(0).toUpperCase();

    const firstInitial = words[0]?.charAt(0);
    const secondInitial = words[1]?.charAt(0) ?? "";

    return (firstInitial + secondInitial).toUpperCase();
  }, [alt]);

  return (
    <View
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-400",
        className,
      )}
      {...props}
    >
      {imageError ? (
        <View
          role="img"
          aria-label={alt}
          className="bg-muted flex h-full w-full items-center justify-center rounded-full"
        >
          <Typography>{fallbackText}</Typography>
        </View>
      ) : (
        <Image
          style={{
            flex: 1,
          }}
          source={src}
          alt={alt}
          contentFit="cover"
          transition={100}
          placeholder={fallbackText}
          onError={() => setImageError(true)}
          accessibilityLabel={alt}
        />
      )}
    </View>
  );
}
