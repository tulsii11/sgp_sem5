import { supabase } from '../lib/supabaseClient.js';

/**
 * Authentication and Validation Service
 * Source of truth for Supabase Auth, credential verification, and role matching.
 */

// Email regex pattern for RFC-compliant basic email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validate email format client-side before submission
 * @param {string} email 
 * @returns {{ isValid: boolean, message: string }}
 */
export const validateEmail = (email) => {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return {
      isValid: false,
      message: 'Please enter your email address.'
    };
  }

  if (!trimmed.includes('@')) {
    return {
      isValid: false,
      message: "Please include an '@' in the email address."
    };
  }

  const parts = trimmed.split('@');
  if (!parts[1] || !parts[1].includes('.')) {
    return {
      isValid: false,
      message: 'Please enter a valid email address with a domain (e.g. name@example.com).'
    };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address (e.g. name@example.com).'
    };
  }

  return { isValid: true, message: '' };
};

/**
 * Validate password strength rules client-side
 * Rules:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character (!@#$%^&*()_+-=[]{}|;:,.<>?/~`')
 * 
 * @param {string} password 
 * @returns {{ isValid: boolean, message: string }}
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      message: 'Please enter your password.'
    };
  }

  const missing = [];
  if (password.length < 8) {
    missing.push('at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    missing.push('at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    missing.push('at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    missing.push('at least one number');
  }
  if (!/[!@#$%^&*()_+\-=[\]{}|;:,.<>?/~`'\\]/.test(password)) {
    missing.push('at least one special character');
  }

  if (missing.length === 1) {
    // Single requirement missing
    if (password.length < 8) {
      return { isValid: false, message: 'Password must contain at least 8 characters.' };
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number.' };
    }
    if (!/[!@#$%^&*()_+\-=[\]{}|;:,.<>?/~`'\\]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one special character.' };
    }
  }

  if (missing.length > 1) {
    // Multiple requirements missing: present them together
    return {
      isValid: false,
      message: `Password must contain ${missing.join(', ')}.`
    };
  }

  return { isValid: true, message: '' };
};

/**
 * Register a new user with Supabase Auth and initialize public.profiles & role profile.
 * 
 * @param {object} params
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} params.department
 * @param {string} params.password
 * @param {string} params.role 'student' | 'company'
 * @returns {Promise<{ success: boolean, emailConfirmationRequired?: boolean, user?: object, profile?: object, error?: string, message?: string }>}
 */
export const registerWithCredentials = async ({ name, email, department, password, role }) => {
  // 1. Validate role
  if (role !== 'student' && role !== 'company') {
    return {
      success: false,
      error: 'Invalid account type selected. Only Student and Company registrations are permitted.'
    };
  }

  // 2. Validate required inputs
  const trimmedName = (name || '').trim();
  if (!trimmedName) {
    return {
      success: false,
      error: role === 'company' ? 'Please enter your company/recruiter name.' : 'Please enter your full name.'
    };
  }

  const emailVal = validateEmail(email);
  if (!emailVal.isValid) {
    return { success: false, error: emailVal.message };
  }

  const trimmedDept = (department || '').trim();
  if (!trimmedDept) {
    return {
      success: false,
      error: role === 'company' ? 'Please enter your industry/sector.' : 'Please enter your department/branch.'
    };
  }

  const passVal = validatePassword(password);
  if (!passVal.isValid) {
    return { success: false, error: passVal.message };
  }

  try {
    // 3. Supabase Auth sign up
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          role,
          full_name: trimmedName,
          department: trimmedDept
        }
      }
    });

    if (authError) {
      const errMsg = authError.message?.toLowerCase() || '';

      // Existing user / duplicate email
      if (
        authError.status === 400 && (
          errMsg.includes('already registered') ||
          errMsg.includes('already exists') ||
          authError.code === 'user_already_exists'
        )
      ) {
        return {
          success: false,
          error: 'This email is already registered. Please sign in instead.'
        };
      }

      // Email rate limit
      if (authError.status === 429 || authError.code === 'over_email_send_rate_limit' || errMsg.includes('rate limit')) {
        return {
          success: false,
          error: 'Email rate limit exceeded. Please wait a few minutes before trying again.'
        };
      }

      // Invalid email address
      if (authError.code === 'email_address_invalid' || (errMsg.includes('email address') && errMsg.includes('invalid'))) {
        return {
          success: false,
          error: 'Please enter a valid email address.'
        };
      }

      // Network / connection errors
      if (errMsg.includes('failed to fetch') || errMsg.includes('network') || authError.status === 0) {
        return {
          success: false,
          error: 'Unable to create your account right now. Please check your connection and try again.'
        };
      }

      return {
        success: false,
        error: authError.message || 'Unable to create your account right now. Please check your connection and try again.'
      };
    }

    const authUser = data?.user;
    if (!authUser) {
      return {
        success: false,
        error: 'Unable to create your account right now. Please try again.'
      };
    }

    // 4. Check if session was returned (Email Confirmation Disabled)
    if (data.session) {
      // Active session present: create profile rows immediately
      const { data: newProfile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: authUser.id,
          role: role,
          full_name: trimmedName,
          email: email.trim()
        })
        .select()
        .single();

      if (profileError || !newProfile) {
        console.error('Error creating profile after signUp:', profileError);
        await supabase.auth.signOut();
        return {
          success: false,
          partialRegistration: true,
          error: 'Your authentication account was created, but we could not complete your profile setup. Please try again or contact the administrator.'
        };
      }

      // Create role-specific profile
      let roleError = null;
      if (role === 'student') {
        const { error: spErr } = await supabase
          .from('student_profiles')
          .insert({
            profile_id: newProfile.id,
            branch: trimmedDept
          });
        roleError = spErr;
      } else if (role === 'company') {
        const { error: cpErr } = await supabase
          .from('company_profiles')
          .insert({
            profile_id: newProfile.id,
            company_name: trimmedName,
            industry: trimmedDept
          });
        roleError = cpErr;
      }

      if (roleError) {
        console.error('Error creating role-specific profile after signUp:', roleError);
        try {
          await supabase.from('profiles').delete().eq('id', newProfile.id);
          await supabase.auth.signOut();
        } catch (cleanupErr) {
          console.error('Cleanup error:', cleanupErr);
        }
        return {
          success: false,
          partialRegistration: true,
          error: 'Your authentication account was created, but we could not complete your profile setup. Please try again or contact the administrator.'
        };
      }

      return {
        success: true,
        emailConfirmationRequired: false,
        user: authUser,
        profile: newProfile
      };
    }

    // 5. Session is NULL -> Email confirmation is ENABLED in Supabase Auth
    return {
      success: true,
      emailConfirmationRequired: true,
      message: 'Account created successfully. Please verify your email before signing in.'
    };

  } catch (err) {
    console.error('Unexpected error during registration:', err);
    return {
      success: false,
      error: 'Unable to create your account right now. Please check your connection and try again.'
    };
  }
};

/**
 * Authenticate with Supabase Auth and verify application role against `profiles`
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {string} selectedRole 'student' | 'company'
 * @returns {Promise<{ success: boolean, user?: object, profile?: object, error?: string }>}
 */
export const loginWithCredentials = async (email, password, selectedRole) => {
  // 1. Client-side Email Format Validation
  const emailVal = validateEmail(email);
  if (!emailVal.isValid) {
    return { success: false, error: emailVal.message };
  }

  // 2. Client-side Password Strength Validation
  const passVal = validatePassword(password);
  if (!passVal.isValid) {
    return { success: false, error: passVal.message };
  }

  try {
    // 3. Supabase Auth sign in
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    console.warn('[Auth Diagnostic]', {
      errorMessage: authError?.message || null,
      errorCode: authError?.code || null,
      errorStatus: authError?.status || null,
      userExists: !!data?.user,
      sessionExists: !!data?.session
    });

    if (authError) {
      if (
        authError.code === 'email_not_confirmed' ||
        authError.message?.toLowerCase().includes('email not confirmed')
      ) {
        return {
          success: false,
          error: 'Your email address has not been verified yet. Please check your inbox and verify your email before signing in.'
        };
      }

      // Check for network errors
      if (
        authError.message?.toLowerCase().includes('failed to fetch') ||
        authError.message?.toLowerCase().includes('network') ||
        authError.status === 0
      ) {
        return {
          success: false,
          error: 'Unable to connect to the server. Please check your internet connection and try again.'
        };
      }

      // Supabase rejects credentials (invalid_credentials or 400)
      return {
        success: false,
        error: 'The email or password is incorrect. Please check your credentials and try again.'
      };
    }

    const authUser = data?.user;
    if (!authUser) {
      return {
        success: false,
        error: 'The email or password is incorrect. Please check your credentials and try again.'
      };
    }

    // 4. Retrieve Profile from public.profiles table
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', authUser.id)
      .maybeSingle();

    // If profile row doesn't exist yet, check if user metadata was stored during signup
    // (This occurs when Email Confirmation is enabled, meaning session was created only after login)
    if (!profile && authUser.user_metadata?.role) {
      const metaRole = authUser.user_metadata.role;
      const metaName = authUser.user_metadata.full_name || authUser.email;
      const metaDept = authUser.user_metadata.department || '';

      const { data: newProfile, error: createPErr } = await supabase
        .from('profiles')
        .insert({
          user_id: authUser.id,
          role: metaRole,
          full_name: metaName,
          email: authUser.email
        })
        .select()
        .single();

      if (!createPErr && newProfile) {
        if (metaRole === 'student') {
          await supabase.from('student_profiles').insert({
            profile_id: newProfile.id,
            branch: metaDept
          });
        } else if (metaRole === 'company') {
          await supabase.from('company_profiles').insert({
            profile_id: newProfile.id,
            company_name: metaName,
            industry: metaDept
          });
        }
        profile = newProfile;
      }
    }

    if (profileError || !profile) {
      // Authentication succeeded but profile could not be loaded -> immediately clean up session
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'We could not load your account profile. Please try again or contact the administrator.'
      };
    }

    // 5. Role Validation: Check actual database profile.role against selectedRole
    const actualRole = profile.role;

    if (actualRole === 'admin') {
      // User is an administrator trying to use public Student or Company selector
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'This account has administrator access. Please use the appropriate administrator login.'
      };
    }

    if (selectedRole === 'student' && actualRole === 'company') {
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'This account is registered as a Company account. Please select Company to continue.'
      };
    }

    if (selectedRole === 'company' && actualRole === 'student') {
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'This account is registered as a Student account. Please select Student to continue.'
      };
    }

    if (actualRole !== selectedRole) {
      await supabase.auth.signOut();
      return {
        success: false,
        error: `This account is not authorized as a ${selectedRole === 'company' ? 'Company' : 'Student'} account.`
      };
    }

    // 6. Return successful authentication payload
    return {
      success: true,
      user: authUser,
      profile: profile
    };

  } catch (err) {
    console.error('Unexpected error during login:', err);
    // Cleanup if partially logged in
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore cleanup error
    }
    return {
      success: false,
      error: 'Unable to connect to the server. Please check your internet connection and try again.'
    };
  }
};

/**
 * Sign out the current user session from Supabase Auth and clear local user cache
 */
export const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Error signing out:', err);
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  }
};

/**
 * Get active session and authenticated user profile
 * @returns {Promise<{ session: object | null, profile: object | null }>}
 */
export const getCurrentSessionAndProfile = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return { session: null, profile: null };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();

    return { session, profile: profile || null };
  } catch (err) {
    console.error('Error checking active session:', err);
    return { session: null, profile: null };
  }
};
