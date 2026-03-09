"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cities } from '@/data/cities';

export default function CitySearchBox({ lang, dict }: { lang: string, dict: { placeholder: string, searchButton: string, notSelected: string, notFound: string } }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const suggestions = searchTerm.length >= 1
        ? cities.filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 20)
        : [];

    const handleSearchChange = (val: string) => {
        setSearchTerm(val);
        setIsOpen(val.length >= 1);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelect = (regionSlug: string, citySlug: string) => {
        setIsOpen(false);
        router.push(`/${lang}/einsatzgebiet/${regionSlug}/${citySlug}`);
    };

    return (
        <div ref={wrapperRef} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder={dict.placeholder}
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => searchTerm.length >= 1 && setIsOpen(true)}
                    style={{
                        width: '100%',
                        padding: '1.25rem 1.5rem',
                        fontSize: '1.1rem',
                        border: '2px solid transparent',
                        borderRadius: 'var(--radius-md)',
                        outline: 'none',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                    }}
                    onFocusCapture={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlurCapture={(e) => {
                        if (!isOpen) e.target.style.borderColor = 'transparent';
                    }}
                />
                <button
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.75rem 1.5rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                >
                    {dict.searchButton}
                </button>
            </div>

            {isOpen && suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    marginTop: '0.5rem',
                    padding: '0.5rem 0',
                    listStyle: 'none',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    zIndex: 50,
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}>
                    {suggestions.map((city, index) => (
                        <li key={`${city.slug}-${index}`}>
                            <button
                                onClick={() => handleSelect(city.regionSlug, city.slug)}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.75rem 1.5rem',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: index < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <span style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--foreground)' }}>{city.name}</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--muted)', background: 'var(--secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                    {city.region}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {isOpen && searchTerm.length >= 1 && suggestions.length === 0 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    marginTop: '0.5rem',
                    padding: '1.5rem',
                    textAlign: 'center',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    zIndex: 50
                }}>
                    <p style={{ color: 'var(--muted)', marginBottom: 0 }}>{dict.notFound} &quot;{searchTerm}&quot;</p>
                </div>
            )}
        </div>
    );
}
