'use server'

import { createServerSupabaseClient, createServiceRoleSupabaseClient } from '@/lib/supabase/server'

export interface UploadAchievementPayload {
  title: string
  description: string
  category: string
  organizer: string
  achievementDate: string
  proofLink?: string
  file?: File | null
}

export interface UploadAchievementResult {
  success: boolean
  message: string
  achievementId?: string
}

function validatePayload(payload: UploadAchievementPayload): string[] {
  const errors: string[] = []

  if (!payload.title?.trim()) {
    errors.push('Please enter an achievement title.')
  }

  if (!payload.description?.trim() || payload.description.trim().length < 20) {
    errors.push('Please provide a description with at least 20 characters.')
  }

  if (!payload.category?.trim()) {
    errors.push('Please select a category.')
  }

  if (!payload.organizer?.trim()) {
    errors.push('Please enter the organizer name.')
  }

  if (!payload.achievementDate?.trim()) {
    errors.push('Please select an achievement date.')
  }

  if (!payload.file) {
    errors.push('Please select a certificate file.')
  } else {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg', 'image/webp']
    const fileName = payload.file.name.toLowerCase()
    const isAllowedType = allowedTypes.includes(payload.file.type) || fileName.endsWith('.pdf') || fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.webp')

    if (!isAllowedType) {
      errors.push('Please upload a PDF, PNG, JPG, or WEBP file.')
    }

    if (payload.file.size > 10 * 1024 * 1024) {
      errors.push('File size must be 10MB or less.')
    }
  }

  return errors
}

export async function uploadAchievement(
  payload: UploadAchievementPayload
): Promise<UploadAchievementResult> {
  const errors = validatePayload(payload);

  if (errors.length) {
    return {
      success: false,
      message: errors[0],
    };
  }

  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message: "You must be signed in to upload an achievement.",
    };
  }

  // The auth user is enough for the upload flow; the profile row is optional and
  // can be missing during first sign-in or when a trigger hasn't populated it yet.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    return {
      success: false,
      message: `Unable to verify your profile: ${profileError.message}`,
    };
  }

  if (!profile) {
    console.warn("Profile row not found for authenticated user", user.id);
  }

  let supabaseAdmin

  try {
    supabaseAdmin = createServiceRoleSupabaseClient()
  } catch (serviceRoleError) {
    return {
      success: false,
      message:
        serviceRoleError instanceof Error
          ? serviceRoleError.message
          : 'Certificate upload is not configured yet.',
    }
  }

  // Upload certificate
  const file = payload.file!;

  const storagePath = `${user.id}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("certificates")
    .upload(storagePath, file, {
      upsert: false,
      contentType: file.type || 'application/octet-stream',
    });

  if (uploadError) {
    return {
      success: false,
      message: `Certificate upload failed: ${uploadError.message}`,
    };
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from("certificates").getPublicUrl(storagePath);

  // Insert achievement
  const { data, error: insertError } = await supabaseAdmin
    .from("achievements")
    .insert({
      student_id: user.id,
      title: payload.title.trim(),
      description: payload.description.trim(),
      category: payload.category.trim(),
      organizer: payload.organizer.trim(),
      achievement_date: payload.achievementDate,
      certificate_url: publicUrl,
      proof_url: payload.proofLink?.trim() || null,
      status: "Pending",
    })
    .select()
    .single();

  if (insertError) {
    // Cleanup uploaded file
    await supabaseAdmin.storage.from("certificates").remove([storagePath]);

    return {
      success: false,
      message: `Unable to save the achievement: ${insertError.message}`,
    };
  }

  return {
    success: true,
    message: "Achievement uploaded successfully.",
    achievementId: data.id,
  };
}