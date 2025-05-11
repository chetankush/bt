"use client"

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import AuthHeader from '@/components/AuthHeader';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Simple validation
            if (!email || !password) {
                throw new Error('Please enter both email and password');
            }

            // Call login from AuthContext
            await login(email, password);
            
            // Redirect to buyer dashboard
            router.push('/buyer/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError(error instanceof Error ? error.message : 'Failed to sign in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto space-y-8">
                <AuthHeader />

                <div className="pt-8 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl w-full mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap">Sign In To Shop</h2>
                            <p className="mt-2 text-gray-600">Access products from the best local stores in your area</p>
                        </div>

                        {/* Login Form Container */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6">
                            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 mb-4 bg-white text-gray-900 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors">
                                <img src="/glogo.png" alt="Google" className="w-7 h-7" />
                                <span className="font-medium">Continue with Google</span>
                            </button>
                            
                            <div className="flex items-center my-4">
                                <div className="flex-grow h-px bg-gray-200"></div>
                                <span className="px-3 text-sm text-gray-500">or continue with email</span>
                                <div className="flex-grow h-px bg-gray-200"></div>
                            </div>

                            {/* Error message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                            
                            {/* Email Login Form */}
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="example@email.com"
                                    />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </button>

                                {/* Account Creation Link */}
                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?{' '}
                                        <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
                                            Create Account
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;