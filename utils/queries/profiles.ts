import 'server-only';
import { createClient } from '../supabase/server';
import { getAdmin } from './users';

export async function getDashboardProfiles() {
  const supabase = createClient();

  const admin = await getAdmin();

  if (!admin) {
    return [];
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')


  if (error) {
    return [];
  }

  return data;

}
