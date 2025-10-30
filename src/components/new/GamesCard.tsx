import { useState, useEffect } from 'react';
import Image from 'next/image';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';

interface GameData {
    title: string;
    description: string;
    type: string;
    url: string;
    url2: string;
    categoryId: string;
    quests?: any[];
    grade?: number;
    reference: string;
}

const GamesCard = ({ title, description, type,url ,url2, categoryId, quests, grade, reference }: GameData) => {
    const [user, loading] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        title,
        description,
        url2,
    });

    // Verificar si el usuario es admin
    useEffect(() => {
        const checkAdmin = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists() && userDoc.data()?.plan === 'admin') {
                    setIsAdmin(true);
                }
            }
        };
        if (!loading) {
            checkAdmin();
        }
    }, [user, loading]);

    // Manejar cambios en el formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    // Guardar cambios
    const handleSave = async () => {
        if (!user || !isAdmin) return;

        try {
            const gameRef = doc(db, 'games', categoryId); // Ajusta 'games' si usas otra colección
            await updateDoc(gameRef, {
                title: editForm.title,
                description: editForm.description,
                url: editForm.url2,
            });
            setIsEditing(false);
            alert('Juego actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Error al guardar los cambios');
        }
    };

    // Eliminar juego
    const handleDelete = async () => {
        if (!user || !isAdmin || !confirm('¿Seguro que quieres eliminar este juego?')) return;

        try {
            const gameRef = doc(db, 'games', categoryId);
            await deleteDoc(gameRef);
            setIsEditing(false); // Cierra el modal
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('Error al eliminar el juego');
        }
    };

    return (
        <article className='relative'>
            <Link href={reference} className="bg-white/10 rounded-xl w-full flex justify-between items-center p-4 nImgGame relative">
                <header className="flex flex-col gap-2 primary-text">
                    <h1 className="font-bold text-2xl">{title}</h1>
                    <p className="opacity-40 nHidde">{description}</p>
                </header>
                <picture>
                    <Image className="w-[120px] h-[100px]" src={url} alt={title} width={240} height={240} />
                </picture>


            </Link>
            {/* Botón Editar (solo admin) */}
            {isAdmin && !isEditing && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                >
                    Editar
                </button>
            )}
            {/* Modal de edición */}
            {isEditing && isAdmin && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 text-white p-6 rounded-xl max-w-md w-full space-y-4">
                        <h2 className="text-xl font-bold">Editar Juego</h2>

                        <div>
                            <label className="block text-sm font-medium mb-1">Nombre</label>
                            <input
                                type="text"
                                name="title"
                                value={editForm.title}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Descripción</label>
                            <textarea
                                name="description"
                                value={editForm.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">URL de la imagen</label>
                            <input
                                type="text"
                                name="url"
                                value={editForm.url2}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
                            />
                        </div>

                        <div className="flex gap-2 justify-between">
                            <button
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
};

export default GamesCard;