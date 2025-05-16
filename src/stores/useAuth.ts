import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const user = ref<any>(null)

export const useAuth = () => {
  const setUser = (u: any) => {
    user.value = u
  }

  const fetchUser = async () => {
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user ?? null
  }

  return {
    user,
    setUser,
    fetchUser,
  }
}
