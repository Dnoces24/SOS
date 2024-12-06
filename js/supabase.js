// Initialize Supabase client
const supabaseUrl = 'https://dlyettajghslritexgxw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRseWV0dGFqZ2hzbHJpdGV4Z3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MDcxMjksImV4cCI6MjA0OTA4MzEyOX0.2PHknPKjSG5rwhDo0Cv-t1sOm7mGTAZHsaaLG2cnwoY'

// Create Supabase client
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey)

// Authentication functions
async function signUp(email, password, fullName, username) {
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    username: username
                }
            }
        });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error signing up:', error.message);
        return { data: null, error: error.message };
    }
}

async function signIn(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error signing in:', error.message);
        return { data: null, error: error.message };
    }
}

async function signOut() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error signing out:', error.message);
        return { error: error.message };
    }
}

// Session management
async function getCurrentSession() {
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) throw error;
        return { session, error: null };
    } catch (error) {
        console.error('Error getting session:', error.message);
        return { session: null, error: error.message };
    }
}

// Export functions
window.auth = {
    signUp,
    signIn,
    signOut,
    getCurrentSession
};
