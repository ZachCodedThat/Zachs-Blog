import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wcsuwyjfxnvkdjvdjcxz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDAyNjQyNywiZXhwIjoxOTQ1NjAyNDI3fQ.5Phixi0164uGy0U0vj9uPjeXln5B7OAEmBl4eZDRsek";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
