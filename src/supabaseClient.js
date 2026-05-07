import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fvhmkjyxoyloqdnzawkb.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2aG1ranl4b3lsb3Fkbnphd2tiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNTI1NzIsImV4cCI6MjA5MzcyODU3Mn0._POTYi697yAXllUztztOSZ5abx9Cj8TtTNyz4MMCq04";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);