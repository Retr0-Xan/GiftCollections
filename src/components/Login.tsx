import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface LoginProps {
    onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password,
        });

        if (signInError) {
            setError('Invalid email or password');
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        onLoginSuccess();
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
            <div className="fixed inset-0 pointer-events-none flex">
                <div
                    className="flex-1 opacity-25 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/assets/sit_sit.jpg)',
                    }}
                />
                <div
                    className="flex-1 opacity-25 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/assets/stand_sit.jpg)',
                    }}
                />
                <div
                    className="flex-1 opacity-25 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/assets/stand_stand.jpg)',
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-lg">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-light text-yellow-600 tracking-tight mb-2">
                            Kweku & Maame
                        </h1>
                        <p className="text-slate-500 text-sm">Gift Collection Portal</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-colors"
                                placeholder="your@email.com"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-colors"
                                placeholder="Enter your password"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
