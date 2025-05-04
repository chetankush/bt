"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Store, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthHeader from '@/components/AuthHeader';

const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);



    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto space-y-8">
 

                <AuthHeader />


                <div className="pt-8 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl w-full mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap">Create Account To Buy Products</h2>
                            <p className="mt-2 text-gray-600">Shop from the best local stores in your area</p>
                        </div>

                        {/* Login Form Container */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6">


                            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 mb-4 bg-white text-gray-900 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors">
                                <img src="/glogo.png" alt="Google" className="w-7 h-7" />
                                <span className="font-medium">Continue with Google</span>
                            </button>
                            {/* Email Login Form */}
                            <form className="space-y-5">
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Forgot Password Link */}
                                {/* <div className="flex items-center justify-end">
                <Link 
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot Password?
                </Link>
              </div> */}

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Sign In
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">or continue with</span>
                                </div>
                            </div>

                            {/* Social Login Options */}
                            <div className="space-y-2">
                                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-900 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors">
                                    <img src="/flogoo.png" alt="Facebook" className="w-7 h-5" />
                                    <span className="font-medium">Continue with Facebook</span>
                                </button>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign up
                            </Link>
                        </p>

                        {/* Terms and Privacy */}
                        <p className="mt-4 text-center text-xs text-gray-600">
                            By continuing, you agree to our{' '}
                            <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;