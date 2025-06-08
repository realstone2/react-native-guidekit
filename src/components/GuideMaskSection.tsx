import React from "react";
import { View } from "react-native";
import { MaskGuideType } from "../types";
import { useGuideKitContext } from "../hooks/useGuideKitContext";

const 마스크_딤_패딩 = 8;

/**
 * 가이드 마스크 섹션
 **/
export function GuideMaskSection<T extends string>({
  guideKey,
  maskPadding,
  children,
  style,
  ...props
}: {
  guideKey: T;
  maskPadding?: number;
  children: React.ReactNode;
  style?: View["props"]["style"];
} & Omit<MaskGuideType, "position">) {
  const animationFrameIDRef = React.useRef<number>();
  const { currentGuideInfo, setGuideInfoMap, currentGuideKey } =
    useGuideKitContext();

  const currentGuide = currentGuideInfo;

  const wrapperRef = React.useRef<View>(null);

  const handleGuideMaskPosition = React.useCallback(async () => {
    if (wrapperRef.current != null && "measure" in wrapperRef.current) {
      wrapperRef.current.measure((_ox, _oy, width, height, x, y) => {
        if (width == null || height == null || x == null || y == null) {
          if (animationFrameIDRef.current) {
            cancelAnimationFrame(animationFrameIDRef.current);
          }
          animationFrameIDRef.current = requestAnimationFrame(
            handleGuideMaskPosition
          );
          return;
        }

        setGuideInfoMap((prev) => {
          const newMap = new Map(prev);

          const newPosition = {
            width: width + (maskPadding ?? 마스크_딤_패딩) * 2,
            height: height + (maskPadding ?? 마스크_딤_패딩) * 2,
            x: x - (maskPadding ?? 마스크_딤_패딩),
            y: y - (maskPadding ?? 마스크_딤_패딩),
          };

          const currentGuideInfo = prev.get(guideKey);

          if (!currentGuideInfo) {
            newMap.set(guideKey, {
              type: "mask",
              onPress: props.onPress,
              position: newPosition,
              tooltip: props.tooltip,
            });
            return newMap;
          }

          if (
            currentGuideInfo?.type === "mask" &&
            currentGuideInfo.position &&
            currentGuideInfo.position.x === newPosition.x &&
            currentGuideInfo.position.y === newPosition.y &&
            currentGuideInfo.position.width === newPosition.width &&
            currentGuideInfo.position.height === newPosition.height
          ) {
            return prev;
          }

          if (currentGuideInfo?.type === "mask") {
            newMap.set(guideKey, {
              ...(currentGuideInfo ?? {}),
              position: newPosition,
            });
            return newMap;
          }

          return prev;
        });
      });
    }
    if (animationFrameIDRef.current) {
      cancelAnimationFrame(animationFrameIDRef.current);
    }
    animationFrameIDRef.current = requestAnimationFrame(
      handleGuideMaskPosition
    );
  }, [guideKey, maskPadding, props.tooltip?.position]);

  React.useEffect(() => {
    if (currentGuideKey !== guideKey) {
      if (animationFrameIDRef.current) {
        cancelAnimationFrame(animationFrameIDRef.current);
      }
      return;
    }

    void handleGuideMaskPosition();

    return () => {
      if (animationFrameIDRef.current) {
        cancelAnimationFrame(animationFrameIDRef.current);
      }
    };
  }, [currentGuideKey, guideKey, handleGuideMaskPosition]);

  // XXX: https://github.com/facebook/react-native/issues/29712 android measure bug fix
  return (
    <View style={style} ref={wrapperRef} collapsable={false}>
      {children}
    </View>
  );
}
