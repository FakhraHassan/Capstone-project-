import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="fade-in">
            {/* Minimal Navbar */}
            <nav className="kitty-header" style={{ marginBottom: 0, padding: '1rem 2rem', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Task Manager</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/login" className="btn" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem', textDecoration: 'none' }}>Login</Link>
                    <Link to="/register" className="btn btn-secondary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem', textDecoration: 'none' }}>Sign Up</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="kitty-container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                <div className="kitty-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary-hover)' }}>Simplify Your Day 🌸</h2>
                    <p className="text-secondary" style={{ fontSize: '1.2rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                        Manage your tasks efficiently with our cute and simple task manager.
                        Keep track of deadlines, mark tasks as complete, and stay organized effortlessly.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        <Link to="/login" className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', textDecoration: 'none' }}>Get Started ✨</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
