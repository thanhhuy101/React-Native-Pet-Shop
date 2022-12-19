import { useQuery } from 'react-query'
import { getUserById } from '../../../redux/actions/authAction'

export const USER_KEY = 'user'

export const useUser = (userId, options = {}) => {
    return useQuery([USER_KEY, userId], () => getUserById(userId), options)
}