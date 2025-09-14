import type { SupabaseClient } from "@supabase/supabase-js";

export async function uploadPublic(
  client: SupabaseClient,
  bucket: string,
  filePath: string,
  file: File | Blob,
  upsert = true
) {
  const { data, error } = await client.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert,
  });
  if (error) throw error;
  return data;
}

export function getPublicUrl(client: SupabaseClient, bucket: string, filePath: string) {
  const { data } = client.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

