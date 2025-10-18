"use client";

import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import NavBarInit from "@/components/new/NavBarInit";
import CategoryHeader from "@/components/new/CategoryHeader";

interface Game {
  type: string;
  title: string;
  id: string;
}


// Define el tipo de params como una promesa
const page = ({ params }: { params: Promise<{ categories: string }> }) => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  const [user, setUser] = useState<any>(null);
  const [uid, setUid] = useState("")
  const router = useRouter();
  const redirect = (url: string) => {
    router.push(url);
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUid(currentUser?.uid || "");
      if (!currentUser) {
        redirect("/")
      }
    });



    return () => unsubscribe();
  }, []);

  const [userData, setUserData] = useState<{ año: string; plan: string; grado: string; colegio: string; displayName: string, image: string, email: string, categoria: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setUserData({
            email: docData.email,
            año: docData.año || "",
            grado: docData.grado || "",
            colegio: docData.colegio || "",
            displayName: docData.displayName || "",
            image: docData.image || "",
            plan: docData.plan || "test",
            categoria: docData.categoria || "",
          });
        }
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
      }
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid]);


  const [category, setCategory] = useState<any>(null); // Ajusta el tipo según tu estructura de datos de Firebase
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);
  const [categoryParam, setCategoryParam] = useState<string | null>(null);
  const [name, setName] = useState<string>('');

  // Resuelve la promesa params al montar el componente
  useEffect(() => {
    let unsubscribe: () => void;

    const fetchParams = async () => {
      try {
        const resolvedParams = await params; // Espera la resolución de la promesa
        setCategoryParam(resolvedParams.categories);

        if (resolvedParams.categories) {
          setLoading(true);
          const q = query(
            collection(db, "games"),
            where("type", "==", resolvedParams.categories)
          );

          unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
              const results: Game[] = [];
              querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() } as Game);
              });
              setCategory(results); // Guarda TODOS los resultados en el estado
              setLoading(false);
            },
            (err) => {
              setError(err.message);
              setLoading(false);
            }
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setLoading(false);
      }
    };

    fetchParams();

    return () => {
      if (unsubscribe) unsubscribe(); // Limpia el listener
    };
  }, []); // Array de dependencias vacío, ya que params se resuelve una vez

  if (loading) return <Loading />;
  return (
    <section>
      <NavBarInit ul={true} button={true} user={userData?.displayName || "Cargando..."} img={userData?.image || "https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png"} />
      <main>
        <CategoryHeader title={category.type}/>
        {loading && <p>Cargando...</p>}
        {

          category.length > 0 ? (
            <ul>
              {category.map((game: any) => (
                <li key={game.id}>
                  {game.id} - {game.title} {/* Ajusta según los campos de tu documento */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron juegos para la categoría {categoryParam}</p>
          )}
      </main>
    </section>


  );
};

export default page;