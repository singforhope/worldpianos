import { createClient } from '@supabase/supabase-js';

export async function POST({ request }) {
  try {
    const { userId, displayName } = await request.json();
    
    // Validate input parameters
    if (!userId) {
      console.error('API: Missing required parameter: userId');
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required parameter: userId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Create Supabase client with service role key
    const supabaseAdmin = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: { persistSession: false },
        global: {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        },
      }
    );
    
    // Log the attempt
    console.log('API: Creating profile with service role for user:', userId);
    
    // First, verify the user exists in auth.users
    console.log('API: Verifying user exists in auth system...');
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (authError || !authUser?.user) {
      console.error('API: User does not exist in auth.users:', userId, authError);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'User does not exist in auth system',
          error: authError || 'User not found'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('API: User verified in auth system:', userId);
    
    // Check if profile already exists to avoid duplicate errors
    const { data: existingProfile, error: profileCheckError } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('id', userId)
      .single();
      
    if (existingProfile) {
      console.log('API: Profile already exists for user:', userId);
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Profile already exists',
          data: [existingProfile]
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Create the profile
    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .insert({
        id: userId,
        display_name: displayName || authUser.user.email?.split('@')[0] || 'User',
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();
    
    if (error) {
      console.error('API: Error creating profile with service role:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      
      // Handle foreign key constraint error specifically
      if (error.code === '23503' || error.message?.includes('foreign key constraint')) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Foreign key constraint violation. User may not exist in auth.users table.',
            error: error
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ success: false, message: error.message, error: error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('API: Profile created successfully with service role');
    return new Response(
      JSON.stringify({ success: true, data: data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('API: Server exception:', err);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Server error',
        error: err.toString(),
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}