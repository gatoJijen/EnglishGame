import { auth, db } from '@/firebase/config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth'; // Corrección en la importación
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AuthSec = () => {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const saveUserToFirestore = async (
    uid: string,
    displayName: string,
    photoURL: string,
    categoria: string,
    plan: string,
    año: number,
    grado: string,
    image: string,
    email: string,
    resources: any[],
    chats: any[],
    newChats: any[],
    solicitudes: any[],
    newNews: any[],
    news: any[],
    friends: any[]
  ) => {
    try {
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        console.log('El usuario ya existe, no lo sobrescribo.');
        return;
      }

      await setDoc(userRef, {
        displayName,
        photoURL,
        uid,
        email,
        categoria,
        plan,
        año,
        grado,
        image,
        resources,
        chats,
        newChats,
        solicitudes,
        newNews,
        news,
        friends,
      }, { merge: true });

      console.log('Usuario guardado en Firestore');
    } catch (err) {
      console.error('Error al guardar el usuario en Firestore:', err);
    }
  };

  const handleRegisterWithEmail = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const defaultDisplayName = email.split('@')[0]
        .replace(/\d/g, '') // Elimina todos los números
        .replace(/\./g, ' ') // Reemplaza puntos por espacios
        .replace(/\s+/g, ' ') // Opcional: Normaliza múltiples espacios a uno solo
        .trim(); // Opcional: Elimina espacios al inicio y fina
      const defaultPhotoURL = 'https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png';
      const photoURL = user.photoURL || defaultPhotoURL;
      const defaultCategory = 'user';
      const defaultGrade = 'Bachillerato';
      const defaultPlan = 'test';
      const currentDate = new Date();
      const defaultYear: number = currentDate.getFullYear();
      const defaultResources: any[] = [];
      const defaultChats: any[] = [];
      const defaultNewChats: any[] = [];
      const defaultSolicitudes: any[] = [];
      const defaultNewNews: any[] = [];
      const defaultNews: any[] = [];
      const defaultFriends: any[] = [];

      await updateProfile(user, {
        displayName: defaultDisplayName,
        photoURL: defaultPhotoURL,
      });

      await saveUserToFirestore(
        user.uid,
        defaultDisplayName,
        defaultPhotoURL,
        defaultCategory,
        defaultPlan,
        defaultYear,
        defaultGrade,
        photoURL,
        email,
        defaultResources,
        defaultChats,
        defaultNewChats,
        defaultSolicitudes,
        defaultNewNews,
        defaultNews,
        defaultFriends
      );

      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          router.push('/dashboard');
        } catch (loginErr: any) {
          setError(loginErr.message || 'Error al iniciar sesión con el usuario existente');
        }
      } else {
        setError(err.message || 'Error al registrar el usuario');
      }
    } finally {
      setLoading(false);
    }
  };

  const googleRegister = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user) throw new Error('No se pudo obtener el usuario.');
      const displayName = user.displayName || email.split('@')[0]
        .replace(/\d/g, '') // Elimina todos los números
        .replace(/\./g, ' ') // Reemplaza puntos por espacios
        .replace(/\s+/g, ' ') // Opcional: Normaliza múltiples espacios a uno solo
        .trim(); // Opcional: Elimina espacios al inicio y final;
      const defaultPhotoURL = 'https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png';
      const photoURL = user.photoURL || defaultPhotoURL;
      const Uemail = user.email || 'error@gmail.com';
      const defaultCategory = 'user';
      const defaultGrade = 'Bachillerato';
      const defaultPlan = 'test';
      const defaultYear = new Date().getFullYear();
      const defaultResources: any[] = [];
      const defaultChats: any[] = [];
      const defaultNewChats: any[] = [];
      const defaultSolicitudes: any[] = [];
      const defaultNewNews: any[] = [];
      const defaultNews: any[] = [];
      const defaultFriends: any[] = [];

      await saveUserToFirestore(
        user.uid,
        displayName,
        photoURL,
        defaultCategory,
        defaultPlan,
        defaultYear,
        defaultGrade,
        photoURL,
        Uemail, // Corrección: Usar Uemail en lugar de email
        defaultResources,
        defaultChats,
        defaultNewChats,
        defaultSolicitudes,
        defaultNewNews,
        defaultNews,
        defaultFriends
      );

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al registrar con Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    await handleRegisterWithEmail();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <section className="flex flex-col justify-between items-center bg-transparent border border-white/20 rounded-2xl w-[40dvw] h-[80dvh]">
      <header className="primary-text w-full h-full flex flex-col items-center justify-center text-center gap-2">
        <h1 className="text-4xl font-bold">Login in to your account</h1>
        <p className="opacity-40">Welcome back! Please Enter your Details.</p>
      </header>
      <form className="w-[80%] h-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-white/20 primary-text p-4 rounded-xl bgInput"
            placeholder="example@gmail.com"
            required
            type="email"
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onKeyUp={handleKeyPress}
            className="border border-white/20 primary-text p-4 rounded-xl bgInput"
            placeholder="Enter your password"
            type="password"
          />
        </label>
        {error && (
          <p className="text-red-500 text-sm">
            {error === 'Firebase: Error (auth/email-already-in-use).'
              ? 'Este correo ya está registrado'
              : error}
          </p>
        )}
      </form>
      <footer className="w-full h-full gap-2 flex flex-col justify-center items-center">
        <button
          className={`${loading || !email || !password ? 'cursor-not-allowed opacity-60 text-xl font-bold bg-gray-500' : 'cursor-pointer bg-blue-700 text-xl font-bold'} primary-text w-[80%] h-[3.5rem] rounded-xl`}
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          type="submit"
        >
          Log in
        </button>
        <button
          disabled={loading}
          onClick={googleRegister}
          className="bg-white cursor-pointer secondary-text w-[80%] h-[3.5rem] rounded-xl text-xl font-bold"
          type="button" // Cambiado a type="button" para evitar submit
        >
          Enter with Google
        </button>
      </footer>
    </section>
  );
};

export default AuthSec;