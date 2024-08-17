import React from 'react';

interface InfoProps {
    image: string | null; // URL зображення
    title: string;        // Заголовок
    text: string;         // Текст
}

export const Info: React.FC<InfoProps> = ({ image, title, text }) => {
    return (
        <div className="bg-white py-4 flex gap-4 px-6">
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="h-[50vh] w-[50%] object-cover mb-4 rounded-lg"
                />
            )}
            <div className='w-[50%]'>
                <h3 className="text-4xl font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600">{text}</p>
            </div>

        </div>
    );
};

export default Info;
