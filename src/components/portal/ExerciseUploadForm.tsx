"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { createExercise } from "@/app/portal/coach/actions";
import { Button } from "@/components/ui/Button";

const input =
  "text-ink focus:border-brand-500 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none";

export function ExerciseUploadForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "working">("idle");
  const [msg, setMsg] = useState<{ error?: string; success?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    const file = fd.get("video") as File | null;

    setStatus("working");
    try {
      let videoPath = "";
      if (file && file.size > 0) {
        const supabase = createClient();
        const ext = file.name.split(".").pop() || "mp4";
        const path = `exercises/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage
          .from("exercise-videos")
          .upload(path, file, { contentType: file.type });
        if (error) throw new Error(`Upload failed: ${error.message}`);
        videoPath = path;
      }

      const payload = new FormData();
      for (const key of [
        "name",
        "category",
        "description",
        "defaultSets",
        "defaultReps",
      ]) {
        payload.set(key, String(fd.get(key) ?? ""));
      }
      payload.set("videoPath", videoPath);

      const result = await createExercise({}, payload);
      if (result.error) throw new Error(result.error);

      setMsg({ success: result.success });
      form.reset();
      router.refresh();
    } catch (err) {
      setMsg({
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          placeholder="Exercise name"
          required
          className={input}
        />
        <select name="category" className={input} defaultValue="strength">
          <option value="strength">Strength &amp; conditioning</option>
          <option value="pt">Physical therapy</option>
        </select>
      </div>
      <textarea
        name="description"
        placeholder="Description / cues (optional)"
        rows={2}
        className={input}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="defaultSets"
          placeholder="Default sets (e.g. 3)"
          className={input}
        />
        <input
          name="defaultReps"
          placeholder="Default reps (e.g. 10)"
          className={input}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="video" className="text-muted text-sm">
          Demo video (MP4)
        </label>
        <input
          id="video"
          name="video"
          type="file"
          accept="video/*"
          className="text-muted file:bg-brand-50 file:text-brand-700 text-sm file:mr-3 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium"
        />
      </div>

      {msg.error ? (
        <p className="text-accent-600 text-sm" role="alert">
          {msg.error}
        </p>
      ) : null}
      {msg.success ? (
        <p className="text-brand-600 text-sm">{msg.success}</p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "working"}
        className="w-full sm:w-auto"
      >
        {status === "working" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Saving…
          </>
        ) : (
          <>
            <Plus className="size-4" /> Add exercise
          </>
        )}
      </Button>
    </form>
  );
}
