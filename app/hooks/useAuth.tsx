import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/firebase"; // Ajuste o caminho conforme necessário

const useAuth = (redirectPath = "/login") => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push(redirectPath);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Limpa o listener quando o componente é desmontado
  }, [router, redirectPath]);

  return { loading, isAuthenticated };
};

export default useAuth;
