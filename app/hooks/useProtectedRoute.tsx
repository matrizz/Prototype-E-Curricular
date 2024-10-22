//@ts-nocheck
'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase';

type UserRole = 'user' | 'admin'

const useProtectedRoute = (requiredRole = ['user', 'admin'], redirectPath = '/login') => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [canAccess, setCanAccess] = useState(false)
    const [Role, setRole] = useState<UserRole>()
    const [UID, setUID] = useState()
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const userRole = userDoc.data().role
                if (userRole == requiredRole[0] || requiredRole[1]) {
                    setCanAccess(true)
                    setIsLoading(false)
                    setRole(userRole)
                }
                else if (userRole != requiredRole[0] || requiredRole[1]) {
                    return router.push(redirectPath);
                }
            } else {
                setIsLoading(false)
                return router.push(redirectPath);
            }
        });
        
        setIsLoading(false);
        
        return () => unsubscribe();
    }, [auth, router, redirectPath, requiredRole]);
    
    return { isLoading, canAccess, role: Role, UID: auth.currentUser?.uid };
}

export default useProtectedRoute