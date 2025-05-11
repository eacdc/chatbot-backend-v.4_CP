import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import { API_ENDPOINTS } from "../config";
import { t } from "../translations";
import LanguageSwitcher from "./LanguageSwitcher";

const Signup = () => {
    const navigate = useNavigate();
    
    // Grade options for the dropdown
    const gradeOptions = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "College Student"
    ];
    
    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        phone: "",
        role: "",
        grade: "1", // Default grade
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic form validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            // Create a copy of formData to modify
            const userData = { ...formData };
            
            // If email is empty, set it to null or remove it from request
            if (!userData.email.trim()) {
                delete userData.email;
            }
            
            // Always set publisher to "JD" by default
            userData.publisher = "JD";
            
            const response = await axios.post(API_ENDPOINTS.USER_SIGNUP, userData);

            // Show success message
            setError(""); // Clear any existing errors
            alert("Inscription réussie! Redirection vers la page de connexion...");
            navigate("/login");
        } catch (error) {
            console.error("Signup Error:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "L'inscription a échoué. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-50 p-4">
            {/* Language Switcher */}
            <div className="absolute top-4 right-4">
                <LanguageSwitcher />
            </div>
            
            <div className="max-w-md w-full space-y-8 bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
                <div className="text-center">
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="mt-4 text-3xl font-extrabold text-gray-900">{t('auth.createAccount')}</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {t('auth.alreadyHaveAccount')}{' '}
                        <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                            {t('auth.signIn')}
                        </a>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">{t('auth.usernameForLogin')}</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('auth.chooseUsername')}
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <p className="mt-1 text-xs text-gray-500">{t('auth.usernameHelp')}</p>
                        </div>
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">{t('auth.fullName')}</label>
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('auth.yourFullName')}
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('auth.emailOptional')}</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('auth.yourEmail')}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Votre numéro de téléphone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                            <select
                                id="role"
                                name="role"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionnez votre rôle</option>
                                <option value="teacher">Enseignant</option>
                                <option value="student">Étudiant</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">Niveau scolaire</label>
                            <select
                                id="grade"
                                name="grade"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                value={formData.grade}
                                onChange={handleChange}
                            >
                                {gradeOptions.map((grade) => (
                                    <option key={grade} value={grade}>
                                        Niveau {grade}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">{t('auth.password')}</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Choisissez un mot de passe fort"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">{t('auth.confirmPassword')}</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Confirmez votre mot de passe"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`${
                                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            } w-full flex justify-center py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('auth.creatingAccount')}
                                </span>
                            ) : (
                                t('auth.createMyAccount')
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
