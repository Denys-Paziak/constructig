import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSite } from '../services/server';

function AddSite() {
    const [siteName, setSiteName] = useState<string>('');
    const [siteUrl, setSiteUrl] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const data = await addSite(siteName, siteUrl, token || '');
        if (data.ok) {
            alert('Site added successfully!');
            navigate('/sites');
        } else {
            alert('Failed to add site');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Site</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
                        <input
                            id="siteName"
                            type="text"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700">Site URL</label>
                        <input
                            id="siteUrl"
                            type="text"
                            value={siteUrl}
                            onChange={(e) => setSiteUrl(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Add Site
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSite;
