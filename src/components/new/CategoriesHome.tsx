"use client";
import { db } from '@/firebase/config';
import { Categories } from '@/interfaces/db';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import CategoriesCard from './CategoriesCard';
import Link from 'next/link';

interface Props {
    pagination?: boolean;
    full?: boolean;
    rows?: number;
    title?: boolean;
}

const CategoriesHome = ({ pagination = false, full = false, rows = 2, title = true }: Props) => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [searchIndex, setSearchIndex] = useState<number>(0);
    const [filteredCategory, setFilteredCategory] = useState<Categories | null>(null);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Adjust items per page: 24 for full mode, 12 otherwise
    const itemsPerPage = full ? 24 : 12;

    useEffect(() => {
        const q = query(collection(db, 'categories'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data() as Categories);

            // Compute max ID from document IDs
            let maxId = 0;
            snapshot.docs.forEach((docSnap) => {
                const numId = parseInt(docSnap.id);
                if (!isNaN(numId) && numId > maxId) {
                    maxId = numId;
                }
            });
            setCategoryId(maxId);

            // Sort categories numerically ascending by type
            const sortedData = data.sort((a, b) => {
                const na = parseInt(a.type);
                const nb = parseInt(b.type);
                if (isNaN(na)) return 1;
                if (isNaN(nb)) return -1;
                return na - nb;
            });
            setCategories(sortedData);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (searchIndex !== 0) {
            const match = categories.find((category) => parseInt(category.type) === searchIndex);
            setFilteredCategory(match || null);
        } else {
            setFilteredCategory(null);
        }
    }, [searchIndex, categories]);

    // Calculate total pages, skipping first 12 items in full mode
    const totalItems = full ? Math.max(categories.length - 12, 0) : categories.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get categories for the current page
    const startIndex = full ? 12 + (currentPage - 1) * itemsPerPage : (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCategories = filteredCategory
        ? [filteredCategory]
        : categories.slice(startIndex, endIndex);

    // Handle page navigation
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Calculate grid columns based on items per page and rows
    const columns = Math.ceil(itemsPerPage / rows);

    return (
        <section className="mt-14 flex flex-col gap-8">
            {title && (
                <header>
                    <h1 className="primary-text font-bold text-3xl">Categories</h1>
                </header>
            )

            }

            <section
                className={`grid gap-4 w-full overflow-hidden grid-rows-${rows} grid-cols-${columns}`}
                style={{ height: full ? 'auto' : '580px' }}
            >
                {paginatedCategories.map((category) => (
                    <Link
                        key={category.type}
                        href={`/dashboard/categories/${category.type}`}
                        className="no-underline"
                        aria-label={`View ${category.title} category`}
                    >
                        <CategoriesCard
                            title={category.title}
                            description={category.description}
                            url={category.url}
                        />
                    </Link>
                ))}
            </section>
            {(!full) && (
                <footer className="flex justify-end items-center">
                    {pagination ? (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1 || filteredCategory !== null}
                                className={`p-2 rounded-full transition-colors ${currentPage === 1 || filteredCategory
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-blue-500 hover:bg-blue-100'
                                    }`}
                                aria-label="Previous page"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M15 6l-6 6l6 6" />
                                </svg>
                            </button>
                            <span className="text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages || filteredCategory !== null}
                                className={`p-2 rounded-full transition-colors ${currentPage === totalPages || filteredCategory
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-blue-500 hover:bg-blue-100'
                                    }`}
                                aria-label="Next page"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <Link
                            className="text-blue-500 underline text-lg hover:text-blue-600 transition-colors"
                            href="/dashboard/categories"
                            aria-label="View all categories"
                        >
                            more →
                        </Link>
                    )}

                </footer>
            )}
        </section>
    );
};

export default CategoriesHome;