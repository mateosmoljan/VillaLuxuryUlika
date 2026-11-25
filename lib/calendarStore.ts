import { promises as fs } from "fs";
import path from "path";
import { head, put } from "@vercel/blob";
import { clearRange, patchRange, type CalendarPatches, type DayPatch } from "@/lib/calendarData";

const BLOB_PATH = "ulika-calendar.json";
const PREVIEW_FILE = path.join("/tmp", "ulika-admin-calendar.json");

export type StoreState = {
  source: "builtin" | "blob" | "preview-file";
  writable: boolean;
  patches: CalendarPatches;
  notice: string;
};

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || "";
}

function previewFileAllowed() {
  return process.env.VERCEL_ENV !== "production";
}

export async function loadStore(): Promise<StoreState> {
  if (blobToken()) {
    try {
      const meta = await head(BLOB_PATH, { token: blobToken() });
      const response = await fetch(meta.url, {
        headers: { Authorization: `Bearer ${blobToken()}` },
        cache: "no-store",
      });
      if (!response.ok) throw new Error(String(response.status));
      const parsed = (await response.json()) as { patches?: CalendarPatches };
      return {
        source: "blob",
        writable: true,
        patches: parsed.patches || {},
        notice: "",
      };
    } catch {
      return {
        source: "blob",
        writable: true,
        patches: {},
        notice: "Blob store is connected. No overrides saved yet, so the live prices are the built-in ones.",
      };
    }
  }
  if (!previewFileAllowed()) {
    return {
      source: "builtin",
      writable: false,
      patches: {},
      notice: "Calendar storage is not configured. Set BLOB_READ_WRITE_TOKEN. The public site keeps the built-in prices.",
    };
  }
  try {
    const raw = await fs.readFile(PREVIEW_FILE, "utf8");
    const parsed = JSON.parse(raw) as { patches?: CalendarPatches };
    return {
      source: "preview-file",
      writable: true,
      patches: parsed.patches || {},
      notice: "Preview-only file store on this machine. Production ignores it until BLOB_READ_WRITE_TOKEN is set.",
    };
  } catch {
    return {
      source: "preview-file",
      writable: true,
      patches: {},
      notice: "Preview-only file store on this machine. Production ignores it until BLOB_READ_WRITE_TOKEN is set.",
    };
  }
}

async function writePatches(patches: CalendarPatches) {
  const body = JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), patches });
  if (blobToken()) {
    await put(BLOB_PATH, body, {
      access: "private",
      token: blobToken(),
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    return;
  }
  if (!previewFileAllowed()) {
    throw new Error("Calendar storage is not configured.");
  }
  await fs.writeFile(PREVIEW_FILE, body, "utf8");
}

export async function updateRange(from: string, to: string, patch: DayPatch) {
  const current = await loadStore();
  if (!current.writable) throw new Error(current.notice);
  const patches = patchRange(current.patches, from, to, patch);
  await writePatches(patches);
  return patches;
}

export async function resetRange(from: string, to: string) {
  const current = await loadStore();
  if (!current.writable) throw new Error(current.notice);
  const patches = clearRange(current.patches, from, to);
  await writePatches(patches);
  return patches;
}
