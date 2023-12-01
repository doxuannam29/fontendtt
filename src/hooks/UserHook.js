import { useMutation } from "@tanstack/react-query"

export const UserHook = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback
    })
    return mutation
}