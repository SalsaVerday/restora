"use client";

import { useEffect, useState } from "react";
import { Loader2, VideoOff } from "lucide-react";
import { getSignedVideoUrl } from "@/app/portal/actions";

/** Loads a signed URL on mount and plays the exercise demo video. */
export function VideoPlayer({ videoPath }: { videoPath: string | null }) {
  const [url, setUrl] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "none">(
    videoPath ? "loading" : "none",
  );

  useEffect(() => {
    if (!videoPath) return;
    let active = true;
    getSignedVideoUrl(videoPath).then((signed) => {
      if (!active) return;
      if (signed) {
        setUrl(signed);
        setState("ready");
      } else {
        setState("none");
      }
    });
    return () => {
      active = false;
    };
  }, [videoPath]);

  if (state === "none") {
    return (
      <div className="text-muted bg-sand/60 flex aspect-video items-center justify-center gap-2 rounded-xl text-sm">
        <VideoOff className="size-4" /> No demo video
      </div>
    );
  }
  if (state === "loading") {
    return (
      <div className="text-muted bg-sand/60 flex aspect-video items-center justify-center rounded-xl">
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }
  return (
    <video
      controls
      preload="metadata"
      src={url ?? undefined}
      className="aspect-video w-full rounded-xl bg-black"
    />
  );
}
