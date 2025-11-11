import { getPaysteById } from "@/service/payste.service";
import { GET_PAYSTE } from "@/utils/keys";
import { useQuery } from "@tanstack/react-query";

export function usePayste(paysteId: string){
  const { data: payste, isPending: pending, isError, error } = useQuery({
    queryKey: [GET_PAYSTE, paysteId],
    queryFn: () => getPaysteById(paysteId)
  }) 

  return {
    payste, pending, isError, error
  }
}