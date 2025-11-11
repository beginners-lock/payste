import { getUserPlan } from '@/service/user-auth.service'
import { USER_PLAN } from '@/utils/keys'
import { useQuery } from '@tanstack/react-query'

export function useUserPlan(userId: string | undefined){
  const { data: plan, isPending: pending } = useQuery({
    queryKey: [USER_PLAN, userId],
    queryFn: () => getUserPlan(userId!),
    enabled: !!userId
  })

  return { plan, pending }
}